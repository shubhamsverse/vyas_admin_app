
import React, { useState } from 'react';
import axios from 'axios'; 
import './App.css';

const Login = () => {
  const [isAdmin, setIsAdmin] = useState(false); 
  const [adminCode, setAdminCode] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false); 
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false); 
  const [userCreated, setUserCreated] = useState(false); 

  const hardcodedAdminCode = 'admin123'; 
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isAdmin) {
      
      if (adminCode !== hardcodedAdminCode) {
        alert('Invalid admin code');
        return;
      }
      setIsAdminAuthenticated(true); 
      alert('Admin logged in successfully');
    } else {
      try {
        console.log(typeof(username), password)
        const response = await axios.post('http://localhost:5000/api/users/login', {
          username,
          password,
         
        }, axiosConfig);
        setIsUserAuthenticated(true); 
        alert(response.data.message || `Welcome ${username}`);
      } catch (error) {
        
        if (error.response) {
         
          alert(error.response.data.message || 'Invalid credentials');
        } else {
          
          alert('An error occurred in user login');
        }
      }
    }
  };

  
  const handleCreateUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/create', {
        username,
        password,
      },axiosConfig);
      setUserCreated(true);
      alert('User created successfully');
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || 'Error creating user');
      } else {
        alert('An error occurred while creating user');
      }
    }
  };

  
  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    setIsUserAuthenticated(false);
    setUsername('');
    setPassword('');
    setAdminCode('');
    setIsAdmin(false);
    alert('Logged out successfully');
  };

  return (
    <div>
      
      {(isAdminAuthenticated || isUserAuthenticated) && (
        <button onClick={handleLogout}>Logout</button>
      )}

      
      {!isAdminAuthenticated && !isUserAuthenticated && (
        <>
          <h2>{isAdmin ? 'Admin Login' : 'User Login'}</h2>

          {!isAdminAuthenticated && (
            <button onClick={() => setIsAdmin(!isAdmin)}>
              {isAdmin ? 'Switch to User Login' : 'Switch to Admin Login'}
            </button>
          )}

          <form onSubmit={handleSubmit}>
            {isAdmin ? (
              <>
                <input
                  type="text"
                  placeholder="Admin Code"
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                  required
                />
                <button type="submit">Login as Admin</button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit">Login as User</button>
              </>
            )}
          </form>
        </>
      )}

      {isAdminAuthenticated && (
        <div>
          <h3>Create New User</h3>
          <form onSubmit={handleCreateUser}>
            <input
              type="text"
              placeholder="New User Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="New User Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Create User</button>
          </form>
          {userCreated && <p>User created successfully!</p>}
        </div>
      )}
    </div>
  );
};

export default Login;

