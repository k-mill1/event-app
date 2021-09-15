import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Add(props) {
  const [disabled, cDisabled] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
    // console.log(startDate)
  const submitHandler = (e) => {
    e.preventDefault();
    cDisabled(true);
    let result;
    if (props.currentEvent) {
      result = props.client.updateEvent(
        props.currentEvent._id,
        e.target.eventName.value,
        e.target.location.value,
        e.target.information.value,
        e.target.date.value
      );
    } else {
      result = props.client.addEvent(e.target.eventName.value, e.target.location.value, e.target.information.value, e.target.date.value);
    }
    result
      .then(() => {
        cDisabled(false);
        setStartDate(new Date())
        document.getElementById("addForm").reset();
        props.refreshList();
      })
      .catch(() => {
        alert("an error occured, please try again");
        cDisabled(false);
      });
  };

  return (
    <>
      {props.currentEvent ? "Update" : "Add"}
      <br />

      <form onSubmit={(e) => submitHandler(e)} id="addForm">
        Name: <br />
        <input
          type="text"
          defaultValue={props.currentEvent?.name}
          name="eventName"
          disabled={disabled}
        />
        <br />
        Location:
        <br />
        <input
          type="text"
          defaultValue={props.currentEvent?.location}
          name="location"
          disabled={disabled}
        />
        <br />
        Information:
        <br />
        <input
          type="text"
          defaultValue={props.currentEvent?.information}
          name="information"
          disabled={disabled}
        />
        <br />
        Date:
        <br />
        <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
            disabled={disabled}
            name = "date"
        />
        <br />
        <br />
        <button type="submit" disabled={disabled}>
          {" "}
          Submit{" "}
        </button>
      </form>
    </>
  );
}

export default Add;
