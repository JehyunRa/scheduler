import React, { useState } from "react";

import Axios from "axios";
import DayList from "components/DayList";

/*
state = object will maintain the same structure
setDay = used to set the current day
bookInterview = make http request and update local state
cancelInterview = make http request and update local state
*/

export default function useApplicationData() {

  // const SET_DAY = "SET_DAY";
  // const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  // const SET_INTERVIEW = "SET_INTERVIEW";
  
  // function reducer(state, action) {
  //   switch (action.type) {
  //     case SET_DAY:
  //       return {...state, day: action.day};
  //     case SET_APPLICATION_DATA:
  //       return {...state, day: action.day, appointments};
  //     case SET_INTERVIEW: {
  //       return /* insert logic */
  //     }
  //     default:
  //       throw new Error(
  //         `Tried to reduce with unsupported action type: ${action.type}`
  //       );
  //   }
  // }

  // const [state, dispatch] = useReducer(reducer, 0);

  // dispatch({ type: SET_DAY, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  if (state.days.length === 0) {
    Promise.all([
      Axios.get("http://localhost:8001/api/days"),
      Axios.get("http://localhost:8001/api/appointments"),
      Axios.get("http://localhost:8001/api/interviewers")
    ]).then(response => {
      // console.log(response);
      setState(current => ({
        ...state,
        days: response[0].data,
        appointments: response[1].data,
        interviewers: response[2].data
      }));
    }).catch(error => {
      console.log('error fetching data');
    })
  }

  const setDay = function() {
    return (
      <DayList
      days={state.days}
      day={state.day}
      setDay={day => setState({...state, day})}
    />
    )
  }

  const bookInterview = (id, interview) => {
    return new Promise((res, rej) => {

      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
  
      Axios.put(
        `http://localhost:8001/api/appointments/${id}`,
        appointment
      )
      .then(response => {
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
    
        setState({
          ...state,
          appointments
        });

        res(response);
      })
      .catch(error => {
        rej(error);
      })

    })
  }

  function cancelInterview(id) {
    return new Promise((res, rej) => {

      const appointment = {
        ...state.appointments[id],
        interview: null
      };
  
      Axios.delete(
        `http://localhost:8001/api/appointments/${id}`
      )
      .then(response => {
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
    
        setState({
          ...state,
          appointments
        });
        
        res(response);
      })
      .catch(error => {
        rej(error);
      })
  
    })
  }

  return { state, setDay, bookInterview, cancelInterview };
}