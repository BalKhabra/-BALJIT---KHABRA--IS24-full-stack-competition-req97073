import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from 'axios';
import {toast} from 'react-toastify';
import "./AddEdit.css"


const initialState = {
  name: "",
  owner: "",
  developers:[],
  scrumMaster:"",
  date:"",
  methodology:"",
};
const Add = () => {
const [state, setState] = useState(initialState)
const {name, owner, developers, scrumMaster, date, methodology} = state
const navigate = useNavigate()
const {id} = useParams();



// useEffect(() => {
//   const fetchItem = async () => {
//     const response = await axios.post(`http://localhost:3000/api/users/${id}`);
//     console.log(response.data)
//     setState(response.data);
//   };
//   fetchItem();
// }, [id]);

useEffect(() => {
  if (id) {
  getSingleUser(id);
  }

  
}, [id])

const getSingleUser = async (id) => {
  const response = await axios.get(`http://localhost:3000/api/users/${id}`);
  if (response.status === 200) {
    setState({ ...response.data[0] })
  }
};


//add data
const addUser = async (data) => {
  const response = await axios.post("http://localhost:3000/api/users", data);
  if(response.status === 200) {
    toast.success(response.data);
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!name || !owner || !developers || !scrumMaster || !date || !methodology) {
    toast.error("Missing Value!");
  } else {
    await addUser(state);
    setTimeout(() => navigate(`/`), 500);
  }
};


  const handleInputChange = (e) => {
    let {name, value} = e.target;
    setState({...state, [name]: value })
  }

  //form
  return (
    <div style={{ marginTop: "100px" }}>
        <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
          }}
        onSubmit={handleSubmit}
        >

        <label htmlFor="name">Add New Product</label>
        
        <input 
        type="text" 
        id="name" 
        name="name" 
        required
        placeholder='Enter Product Name' 
        onChange={handleInputChange} 
        value={name}
        />

        <input 
        type="text" 
        id="owner" 
        name="owner" 
        required
        placeholder='Enter Product Owner' 
        onChange={handleInputChange} 
        value={owner}
        />

        <input 
        type="text" 
        id="developers" 
        name="developers"
        required 
        placeholder='Enter Developers' 
        onChange={handleInputChange} 
        value={developers}
        />

        <input 
        type="text" 
        id="scrumMaster" 
        name="scrumMaster"
        required 
        placeholder='Enter Scrum Master' 
        onChange={handleInputChange} 
        value={scrumMaster}
        />
        <input 
        type="date" 
        id="date" 
        name="date"
        required 
        placeholder='Enter Start Date' 
        onChange={handleInputChange} 
        value={date}
        />
        
      <select
      id="methodology"
      name="methodology"
      required
      value={methodology}
      onChange={handleInputChange}>
      <option value="">Choose Methodology</option>
      <option value="Agile"> Agile </option>
      <option value="Waterfall">Waterfall</option>
      </select>
        <input type="submit" value={"Add"}/>
        </form>
    </div>
  )
}

export default Add;