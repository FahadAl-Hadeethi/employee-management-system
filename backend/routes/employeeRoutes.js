const express = require('express');
const {
  getEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  searchEmployee, // Import the search function
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

// Route to search employees by department or position
router.get('/employees/search', searchEmployee); // Corrected function name

// Export the router
module.exports = router;