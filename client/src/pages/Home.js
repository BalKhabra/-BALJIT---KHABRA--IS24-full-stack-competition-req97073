import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import { toast } from 'react-toastify';
import "./Home.css"
import axios from "axios";

const Home = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);

  console.log(search)
  //search bar
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };


//this shows users on frontend
  const getUsers = async() => {
    const response = await axios.get('http://localhost:3000/api/users')
    if(response.status === 200) {
    setData(response.data);
    }
  }
    
  // console.log("data=>", data);

//update users
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/api/users");
      const json = await response.json();
      setData(json);
    };
    fetchData();
  }, []);


  useEffect(() => {
    getUsers();

  }, []);


  //deleting a product
  const onDeleteUser = async (id) => {
    if(window.confirm("Product record will be deleted! 🚨")){
      const response = await axios.delete(`http://localhost:3000/api/users/${id}`);
    if(response.status === 200) {
      toast.success(response.data);
      getUsers();
    }
    }
  };
//form
  return (
    <div style= {{marginTop: "50px"}}>
      <form onSubmit={(e) => {
      e.preventDefault();
      }} > 
    <input 
    className="search-bar" 
    type="text" 
    placeholder="Search Users..." 
    value={search} 
    onChange={handleSearch} />
    </form>
      <table className="styled-table table-striped-rows">
      <thead>
          <tr>
            <th style={{ textAlign: "center" }}>ID</th>
            <th style={{ textAlign: "center" }}>Product Name</th>
            <th style={{ textAlign: "center" }}>Owner</th>
            <th style={{ textAlign: "center" }}>Developers</th>
            <th style={{ textAlign: "center" }}>Scrum Master</th>
            <th style={{ textAlign: "center" }}>Date</th>
            <th style={{ textAlign: "center" }}>Methodology</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>


        {data && data.filter((item) => {

      return search && search.toLowerCase() === '' ? item : (item.scrumMaster && item.scrumMaster.toLowerCase().includes(search.toLowerCase())) || 
      (Array.isArray(item.developers) && item.developers.join().toLowerCase().includes(search.toLowerCase()))

    }).map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.owner}</td>
              <td>{Array.isArray(item.developers) ? item.developers.join(', ') : item.developers}</td>
              <td>{item.scrumMaster}</td>
              <td>{item.date}</td>
              <td>{item.methodology}</td>
              <td>{item.action}
              <Link to={`/edit/${item.id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button className="btn btn-delete" onClick={() => onDeleteUser(item.id)}>Delete</button>
                  </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Home;





