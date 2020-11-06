import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ValidationError from './ValidationError'


class AddFolder extends Component {
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

  validateName(name) {
    
    if (name.length === 0) {
      return "Name is required"
    } else {
      return ""
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
      this.props.addFolder(event)
    }
    
  }
  
  render() {
    
  return (
    <>
      <button onClick={this.props.history.goBack}>Back</button>

      <form onSubmit={(event) => {
        console.log(this.state.name.value)
        this.handleSubmit(event)
        if (this.state.name.value) {
          this.props.history.push("/")
        }
      }}>
        <h2>Create a folder</h2>
        <label>
          Name
        </label>
        <input
          onChange={e => this.updateName(e.target.value)}
          type="text"
          id="new-folderName"
          defaultValue=""
          name="folderName"
        /> 
        {this.state.name.touched && (
          <ValidationError message = {this.state.nameError}/>
        )}

        <button type="submit">Create folder</button>
        
        
      </form>

      
    </>
  )
  }

}

AddFolder.propTypes = {
  folders: PropTypes.array.isRequired
};

export default AddFolder
