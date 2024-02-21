import React from "react";
import { daysOfWeek } from "../App";

const OneAlarm = ({ alarmDetails, handleToggle }) => {
  const { hour, minute, meridiem, isSet, id, day } = alarmDetails;
  return (
    <div className={isSet ? "oneAlarm on" : "oneAlarm"}>
      <div className="alarmDetails">
        <div>
          {hour}:{minute} {meridiem}
        </div>
        <div
          className={isSet ? "toggleBtn on" : "toggleBtn"}
          onClick={() => {
            handleToggle(id);
          }}
        ></div>
      </div>
      <div className="days">
        {daysOfWeek.map((dayOfWeek) => (
          <span
            key={dayOfWeek}
            className={
              day === "everyday" || dayOfWeek === day ? "alarmDay" : ""
            }
          >
            {dayOfWeek.slice(0, 2)}
          </span>
        ))}
      </div>
    </div>
  );
};

export default OneAlarm;
