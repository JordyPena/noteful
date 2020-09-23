import React from "react";
import PropTypes from "prop-types"

function NoteSidebar(props) {
  console.log(props, "text");
  return (
    <>
    <section className="sidebar">
      {props.folderName}

      <button onClick={props.history.goBack}>Back</button>
      
      
    </section>
    </>
    // do this first name of folder im in
    // go back button
    //go back to whichever previous page i was on
    // Create a link in that link i need previous url with history.location.pathName
  );
}

NoteSidebar.propTypes = {
  folderName: PropTypes.string
};

export default NoteSidebar;
