import React from "react";
import "components/Application.scss";
import Appointment from "components/Appointment";

import useApplicationData from "../hooks/useApplicationData";

const { getAppointmentsForDay, getInterview, getInterviewersForDay } = require("../helpers/selectors");

export default function Application() {
  const {
    state,
    SetDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const AppointmentsInList = getAppointmentsForDay(state, state.day).map(appointment => {
    return (
      <Appointment
        {...appointment}
        key={appointment.id}
        id={appointment.id}
        interview={getInterview(state, appointment.interview)}
        interviewers={getInterviewersForDay(state, state.day)}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <SetDay />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {AppointmentsInList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
