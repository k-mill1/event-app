import React, { useState, useEffect } from "react";
import Add from "./Add";
import Searchbar from "./searchBar";
import Card from 'react-bootstrap/Card';
import './App.css';
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css"

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
            <button className ="button-28" onClick={() => removeEvent(current._id)}> Remove</button>{' '}
            <button className ="button-27" onClick={() => updateEvent(current)}> Update</button>
          </td>
        </tr>
      );
    });
  };
  
  return (
    <>
    <Container fluid="xs">
      <Card>
        <Card.Header className = "large-header">Dashboard</Card.Header>
        <Card.Body >
          <Row>
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
          </Row>
          <br />
            <Row>
              <Col xs = {7}>
              <Card className = 'event-card'>
                <Card.Header className = 'small-card-header' >Events</Card.Header>
                <Card.Body>
                  <Table className = 'event-table'>
                  <thead  >
                    <tr>
                      <th>Name</th>
                      <th>Location</th>
                      <th>Description</th>
                      <th>Date/Time</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>{buildrows()}</tbody>
                </Table>
                </Card.Body>
              </Card>
              </Col>
              <Col>
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
              </Col>
            </Row>
            <button className = "button-62 log-out-button" onClick={() => props.client.logoutHandler()}> Log out</button>
          </Card.Body>
        </Card>
      </Container> 
    </>
  );
}

export default Dashboard;
