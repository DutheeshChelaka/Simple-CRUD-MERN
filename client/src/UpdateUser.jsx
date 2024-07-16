import { useState, useEffect } from "react";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

function UpdateUser() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/getUser/' + id)
      .then(result => {
        setName(result.data.name);
        setEmail(result.data.email);
        setAge(result.data.age);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
      });
  }, [id]);

  const updateUser = (e) => {
    e.preventDefault();
    axios.patch('http://localhost:3001/update/' + id, { name, email, age })
      .then(result => {
        console.log(result);
        navigate('/');
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
  };

  return (
    <div>
      <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
          <form onSubmit={updateUser}>
            <h2>Update User</h2>
            <div className='mb-2'>
              <label htmlFor='name'>Name</label>
              <input
                type='text'
                id='name'
                placeholder='Enter Name'
                className='form-control'
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className='mb-2'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                id='email'
                placeholder='Enter Email'
                className='form-control'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className='mb-2'>
              <label htmlFor='age'>Age</label>
              <input
                type='text'
                id='age'
                placeholder='Enter Age'
                className='form-control'
                value={age}
                onChange={e => setAge(e.target.value)}
              />
            </div>
            <button className='btn btn-success' type='submit'>Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;
