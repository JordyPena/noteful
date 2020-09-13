import React from 'react'
import { Router, Link } from "react-router-dom"
import "./FolderSidebar.css"

function FolderSidebar(props) {
  console.log(props)

  
  return (
    <>
      <section className="sidebar">
        <ul>
          
          {props.folders.map((item, idx) => {
          return <li key={idx} className={`folder  ${item.id === props.match.params.folderid ? "activeFolder" : ""}`}><Link to={`/folder/${item.id}`}>{item.name}</Link></li>
        })} 
          
        
        </ul>
       
      </section>
    </>
  )
}

export default FolderSidebar
