import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/')
      .then(result => {
        setUsers(result.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setError('Error fetching users. Please try again later.');
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/deleteUser/${id}`)
      .then(res => {
        console.log(res);
        // Update users state after successful deletion if needed
        setUsers(users.filter(user => user._id !== id));
      })
      .catch(err => {
        console.error('Error deleting user:', err);
        // Handle error if needed
      });

    console.log(`Deleting user with ID: ${id}`);
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className='w-50 bg-white rounded p-3'>
        <Link to="/create" className='btn btn-success'>Add +</Link>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  <Link to={`/update/${user._id}`} className='btn btn-success'>Update</Link>
                  <button className='btn btn-danger ms-2' onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
