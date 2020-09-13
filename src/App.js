import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

import NoteSidebar from "./components/NoteSidebar";
import "./App.css";
import Note from "./components/Note";
import FolderSidebar from "./components/FolderSidebar";
import store from "./store";
import NoteList from "./components/NoteList";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      folders: store.folders,
      notes: store.notes,
    };
  }

  renderNotes = () => {
    return (
      <>
        <Route
          path="/"
          exact
          render={(props) => {
            return <NoteList notes={this.state.notes} routerProps={props}/>;
          }}
        />

        <Route
          path="/note/:noteid"
          render={(props) => {
            const note = this.state.notes.find((note) => 
              note.id === props.match.params.noteid
            ) 
            return <Note note={note} {...props}/>;
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
    return (
      <>
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
      </>
    );
  }
}

export default App;
