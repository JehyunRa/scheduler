const spotsRemaining = function(state, id, isBooking) {
  let dayN = null;
  let count = 5;

  // looking in days
  for (const d of state.days) {
    // in current day
    if (d.name === state.day) {
      dayN = d.id - 1;
      // for each of appointment in current day
      for (const a of d.appointments) {
        if (
          // if given spot in a day is filled and not equal to id: reduce count by 1
          state.appointments[a].interview !== null
          && a !== id
        ) {
          count -= 1;
        }
      }
    }
  }

  if (isBooking === true) count -= 1;

  return { dayN, count };
};

module.exports = { spotsRemaining };