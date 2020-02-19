import React from "react";
import "components/InterviewerListItem.scss";

const classNames = require('classnames');

export default function InterviewerListItem(props) {
  
  let interviewerClass = classNames("interviewers",
    "interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  return (
    <li
      className={interviewerClass}
      onClick={() => props.setInterviewer(props.setInterviewer)}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}