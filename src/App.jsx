import {useState, useEffect} from "react";
import axios from "axios";
import './App.css';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import renderThreeRows from './util/utility.js';

// api docs: https://randomuser.me/documentation

// TO DO:
// Implement sorting by date //
// Refactor filtering

// BONUS TO DO:
// Refactor to make UI more reusable elsewhere in app

// AND IF THERE'S STILL TIME...
// How can you improve the UI? How can you get that sorting arrow looking right?

function App() {
  const [filter, setFilter] = useState();
  const [sortDirection, setSortDirection] = useState("asc");
  const [data, setData] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [component, setComponent] = useState(<ArrowDownwardIcon fontSize={"small"}/>);

  useEffect(() => {
    axios.get(`https://randomuser.me/api/?results=50`)
      .then(response => response.data)
      .then(d => {
        const {results} = d
        setData(results)
      })
      .catch(error => console.log(error))
  }, [])

  const filterData = (data) => {
    if (!!filter){
      const newFilter = filteredData.filter(d => d.name.first.toLowerCase().includes(filter.toLowerCase()) || d.name.last.toLowerCase().includes(filter.toLowerCase()));
      return newFilter;
    }
    return data;
  }

  const handleFilter = (e) => {
    setFilter(e.target.value);
  }

  useEffect(() => {
    const filtered = filterData(data) || [];

    if (sortDirection === "asc") {
      filtered.sort((a, b) => (new Date(a.registered.date) - new Date(b.registered.date)));
      setComponent(<ArrowDownwardIcon fontSize={"small"} />);
    } else if (sortDirection === "desc") {
      filtered.sort((a, b) => (new Date(b.registered.date) - new Date(a.registered.date)));
      setComponent(<ArrowUpwardIcon fontSize={"small"} />);
    }
    
    setFilteredData(filtered);
  }, [data, filter, sortDirection])

  const renderTable = (arr) => {
    const rows = [];

    for (let i = 0; i < arr?.length; i++) {
      const first = arr[i].name.first;
      const last = arr[i].name.last;
      const username = arr[i].login.username;
      const date = arr[i].registered.date;
      renderThreeRows(rows, first, last, username, date);
    }

    return rows;
  }

  return (
    <div className="App">
      <h1>User info</h1>
      <div>
        <label>Search by name:</label>
        <input type="text" id="search" name="search" onChange={handleFilter}/>
      </div>
      <span>
        {!filteredData && (
          !filter ? ("Error") : ("No results")
        )}
      </span>
      <table>
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Username
            </th>
            <th>
              Registration Date
              <span
                onClick={() => {
                  const newDirection = sortDirection === "asc" ? "desc" : "asc"
                  setSortDirection(newDirection)
                }}
              >
              {component}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {renderTable(filteredData)}
        </tbody>
      </table>
    </div>
  );
}

export default App;
