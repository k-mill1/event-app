import React, { useState, useEffect } from "react";
import Add from "./Add";

function Dashboard(props) {
  const [events, cEvents] = useState([]);
  const [current, cCurrent] = useState(undefined);
  const [location, cLocation] = useState(undefined)
  const [name, cName] = useState(undefined)

  const refreshList = () => {
    props.client.getEvents().then((response) => cEvents(response.data));
  };

  const removeEvent = (id) => {
    props.client.removeEvent(id).then(() => !location && !name ? refreshList() : location ? getByLocation(location) : getByName(name));
  };

  const getByLocation = (loc) => {
    props.client.getByLocation(loc).then((response) => cEvents(response.data));
  };

  const getByName = (nam) => {
    props.client.getByName(nam).then((response) => cEvents(response.data));
  };

  const updateEvent = (ev) => {
    cCurrent(ev);
  };

  useEffect(() => {
    refreshList();
  }, []);

  const buildrows = () => {
    return events.map((current) => {
      return (
        <tr key={current._id}>
          <td>{current.name}</td>
          <td>{current.location}</td>
          <td>{current.information}</td>
          <td>{current.date}</td>
          <td>
            <button onClick={() => removeEvent(current._id)}> remove</button>
            <button onClick={() => updateEvent(current)}> update</button>
          </td>
        </tr>
      );
    });
  };

  const submitLocationHandler = (e) => {
    e.preventDefault();
    getByLocation(e.target.location.value)
    cLocation(e.target.location.value)
    cName(undefined)
    document.getElementById("addNameSearchForm").reset()
  };

  const submitNameHandler = (e) => {
    e.preventDefault();
    getByName(e.target.name.value)
    cName(e.target.name.value)
    cLocation(undefined)
    document.getElementById("addLocationSearchForm").reset()
  };

  const onClickFunction = () => {
    document.getElementById("addLocationSearchForm").reset()
    document.getElementById("addNameSearchForm").reset()
    refreshList()
    cLocation(undefined)
    cName(undefined)
  };
  return (
    <>
      Dashboard
      <br />
     
      <form onSubmit={(e) => submitLocationHandler(e)} id="addLocationSearchForm">
        Search by location: <br />
        <input
        type="text"
        name="location"
        />
        <br />
        <button type="submit">
        {" "}
        Search{" "}
        </button>
      </form>

      <form onSubmit={(e) => submitNameHandler(e)} id="addNameSearchForm">
        Search by name: <br />
        <input
        type="text"
        name="name"
        />
        <br />
        <button type="submit">
        {" "}
        Search{" "}
        </button>
      </form>
      
      <button onClick = {() => onClickFunction()} >
        {" "}
        Show All{" "}
      </button> 
   
      <table>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Location</th>
            <th>Information</th>
            <th>Date/time</th>
          </tr>
        </thead>
        <tbody>{buildrows()}</tbody>
      </table>
      <br />
      <br />
      <Add
        client={props.client}
        refreshList={() => {
          refreshList();
          cCurrent(undefined);
        }}
        currentEvent={current}
        currentLocation={location}
        currentName={name}
        getByLocation={(loc) => getByLocation(loc)}
        getByName={(nam) => getByName(nam)}
      />
      <br />
      <button onClick={() => props.client.logoutHandler()}> log out</button>
    </>
  );
}

export default Dashboard;
