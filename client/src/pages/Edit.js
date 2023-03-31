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
  date:[],
  methodology:"",
};

const Edit = () => {
  const [state, setState] = useState(initialState)
  const {name, owner, developers, scrumMaster, date, methodology} = state
  const navigate = useNavigate()
  const {id} = useParams();
  const [item, setItem] = useState({});

  useEffect(() => {
    if (id) {
    getSingleUser(id);
    }
  }, [id])

  //read the data
  useEffect(() => {
    const fetchItem = async () => {
      const response = await axios.get(`http://localhost:3000/api/users/${id}`);
      console.log(response.data)
      setItem(response.data);
    };
    fetchItem();
  }, [id]);


const getSingleUser = async (id) => {
  const response = await axios.get(`http://localhost:3000/user/${id}`);
  if(response.status === 200) {
    setState({...response.data[0]})
  }
}; 

//update data
const updateUser = async (data, id) => {
  const response = await axios.put(`http://localhost:3000/api/users/${id}`, data);
  if(response.status === 200) {
    toast.success(response.data);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3000/api/users/${id}`, item);
    if(!name || !owner || !developers || !scrumMaster || !date || !methodology){
      toast.error("Missing Value!")
    } else {
       if (!id) {
            updateUser(state);
       } 
    setTimeout(() =>navigate(`/`), 500);
    }

  }

  const handleInputChange = (e) => {
    let {name, value} = e.target;
    setItem({...item, [name]: value })
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

        <label htmlFor="name">Update Product</label>
        
        <input 
        type="text" 
        id="name" 
        name="name" 
        placeholder='Enter Product Name' 
        onChange={handleInputChange} 
        value={item.name}
        />

        <input 
        type="text" 
        id="owner" 
        name="owner" 
        placeholder='Enter Product Owner' 
        onChange={handleInputChange} 
        value={item.owner}
        />

        <input 
        type="text" 
        id="developers" 
        name="developers" 
        placeholder='Enter Developers' 
        onChange={handleInputChange} 
        value={item.developers}
        />

        <input 
        type="text" 
        id="scrumMaster" 
        name="scrumMaster" 
        placeholder='Enter Scrum Master' 
        onChange={handleInputChange} 
        value={item.scrumMaster}
        />

      <input 
      type="date" 
      id="date" 
      name="date" 
      className='bg-slate-300 pointer-events-none'
      placeholder='Enter Start Date' 
      value={item.date}
      disabled="disabled"
    />
      <select
      id="methodology"
      name="methodology"
      value={item.methodology}
      onChange={handleInputChange}>
      <option value="">Choose Methodology</option>
      <option value="Agile"> Agile </option>
      <option value="Waterfall">Waterfall</option>
      </select>
        <input type="submit" value={"Update"}/>
        </form>
    </div>
  )
}

export default Edit;