import React from "react";
import PropTypes from 'prop-types';
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";

/*
list of props
  interviewers:array = list of interviewer objects
  interviewer:number = id of an interviewer
  setInterviewer:function = accepts an interviewer id
*/

export default function InterviewerList(props) {

  InterviewerList.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
  };

  const InterviewersInList = props.interviewers.map(interviewer => {
    return (

      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}
      />
    );
  });

  return (
  <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">{InterviewersInList}</ul>
  </section>
    )  
};
