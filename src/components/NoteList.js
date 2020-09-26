import React from "react";
import Note from "./Note";
import NotefulContext from "../NotefulContext";
import ErrorBoundary from "./ErrorBoundary"
import PropTypes from "prop-types"

function NoteList(props) {
  
  return (
    <ErrorBoundary>
  <NotefulContext.Consumer>
    {(context) => {
      return (
        <>
        
          {props.notes.map((note, idx) => {
            return <Note delete={props.delete} key={idx} note={note} {...props.routerProps} />;
          })}
        </>
      );
    }}
  </NotefulContext.Consumer>
  </ErrorBoundary>
  )
  
}

NoteList.propTypes = {
  notes: PropTypes.array.isRequired,
  routerProps: PropTypes.object.isRequired
}

export default NoteList;
