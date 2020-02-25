import React, { useReducer } from "react";
import Axios from "axios";
import DayList from "components/DayList";
import reducer, { SET_DAY, SET_DATA, SET_INTERVIEW, SET_SPOTS } from "reducers/application";

const { spotsRemaining } = require("../helpers/spotsRemaining");

// this thing below is throwing errors in JEST atm
const socket = new WebSocket(`${process.env.REACT_APP_WEBSOCKET_URL}`);

socket.onopen = function(event) {
  socket.send("ping");
}

/*
state = object will maintain the same structure
setDay = used to set the current day
bookInterview = make http request and update local state
cancelInterview = make http request and update local state
*/

export default function useApplicationData() {

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  socket.onmessage = event => {
    const data = JSON.parse(event.data);
    console.log("onmessage: ", event.data);

    if (data.type === "SET_INTERVIEW") {
      data.id = parseInt(data.id);

      dispatch({
        type: SET_INTERVIEW,
        id: data.id,
        interview: data.interview
      })

      const { dayN, count } = spotsRemaining(state, data.id, data.interview);

      const day = {
        ...state.days[dayN],
        spots: count
      }

      const days = []
      for (const d of state.days) {
        if (d.name !== state.day) {
          days.push(d);
        } else {
          days.push(day);
        }
      }

      dispatch({
        type: SET_SPOTS,
        days
      });
    }
  }

  if (state && state.days.length === 0) {
    Promise.all([
      Axios.get("http://localhost:8001/api/days"),
      Axios.get("http://localhost:8001/api/appointments"),
      Axios.get("http://localhost:8001/api/interviewers")
    ]).then(response => {
      dispatch({
        type: SET_DATA,
        days: response[0].data,
        appointments: response[1].data,
        interviewers: response[2].data
      });
    }).catch(error => {
      console.log(error);
    })
  }

  const SetDay = function() {
    return (
      <DayList
      days={state.days}
      day={state.day}
      setDay={day => {
        dispatch({ type: SET_DAY, day });
      }}
    />
    )
  }

  const bookInterview = (id, interview) => {
    return new Promise((res, rej) => {

      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };      
      console.log('sending: ', appointment);
      Axios.put(
        `http://localhost:8001/api/appointments/${id}`,
        appointment
      )
      .then(response => {
        res(response);
      })
      .catch(error => {
        rej(error);
      })

    })
  }

  function cancelInterview(id) {
    return new Promise((res, rej) => {
  
      console.log('sending: ', id);
      Axios.delete(
        `http://localhost:8001/api/appointments/${id}`
      )
      .then(response => {
        res(response);
      })

      .catch(error => {
        rej(error);
      })
    })
  }

  return { state, SetDay, bookInterview, cancelInterview };
}

/*

//--------- setState method examples for reference: ----------//

import { useState } from "react";

const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
})

setState(current => ({
  ...state,
  days: response[0].data,
  appointments: response[1].data,
  interviewers: response[2].data
}));

setState({
  ...state,
  appointments
});

*/