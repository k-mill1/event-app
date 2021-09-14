import React, { useState, useEffect } from "react";
import Add from "./Add";

function Dashboard(props) {
  const [events, cEvents] = useState([]);
  const [current, cCurrent] = useState(undefined);

  const refreshList = () => {
    props.client.getEvents().then((response) => cEvents(response.data));
  };

  const removeEvent = (id) => {
    props.client.removeEvent(id).then(() => refreshList());
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
          <td>{current.time}</td>
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
      <table>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Location</th>
            <th>Information</th>
            <th>Date</th>
            <th>Time</th>
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
      />
    </>
  );
}

export default Dashboard;
