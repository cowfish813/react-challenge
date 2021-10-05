import {useState, useEffect} from "react"
import axios from "axios"
import './App.css';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

// api docs: https://randomuser.me/documentation

function App() {
  const [filter, setFilter] = useState<any>()
  const [sortBy, setSortBy] = useState<string>("state")
  const [sortDirection, setSortDirection] = useState<string>("asc")
  const [data, setData] = useState<any>()
  const [filteredData, setFilteredData] = useState<any>([])

  useEffect(() => {
    axios.get(`https://randomuser.me/api/?results=50`)
      .then(response => response.data)
      .then(d => {
        const {results} = d
        setData(results)
      })
      .catch(error => console.log(error))
  }, [])

  const filterData = (data: Array<any>) => {
    let filteredData = data

    if (!!filter){
      filteredData = filteredData.filter(d => d.name.first.includes(filter) || d.name.last.includes(filter))
    }

    return filteredData
  }

  useEffect(() => {
    const filtered = filterData(data)
    setFilteredData(filtered)
  }, [filter])

  const renderSortingIcon = () => {
    if (sortDirection === "asc") return <ArrowUpwardIcon />
    if (sortDirection === "desc") return <ArrowDownwardIcon />
    return null
  }

  const renderRows = () => {
    for (let i = 0; i < filteredData?.length; i++){
      return (
        <tr>
          <td>{filteredData[i].name.first} {filteredData[i].name.last}</td>
          <td>{filteredData[i].login.username}</td>
          <td>{filteredData[i].registered.date}</td>
        </tr>
      )
    }
  }

  return (
    <div className="App">
      <h1>User info</h1>
      <label>Search by name:</label>
      <input type="text" id="search" name="search" onChange={(e: any) => setFilter(e.target.value)}/>
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
              <span
                onClick={() => {
                  const newDirection = sortDirection === "asc" ? "desc" : "asc"
                  setSortDirection(newDirection)
                }}
              >
              {renderSortingIcon()}
              </span>
            </th>
            <th>
              Username
            </th>
            <th>
              Registration Date
            </th>
          </tr>
        </thead>
        <tbody>
          {renderRows()}
        </tbody>
      </table>
    </div>
  );
}

export default App;
