import React, { useReducer } from "react";
// used in previous version: useState,

import Axios from "axios";
import DayList from "components/DayList";

const { spotsRemaining } = require("../helpers/spotsRemaining");

/*
state = object will maintain the same structure
setDay = used to set the current day
bookInterview = make http request and update local state
cancelInterview = make http request and update local state
*/

export default function useApplicationData() {

  const SET_DAY = "SET_DAY";
  const SET_DATA = "SET_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_SPOTS = "SET_SPOTS";
  
  function reducer(state2, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state2, day: action.day }
      case SET_DATA:
        return {
          ...state2,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers
        }
      case SET_INTERVIEW: {
        return {
          ...state2,
          appointments: action.appointments
        }
      }
      case SET_SPOTS: {
        return {
          ...state2,
          days: action.days
        }
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state2, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  /*       previous method       */
  /*  kept for future reference  */

  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {}
  // })

  /* change state2 to state for previous version */
  if (state2 && state2.days.length === 0) {
    Promise.all([
      Axios.get("http://localhost:8001/api/days"),
      Axios.get("http://localhost:8001/api/appointments"),
      Axios.get("http://localhost:8001/api/interviewers")
    ]).then(response => {
      // setState(current => ({
      //   ...state,
      //   days: response[0].data,
      //   appointments: response[1].data,
      //   interviewers: response[2].data
      // }));
      dispatch({
        type: SET_DATA,
        days: response[0].data,
        appointments: response[1].data,
        interviewers: response[2].data
      });
    }).catch(error => {
      console.log('error fetching data');
    })
  }

  /* change state2 to state for previous version */
  const SetDay = function() {
    return (
      <DayList
      days={state2.days}
      day={state2.day}
      setDay={day => {
        // setState({...state, day});
        dispatch({ type: SET_DAY, day });
      }}
    />
    )
  }

  /* change state2 to state for previous version */
  const bookInterview = (id, interview) => {
    return new Promise((res, rej) => {

      const appointment = {
        ...state2.appointments[id],
        interview: { ...interview }
      };
      
      const { dayN, count } = spotsRemaining(state2, id, true);

      const day = {
        ...state2.days[dayN],
        spots: count
      }

      const days = []
      for (const d of state2.days) {
        if (d.name !== state2.day) {
          days.push(d);
        } else {
          days.push(day);
        }
      }

      Axios.put(
        `http://localhost:8001/api/appointments/${id}`,
        appointment
      )
      .then(response => {
        const appointments = {
          ...state2.appointments,
          [id]: appointment
        };
    
        // setState({
        //   ...state,
        //   appointments
        // });

        dispatch({
          type: SET_INTERVIEW,
          appointments
        });

        dispatch({
          type: SET_SPOTS,
          days
        });

        res(response);
      })
      .catch(error => {
        rej(error);
      })

    })
  }

  /* change state2 to state for previous version */
  function cancelInterview(id) {
    return new Promise((res, rej) => {

      const appointment = {
        ...state2.appointments[id],
        interview: null
      };

      const { dayN, count } = spotsRemaining(state2, id, false);

      const day = {
        ...state2.days[dayN],
        spots: count
      }

      const days = []
      for (const d of state2.days) {
        if (d.name !== state2.day) {
          days.push(d);
        } else {
          days.push(day);
        }
      }
  
      Axios.delete(
        `http://localhost:8001/api/appointments/${id}`
      )
      .then(response => {
        const appointments = {
          ...state2.appointments,
          [id]: appointment
        };
    
        // setState({
        //   ...state,
        //   appointments
        // });

        dispatch({
          type: SET_INTERVIEW,
          appointments
        });

        dispatch({
          type: SET_SPOTS,
          days
        });
        
        res(response);
      })
      .catch(error => {
        rej(error);
      })
  
    })
  }

  /* change state2 to state for previous version */
  return { state: state2, SetDay, bookInterview, cancelInterview };
}