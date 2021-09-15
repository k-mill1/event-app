import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

function Add(props) {
  const [disabled, cDisabled] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

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

        if(!props.currentName && !props.currentLocation) {
          props.refreshList()
        } else if (props.currentLocation) {
          props.getByLocation(props.currentLocation)
        } else {
          props.getByName(props.currentName)
        };
      })
      .catch(() => {
        alert("an error occured, please try again");
        cDisabled(false);
      });
  };
 
  return (
    <>
    <Card className = "add-card">
      <Card.Header className = 'small-card-header'>{props.currentEvent ? "Update event" : "Add event"}</Card.Header>
     <Card.Body>
      <form onSubmit={(e) => submitHandler(e)} id="addForm">
        Name:
        <input
          className = "add-field"
          type="text"
          defaultValue={props.currentEvent?.name}
          name="eventName"
          disabled={disabled}
          autocomplete="off"
        />
        <br />
        Location:
        <br />
        <input
          className = "add-field"
          type="text"
          defaultValue={props.currentEvent?.location}
          name="location"
          disabled={disabled}
          autocomplete="off"
        />
        <br />
        Description:
        <br />
        <input
          className = "add-field"
          type="text"
          defaultValue={props.currentEvent?.information}
          name="information"
          disabled={disabled}
          autocomplete="off"
        />
        <br />
        Date/Time:
        <br />
        <DatePicker
            className = "add-field"
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
        
        <button className ="button-26" type="submit" disabled={disabled}>
          {" "}
          Submit{" "}
        </button>
      </form>
      </Card.Body>
      </Card>
    </>
  );
}

export default Add;

