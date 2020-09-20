import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"


function Note(props) {
  console.log(props);
  
  return (
    <>
      <div className="note">
        <Link to={`/note/${props.note.id}`}>
          <h2>{props.note.name}</h2>
        </Link>
        <div>
          <p>Data modified on 1/1/2020</p>
         
          <button
            onClick={() => {
             props.delete(props.note.id)
              if ( props.match.params.noteid )  props.history.push("/")
            }}
            className="delete-note"
            
          >
            Delete Note
          </button>
        </div>
      </div>
      {props.match.params.noteid && <p>{props.note.content}</p>}
    </>
  );
}

Note.propTypes = {
  note: PropTypes.object
};

export default Note;
