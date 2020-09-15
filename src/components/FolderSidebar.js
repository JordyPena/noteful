import React from "react";
import { Router, Link } from "react-router-dom";
import "./FolderSidebar.css";
import NotefulContext from "../NotefulContext";

function FolderSidebar(props) {
  console.log(props);
  return (
    <NotefulContext.Consumer>
      {(context) => {
        return (
          <>
            <section className="sidebar">
              <ul>
                {context.folders.map((item, idx) => {
                  return (
                    <li
                      key={idx}
                      className={`folder  ${
                        item.id === props.match.params.folderid
                          ? "activeFolder"
                          : ""
                      }`}
                    >
                      <Link to={`/folder/${item.id}`}>{item.name}</Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          </>
        );
      }}
    </NotefulContext.Consumer>
  );
}

export default FolderSidebar;
