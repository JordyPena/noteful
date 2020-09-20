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
      nameError: ""
    
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

  handleChange(event) {
    const {name, folder} = this.state;
  }

  handleSubmit(event) {
    if (!this.state.nameError) {
      this.props.addNote(event)
    }
    
  }
  

  render() {
    
    return (
      <>
      <button onClick={this.props.history.goBack}>Back</button>

      <form onSubmit={this.handleSubmit}>
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
            {this.props.folders.map((folder) => {
               return <option value={folder.id}>{folder.name}</option>
            })}
        
          </select>
        </label>
        <br/>
        
        <button type="submit" disabled={this.state.nameError}>Add note</button>
      </form>

      
    </>
    )
  }
}
AddNote.propTypes = {
  folders: PropTypes.array
};

export default AddNote
