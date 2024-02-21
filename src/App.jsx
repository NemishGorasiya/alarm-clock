import { useState, useEffect } from "react";
import useSound from "use-sound";
import "./App.css";
import OneAlarm from "./Components/OneAlarm";
import alarmTune from "./assets/alarmTune1.mp3";
const monthsOfCalender = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const daysOfWeek = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thirsday",
  "friday",
  "saturday",
];
function handlePostfixOfDate(d) {
  if (d >= 4 && d <= 20) {
    return "th";
  } else if (d === 1 || d % 10 === 1) {
    return "st";
  } else if (d === 2 || d % 10 === 2) {
    return "nd";
  } else if (d === 3 || d % 10 === 3) {
    return "rd";
  } else {
    return "th";
  }
}
function App() {
  const [playAlarm] = useSound(alarmTune);
  const [alarms, setAlarms] = useState([]);
  const [hour, setHour] = useState(new Date().getHours());
  const [minute, setMinute] = useState(new Date().getMinutes());
  const [second, setSecond] = useState(new Date().getSeconds());
  const [month, setMonth] = useState(
    monthsOfCalender[new Date().getUTCMonth()]
  );
  const [date, setDate] = useState(new Date().getDate());
  const [postfixOfDate, setpostfixOfDate] = useState(
    handlePostfixOfDate(new Date().getDate())
  );
  const [isAddingAlarm, setIsAddingAlarm] = useState(false);
  const [alarmTime, setAlarmTime] = useState("");
  const [alarmDay, setAlarmDay] = useState("once");
  setInterval(() => {
    setSecond(new Date().getSeconds());
    setMinute(new Date().getMinutes());
    setHour(new Date().getHours());
    setMonth(monthsOfCalender[new Date().getUTCMonth()]);
    setDate(new Date().getDate());
    setpostfixOfDate(handlePostfixOfDate(new Date().getDate()));
  }, 1000);

  useEffect(() => {
    let currTime = new Date();
    alarms.forEach((alarm, idx) => {
      if (
        alarm.isSet &&
        parseInt(alarm.actualHour) === currTime.getHours() &&
        parseInt(alarm.minute) === currTime.getMinutes()
      ) {
        playAlarm();
        let temp = [...alarms];
        temp[idx].isSet = false;
        setAlarms(temp);
      }
    });
  }, [minute]);

  setInterval(() => {
    checkForAlarm();
  }, 10000);

  function checkForAlarm() {}
  function handleSetAlarm() {
    setIsAddingAlarm(!isAddingAlarm);
  }
  function handleToggle(id) {
    setAlarms((prev) =>
      prev.map((ele) => {
        if (ele.id === id) {
          return { ...ele, isSet: !ele.isSet };
        } else {
          return ele;
        }
      })
    );
  }
  function setAlarm() {
    const [hh, mm] = alarmTime.split(":");
    setAlarms((prev) => [
      ...prev,
      {
        hour: hh < 12 ? hh : hh - 12,
        minute: mm,
        meridiem: hh < 12 ? "AM" : "PM",
        isSet: true,
        id: Math.random(),
        day: alarmDay,
        actualHour: hh,
      },
    ]);
    handleSetAlarm();
  }
  return (
    <>
      <div className="alarm">
        <div className="fix">
          <div className="heading">
            <div>
              <i className="fa-solid fa-chevron-left"></i>
            </div>
            <div>Alarm</div>
            <div onClick={playAlarm}>
              <i className="fa-solid fa-gear"></i>
            </div>
          </div>
          <div className="main">
            {isAddingAlarm ? (
              <form
                action=""
                className="alarmForm"
                onSubmit={(event) => {
                  event.preventDefault();
                  setAlarm();
                }}
              >
                <input
                  type="time"
                  name=""
                  id=""
                  required
                  onChange={(e) => setAlarmTime(e.target.value)}
                />
                <select
                  name="days"
                  id="days"
                  required
                  value={alarmDay}
                  onChange={(e) => setAlarmDay(e.target.value)}
                >
                  <option value="once">Once</option>
                  <option value="sunday">Sunday</option>
                  <option value="monday">Monday</option>
                  <option value="tuesday">Tuesday</option>
                  <option value="wednesday">Wednesday</option>
                  <option value="thirsday">Thirsday</option>
                  <option value="friday">Friday</option>
                  <option value="saturday">Saturday</option>
                  <option value="everyday">Everyday</option>
                </select>
                <button type="submit">Set Alarm</button>
              </form>
            ) : (
              <>
                <h1>
                  {hour < 10 ? "0" + hour : hour}:
                  {minute < 10 ? "0" + minute : minute}:
                  {second < 10 ? "0" + second : second}
                </h1>
                <p>
                  {date}
                  {postfixOfDate} {month}
                </p>
              </>
            )}
          </div>
          <div className="seperator">
            <div className="addBtn" onClick={handleSetAlarm}>
              +
            </div>
          </div>
        </div>
        <div className="AlreadySetAlarms">
          {alarms.map((alarm) => (
            <OneAlarm
              alarmDetails={alarm}
              key={Math.random()}
              handleToggle={handleToggle}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
