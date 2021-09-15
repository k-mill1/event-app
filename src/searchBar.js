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
        </>
    ) 
}

export default Searchbar;