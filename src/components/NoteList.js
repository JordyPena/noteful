import React from 'react'
import Note from "./Note"

function NoteList(props) {
  return (
    <>
      {props.notes.map((note, idx) => {
        return <Note key={idx} note={note} {...props.routerProps}/>
      })}
    </>
  )
}

export default NoteList
