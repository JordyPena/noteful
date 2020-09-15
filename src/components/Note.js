import React from "react";
import { Link } from "react-router-dom";
import NotefulContext from "../NotefulContext";

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
            onClick={() => props.delete(props.note.id)}
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

export default Note;
