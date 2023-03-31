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

const Edit = () => {
  const [state, setState] = useState(initialState)
  // const {name, owner, developers, scrumMaster, date, methodology} = state
  const navigate = useNavigate()
  const {id} = useParams();
  const [item, setItem] = useState({});


  //read the data
  useEffect(() => {
    const fetchItem = async () => {
      const response = await axios.get(`http://localhost:3000/api/users/${id}`);
      console.log(response.data)
      setItem(response.data);
    };
    fetchItem();
  }, [id]);

//update data
const updateUser = async (data, id) => {
  const response = await axios.put(`http://localhost:3000/api/users/${id}`, data);
  if(response.status === 200) {
    toast.success(response.data);
    setState({...response.data[0]})
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3000/api/users/${id}`, item);
    if (!id) {
            updateUser(state);
       } 
    setTimeout(() =>navigate(`/`), 500);
    
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
        required
        placeholder='Enter Product Name' 
        onChange={(e) => handleInputChange(e)} 
        value={item.name}
        />

        <input 
        type="text" 
        id="owner" 
        name="owner"
        required 
        placeholder='Enter Product Owner' 
        onChange={(e) => handleInputChange(e)} 
        value={item.owner}
        />

        <input 
        type="text" 
        id="developers" 
        name="developers"
        required 
        placeholder='Enter Developers' 
        onChange={(e) => handleInputChange(e)} 
        value={item.developers}
        />

        <input 
        type="text" 
        id="scrumMaster" 
        name="scrumMaster"
        required 
        placeholder='Enter Scrum Master' 
        onChange={(e) => handleInputChange(e)} 
        value={item.scrumMaster}
        />

      <input 
      type="date" 
      id="date" 
      name="date" 
      required
      className='bg-slate-300 pointer-events-none'
      placeholder='Enter Start Date' 
      value={item.date}
      disabled="disabled"
    />
      <select
      id="methodology"
      name="methodology"
      required
      value={item.methodology}
      onChange={(e) => handleInputChange(e)}>
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