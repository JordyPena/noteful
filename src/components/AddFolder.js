import React from 'react'

function AddFolder(props) {

  return (
    <>
      <button onClick={props.history.goBack}>Back</button>

      <form onSubmit={(event) => {props.addFolder(event)}}>
        <h2>Create a folder</h2>
        <label>
          Name
        </label>
        <input
          type="text"
          id="new-folderName"
          defaultValue=""
          name="folderName"
        /> 
        
        
        <button type="submit">Add folder</button>
      </form>

      
    </>
  )
}

export default AddFolder
