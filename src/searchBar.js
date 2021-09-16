import './App.css';
import Col from 'react-bootstrap/Row';
import "bootstrap/dist/css/bootstrap.min.css"

function Searchbar(props) {

    const resetName = () => {
        props.cName(undefined)
        document.getElementById("addNameSearchForm").reset()
    }
    
    const resetLocation = () => {
      props.cLocation(undefined)
      document.getElementById("addLocationSearchForm").reset()
    }
  
    const submitLocationHandler = (e) => {
      e.preventDefault();
      props.getByLocation(e.target.location.value)
      props.cLocation(e.target.location.value)
      resetName()
    };
  
    const submitNameHandler = (e) => {
      e.preventDefault();
      props.getByName(e.target.name.value)
      props.cName(e.target.name.value)
      resetLocation()
    };
  
    const onClickFunction = () => {
      props.refreshList()
      resetName()
      resetLocation()
    };

    return (
        <>
        <Col xs = {7}>
            <form onSubmit={(e) => submitLocationHandler(e)} id="addLocationSearchForm">
                <input className = "search-field" type="text" name="location" placeholder="Search by location" autoComplete="off"/>
                <button className = "search-button button-26" type="submit">
                    {" "}
                    Search{" "}
                </button>
            </form>
            <form onSubmit={(e) => submitNameHandler(e)} id="addNameSearchForm">
                <input className = "search-field" type="text" name="name" placeholder="Search by name" autoComplete="off" />
                <button className="search-button button-26" type="submit">
                    {" "}
                    Search{" "}
                </button>
            </form>
                
            <button className="show-button button-26" onClick = {() => onClickFunction()} >
                {" "}
                Show All{" "}
            </button>
        </Col>
        
        </>
    ) 
}

export default Searchbar;