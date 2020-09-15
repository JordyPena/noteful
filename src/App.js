import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

import NoteSidebar from "./components/NoteSidebar";
import "./App.css";
import Note from "./components/Note";
import FolderSidebar from "./components/FolderSidebar";
import store from "./store";
import NoteList from "./components/NoteList";
import NotefulContext from "./NotefulContext";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      folders: [],
      notes: [],
    };
  }
  componentDidMount() {
    fetch("http://localhost:9090/folders")
    .then(response => {
      if (!response.ok)
        return response.json().then(e => Promise.reject(e));

      return response.json()
    })
    .then(data => {
      this.setState({
        folders: data
      })
    })
    .catch(error => {
      console.error({error})
    })
////////////////////////
    fetch("http://localhost:9090/notes")
    .then(response => {
      if (!response.ok)
        return response.json().then(e => Promise.reject(e));

      return response.json()
    })
    .then(data => {
      this.setState({
        notes: data
      })
    })
    .catch(error => {
      console.error({error})
    })

  }

  handleDelete = (id) => {
    fetch(`http://localhost:9090/notes/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    })
    .then(response => {
      if (response.ok) {
        const newNotes = this.state.notes.filter((note, idx) => {
          return id !== note.id  
        })
        this.setState({
          notes: newNotes
        })
      }
    })

    
    
  }

  renderNotes = () => {
    return (
      <>
        <Route
          path="/"
          exact
          render={(props) => {
            return <NoteList delete={this.handleDelete} notes={this.state.notes} routerProps={props}/>;
          }}
        />

        <Route
          path="/note/:noteid"
          render={(props) => {
            const note = this.state.notes.find((note) => 
              note.id === props.match.params.noteid
            ) 
            return <Note delete={this.handleDelete} note={note} {...props}/>;
          }}
        />

        <Route 
          path="/folder/:folderid"
          render={(props) => {
            const newArr = this.state.notes.filter((note) => {
              return note.folderId === props.match.params.folderid 
            })
            return <NoteList notes={newArr} routerProps={props}/>
          }} 
        />

       
      </>
    );
  };
  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes
    }
    return (
      <NotefulContext.Provider value={contextValue}>
        <header className="header">
          <Link to="/">
            <h1>Noteful</h1>
          </Link>
        </header>
        <main>
          <nav className="sidebar">
            <div className="folder">
              <Route
                path="/"
                render={(props) => (
                  <FolderSidebar {...props} folders={this.state.folders} />
                )}
                exact
              />

              <Route
                path="/note/:noteid"
                render={(props) => {
                  const note = this.state.notes.find(
                    (note) => note.id === props.match.params.noteid
                  );
                  const folder = this.state.folders.find(
                    (folder) => folder.id === note.folderId
                  );
                  return <NoteSidebar {...props} folderName={folder.name} />;
                }}
              />

              <Route
                path="/folder/:folderid"
                render={(props) => (
                  <FolderSidebar {...props} folders={this.state.folders} />
                )}
              />
            </div>
            <button className="add-folder">Add Folder</button>
          </nav>

          {/*Note display  */}
          <section className="notes">
            {this.renderNotes()}
          </section>
        </main>
      </NotefulContext.Provider>
      
    );
  }
}

export default App;
