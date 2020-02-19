import React from "react";
import DayListItem from "components/DayListItem";

/*
list of props
  days:array = list of day objects(each includes id, name, spots)
  day:string = currently selected day
  setDay:function = name of day ex. "Monday", "Tuesday"
*/

export default function DayList(props) {

  const DaysInList = props.days.map(day => {
    return (
      <DayListItem
        key={day.name}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    );
  });

  return <ul>{DaysInList}</ul>
};
