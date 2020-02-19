import React, { Fragment } from 'react'
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "index.scss";

import Button from "components/Button";
import DayListItem from "components/DayListItem";
import DayList from "components/DayList";
import InterviewerListItem from "components/InterviewerListItem";
import InterviewerList from "components/InterviewerList";

import Appointment from "components/Appointment";
import Header from "components/Appointment/header";
import Empty from "components/Appointment/empty";
import Show from "components/Appointment/show";
import Confirm from "components/Appointment/confirm";
import Status from "components/Appointment/status";
import Error from "components/Appointment/error";
import Form from "components/Appointment/form";

/* ---------------------------------------- */
/*                Temp Data                 */
/* ---------------------------------------- */
const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};

/* ---------------------------------------- */
/*                  Button                  */
/* ---------------------------------------- */
storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));

/* ---------------------------------------- */
/*               DayListItem                */
/* ---------------------------------------- */
//Initiates Storybook and registers our DayListItem component
storiesOf("DayListItem", module)

  // Provides the default background color for our component
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })

  // To define our stories, we call add() once for each of our test states to generate a story
  .add("Unselected", () => <DayListItem name="Monday" spots={5} />)
  .add("Selected", () => <DayListItem name="Monday" spots={5} selected />) 
  .add("Full", () => <DayListItem name="Monday" spots={0} />)
  
  // action() allows us to create a callback that appears in the actions panel when clicked
  .add("Clickable", () => (
    <DayListItem name="Tuesday" setDay={action("setDay")} spots={5} />
  ));

/* ---------------------------------------- */
/*                 DayList                  */
/* ---------------------------------------- */
storiesOf("DayList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Monday", () => (
    <DayList days={days} day={"Monday"} setDay={action("setDay")} />
  ))
  .add("Tuesday", () => (
    <DayList days={days} day={"Tuesday"} setDay={action("setDay")} />
  ));

/* ---------------------------------------- */
/*           InterviewersListItem           */
/* ---------------------------------------- */
storiesOf("InterviewerListItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Unselected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
    />
  ))
  .add("Selected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected
    />
  ))
  .add("Clickable", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      setInterviewer={event => action("setInterviewer")(interviewer.id)}
    />
  ));

/* ---------------------------------------- */
/*             InterviewerList              */
/* ---------------------------------------- */
storiesOf("InterviewerList", module)
.addParameters({
  backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
})
.add("Initial", () => (
  <InterviewerList
    interviewers={interviewers}
    onChange={action("setInterviewer")}
  />
))
.add("Preselected", () => (
  <InterviewerList
    interviewers={interviewers}
    value={2}
    onChange={action("setInterviewer")}
  />
));

/* ---------------------------------------- */
/*               Apppointment               */
/* ---------------------------------------- */
storiesOf("Appointment", module)
.addParameters({
  backgrounds: [{ name: "white", value: "#fff", default: true }]
})
.add("Appointment", () => ( <Appointment /> ))
.add("Appointment Empty", () => (
  <Fragment>
    <Appointment id={1} time="12pm" />
    <Appointment id="last" time="1pm" />
  </Fragment>
))
.add("Appointment Booked", () => (
  <Fragment>
    <Appointment
      id={1}
      time="12pm"
      interview={{ student: "Lydia Miller-Jones", interviewer }}
    />
    <Appointment id="last" time="1pm" />
  </Fragment>
))
.add("Header", () => ( <Header time="12pm" /> ))
.add("Empty", () => ( <Empty onAdd={action("onAdd")} /> ))
.add("Show", () => (
  <Show
    student="Student A"
    interviewer={interviewer.name}
    onEdit={action("onEdit")}
    onDelete={action("onDelete")}
  />
))
.add("Confirm", () => (
  <Confirm
    message="Delete the appointment?"
    onCancel={action("onCancel")}
    onConfirm={action("onConfirm")}
  />
))
.add("Saving", () => ( <Status message="Saving" /> ))
.add("Deleting", () => ( <Status message="Deleting" /> ))
.add("Error:Saving", () => (
  <Error
    message="Could not save appointment"
    onClose={action("onClose")}
  />
))
.add("Error:Deleting", () => (
  <Error
    message="Could not delete appointment"
    onClose={action("onClose")}
  />
))
.add("Form:Create", () => (
  <Form
    interviewers={interviewers}
    onSave={action("onSave")}
    onCancel={action("onCancel")}
  />
))
.add("Form:Edit", () => (
  <Form
    name="student A"
    interviewers={interviewers}
    interviewer={2}
    onSave={action("onSave")}
    onCancel={action("onCancel")}
  />
))