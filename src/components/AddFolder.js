import React from 'react'
import PropTypes from 'prop-types'

function AddFolder(props) {

console.log(props)
  return (
    <>
      <button onClick={props.history.goBack}>Back</button>

      <form 
        onSubmit={(event) => {
          props.addFolder(event) 
          props.history.push("/")
        }}
      >
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
        

        <button type="submit">Create folder</button>
        
        
      </form>

      
    </>
  )
}

AddFolder.propTypes = {
  folders: PropTypes.array
};

export default AddFolder
