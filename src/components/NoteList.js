import React from "react";
import Note from "./Note";
import NotefulContext from "../NotefulContext";

function NoteList(props) {
  
  return <NotefulContext.Consumer>
    {(context) => {
      return (
        <>
        
          {context.notes.map((note, idx) => {
            return <Note delete={props.delete} key={idx} note={note} {...props.routerProps} />;
          })}
        </>
      );
    }}
  </NotefulContext.Consumer>;
}

export default NoteList;
