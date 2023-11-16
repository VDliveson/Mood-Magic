import React from "react";

export default function Alert(props) {
    let type = props.type ? props.type : "danger";
  return (
    <>
      <div className = {`alert alert-${type} alert-dismissible fade show`} role="alert">
        <strong>{props.title} !</strong> {props.description}
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          style={{position: 'fixed'}}
        ></button>
      </div>
    </>
  );
}
