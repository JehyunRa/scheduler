import React, { useEffect } from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/header";
import Show from "components/Appointment/show";
import Empty from "components/Appointment/empty";
import Form from "components/Appointment/form";
import Status from "components/Appointment/status";
import Confirm from "components/Appointment/confirm";
import Error from "components/Appointment/error";

import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR = "ERROR";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // update appointment changes using socket
  useEffect(() => {
    let interview = null;
    if (props.interview) interview = props.interview;
    if (interview && mode === EMPTY) {
     transition(SHOW);
    }
    if (interview === null && mode === SHOW) {
     transition(EMPTY);
    }
  }, [props.interview, transition, mode]);

  // when save button is pressed from Form
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    if (interviewer !== null) {
      transition(SAVE, true);

      props.bookInterview(props.id, interview)
      .then(response => {
        transition(SHOW);
      })
      .catch(error => {
        transition(ERROR, true);
      })
    }
  }

  // when cancel button is pressed from Form
  function cancel() {
    transition(DELETE, true);

    props.cancelInterview(props.id)
    .then(response => {
      transition(EMPTY);
    })
    .catch(error => {
      transition(ERROR, true);
    })
  }

  return (
    <article className="appointment"
    >
      <Header time={props.time} />
      {mode === EMPTY && (
        <Empty onAdd={() => transition(CREATE)} />
      )}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SAVE && (
        <Status message="Saving" />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onCancel={() => back()}
          onConfirm={cancel}
        />
      )}
      {mode === DELETE && (
        <Status message="Deleting" />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />
      )}
      {mode === ERROR && (
        <Error
          message="Error occurred"
          onClose={() => back()}
        />
      )}
    </article>
  );
}
