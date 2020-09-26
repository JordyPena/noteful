import React, { Component } from 'react'
import ValidationError from './ValidationError'
import PropTypes from 'prop-types'

class AddNote extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: {
        value: "",
        touched: false
      },
      nameError: false
    
    }
  }

  
  

  updateName(name) {
    const trimName = name.trim()
    this.setState({
      name: {
        value: trimName, 
        touched: true
      },
      nameError: this.validateName(trimName)
    })
    
  }

  validateName(name) {
    
    if (name.length === 0) {
      return "Name is required"
    } else {
      return ""
    }
  }

 

  handleSubmit = (event) => { 
    event.preventDefault()
    console.log(event)
    if (this.state.name.value === "") {
      this.setState({
      name: {
        value: "",
        touched: true
      },
      nameError: "Name is required"
    })} 
    else if (!this.state.nameError) {
      this.props.addNote(event)
    }
    
  }
  

  render() {
    console.log(this.state)
    return (
      <>
      <button onClick={this.props.history.goBack}>Back</button>

      <form onSubmit={(event) => {
        this.handleSubmit(event)
        if (this.state.name.value) {
          this.props.history.push("/")
        }
      }}>
        <h2>Create a note</h2>
        <label>
          Name
          <input
            onBlur={e => this.updateName(e.target.value)}
            onChange={e => this.updateName(e.target.value)} 
            type="text"
            name="noteName"
          />
          {this.state.name.touched && (
             <ValidationError message={this.state.nameError}/>
          )}
         
        </label>
        <br/>
        <label>
          Content
          <input
            type="text"
            name="contentInput"
          />
        </label>
        <br/>
        <label>
          Folder
          <select name="folderSelected">
            {this.props.folders.map((folder, idx) => {
               return <option key={idx} value={folder.id}>{folder.name}</option>
            })}
        
          </select>
        </label>
        <br/>
        
        <button type="submit">Add note</button>
      </form>

      
    </>
    )
  }
}
AddNote.propTypes = {
  folders: PropTypes.array.isRequired
};

export default AddNote
