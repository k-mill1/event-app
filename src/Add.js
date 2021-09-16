import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

function Add(props) {
  const [disabled, cDisabled] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  console.log(props.currentEvent)
  const [formDate, setFormDate] = useState(props.currentEvent?.date ? new Date(props.currentEvent.date) : new Date())

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

  // 
  const handleDateChange = (e) => {
    if(props.currentEvent){
      setFormDate(e)
    }
    else{
      setStartDate(e)
    }
  }

  // when we select an event to update
  useEffect(() => {
    setFormDate(props.currentEvent?.date ? new Date(props.currentEvent.date) : new Date())
  }, [props.currentEvent])

 
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
          autoComplete="off"
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
          autoComplete="off"
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
          autoComplete="off"
        />
        <br />
        Date/Time:
        <br />
        <DatePicker
            className = "add-field"
            selected={props.currentEvent ? formDate : startDate}
            onChange={(e) => handleDateChange(e)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            timeCaption="time"
            dateFormat="MMMM d yyyy h:mm aa"
            disabled={disabled}
            name = "date"
        />
        <br />
        
        <button className ="button-26" type="submit" disabled={disabled}>
          {" "}
          Submit{" "}
        </button>

        {/* <button className ="button-28" >
          {" "}
          Cancel{" "}
        </button> */}
      </form>
      </Card.Body>
      </Card>
    </>
  );
}

export default Add;

