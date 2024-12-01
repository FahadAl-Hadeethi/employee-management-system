import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Ensure these are imported
import Signup from './components/Signup';
import Login from './components/Login';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import UpdateEmployee from './components/UpdateEmployee';
import ViewEmployee from './components/ViewEmployee';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/update-employee/:id" element={<UpdateEmployee />} />
        <Route path="/view-employee/:id" element={<ViewEmployee />} />
      </Routes>
    </Router>
  );
};

export default App;
