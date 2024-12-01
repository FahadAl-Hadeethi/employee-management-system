const express = require('express');
const {
  getEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  searchEmployees
} = require('../controllers/employeeController');

const router = express.Router();

// Route to get all employees
router.get('/employees', getEmployees);

// Route to create a new employee
router.post('/employees', createEmployee);

// Route to get a specific employee by ID
router.get('/employees/:eid', getEmployeeById);

// Route to update an employee by ID
router.put('/employees/:eid', updateEmployee);

// Route to delete an employee by ID
router.delete('/employees', deleteEmployee);

// Export the router (only once)
module.exports = router;