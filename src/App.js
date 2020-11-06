import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import NoteSidebar from "./components/NoteSidebar";
import "./App.css";
import Note from "./components/Note";
import FolderSidebar from "./components/FolderSidebar";
import NoteList from "./components/NoteList";
import NotefulContext from "./NotefulContext";
import AddFolder from "./components/AddFolder";
import AddNote from "./components/AddNote";
const URL = process.env.NODE_ENV === "production" 
  ? process.env.REACT_APP_PROD_URL 
  : "http://localhost:8000"
  

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      folders: [],
      notes: [],
    };
  }


  //////////////get request/////////
  componentDidMount() {
    fetch(`${URL}/api/folders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.REACT_APP_TOKEN
      }
    })
      .then((response) => {
        if (!response.ok) return response.json().then((e) => Promise.reject(e));

        return response.json();
      })
      .then((data) => {
        this.setState({
          folders: data,
        });
      })
      .catch((error) => {
        console.error({ error });
      });
   
    fetch(`${URL}/api/notes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.REACT_APP_TOKEN
      }
    })
      .then((response) => {
        if (!response.ok) return response.json().then((e) => Promise.reject(e));

        return response.json();
      })
      .then((data) => {
        this.setState({
          notes: data,
        });
      })
      .catch((error) => {
        console.error({ error });
      });
  }
///////////////deleting note/////////////////////////
  handleDelete = (id) => {
    fetch(`${URL}/api/notes/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: process.env.REACT_APP_TOKEN
      },
    }).then((response) => {
      if (response.ok) {
        const newNotes = this.state.notes.filter((note, idx) => {
          return id !== note.id;
        });
        this.setState({
          notes: newNotes,
        });
      }
    });
  };
///////////////////adding folder api////////////////////////////////
  addFolder = (event) => {
    event.preventDefault()
    const folder = { name: event.currentTarget["folderName"].value }
    const url = `${URL}/api/folders`;
   
    const options = {
      method: "POST",
      body: JSON.stringify(folder),
      headers: {
        "content-type": "application/json",
        Authorization: process.env.REACT_APP_TOKEN
      },
    };
    fetch(url, options)
      .then((response) => {
        console.log(response)
        if (!response.ok) {
          throw new Error("Something went wrong, please try again later");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data)
        this.setState((prevState) => {
          prevState.folders.push(data)
          return {
            folders: prevState.folders
          }
        })
        
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
      });
  };
///////////////adding note api/////////////////////////////

  addNote = (event) => {
    event.preventDefault()
    const folderOptions = event.currentTarget["folderSelected"]
    console.log(folderOptions.options[folderOptions.selectedIndex].value)
    const note = { 
      name: event.currentTarget["noteName"].value,
      content: event.currentTarget["contentInput"].value,
      folder_id: folderOptions.options[folderOptions.selectedIndex].value
    }
    
    const url = `${URL}/api/notes`;
   
    const options = {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "content-type": "application/json",
        Authorization: process.env.REACT_APP_TOKEN
      },
    };
    fetch(url, options)
      .then((response) => {
       
        if (!response.ok) {
          throw new Error("Something went wrong, please try again later");
        }
        return response.json();
      })
      .then((data) => {
      
        this.setState((prevState) => {
          prevState.notes.push(data) 
          return {
            notes: prevState.notes
          }
        });
       
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
      });
  }
  ////////////////main part of page///////////////////////
  renderNotes = () => {
    return (
      <>
        <Route
          path="/"
          exact
          render={(props) => {
            return (
              <NoteList
                delete={this.handleDelete}
                notes={this.state.notes}
                routerProps={props}
              />
            );
          }}
        />

        <Route
          path="/note/:noteid"
          render={(props) => {
            const note = this.state.notes.find(
              (note) => note.id === props.match.params.noteid
            );
            if (note)
              return <Note delete={this.handleDelete} note={note} {...props} />;
          }}
        />

        <Route
          path="/folder/:folderid"
          render={(props) => {
            const newArr = this.state.notes.filter((note) => {
              console.log(note)
              return note.folder_id === +props.match.params.folderid;
            }); console.log(newArr)
            return <NoteList delete={this.handleDelete} notes={newArr} routerProps={props} />;
          }}
        />

        <Route
          path="/add-folder"
          render={(props) => <AddFolder {...props} addFolder={this.addFolder}/>}
        />

        <Route
          path="/add-note"
          render={(props) => <AddNote {...props} addNote={this.addNote} folders={this.state.folders}/>}
        />
      </>
    );
  };
////////////////////sidebar of page/////////////////////
  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
    };
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
                  if (this.state.notes.length) {
                    const note = this.state.notes.find(
                      (note) => note.id === +props.match.params.noteid
                    );

                    const folder = this.state.folders.find(
                      (folder) => folder.id === note.folder_id
                    );

                    return <NoteSidebar {...props} folderName={folder.name} />;
                  }
                }}
              />

              <Route
                path="/folder/:folderid"
                render={(props) => (
                  <FolderSidebar {...props} folders={this.state.folders} />
                )}
              />
            </div>
            <Link to="/add-folder">
              <button className="add-folder">Add Folder</button>
            </Link>

            <Link
            to="/add-note"
          >
            <button>Add note</button>
          </Link>  
          </nav>

          {/*Note display  */}
          <section className="notes">{this.renderNotes()}</section>
                
        </main>
      </NotefulContext.Provider>
    );
  }
}

export default App;
