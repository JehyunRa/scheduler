const getAppointmentsForDay = function(state, day) {
  let appointments = [];
  for (const d of state.days) {
    if (d.name === day) {
      for (const a of d.appointments) {
        appointments.push(state.appointments[a]);
      }
    }
  }

  return appointments;
};

const getInterview = function(state, interview) {
  let resultObject = null;

  if (interview !== null) {
    resultObject = {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    }
  }
  
  return resultObject;
}

const getInterviewersForDay = function(state, day) {
  let interviewers = [];
  for (const d of state.days) {
    if (d.name === day) {
      for (const i of d.interviewers) {
        interviewers.push(state.interviewers[i]);
      }
    }
  }

  return interviewers;
};

module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay };