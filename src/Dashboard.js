import React, { useState, useEffect } from "react";
import Add from "./Add";
import Searchbar from "./searchBar";

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
  
  return (
    <>
      Dashboard
      <br />
     <Searchbar 
        refreshList={() => {
          refreshList();
          cCurrent(undefined);
        }}
        cName={cName}
        cLocation={cLocation}
        getByLocation={(loc) => getByLocation(loc)}
        getByName={(nam) => getByName(nam)}
     />
   
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Description</th>
            <th>Date/time</th>
            <th>Actions</th>
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
