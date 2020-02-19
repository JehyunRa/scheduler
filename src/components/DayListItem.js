import React from "react";
import "components/DayListItem.scss";

const classNames = require('classnames');

export default function DayListItem(props) {
  
  let dayClass = classNames("day-list",
    "day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const formatSpots = function (spots) {
    let text = `${spots} spots remaining`;
    if (props.spots === 1) text = `${spots} spot remaining`;
    if (props.spots === 0) text = `no spots remaining`;
    return text;
  }

  return (
    <li
      className={dayClass} 
      onClick={() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}