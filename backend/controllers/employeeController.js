const Employee = require('../models/Employee');

// Get all employees from the database
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees); // Send back all employees
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees', error }); // Handle server error
  }
};

// Create a new employee
exports.createEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save(); // Save new employee in the database
    res.status(201).json({ message: 'Employee created successfully', employee_id: employee._id });
  } catch (error) {
    res.status(400).json({ message: 'Error creating employee', error }); // Handle input validation error
  }
};

// Get a specific employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.eid); // Find employee by ID
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee', error });
  }
};

// Update an existing employee by ID
exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
    res.status(200).json({ message: 'Employee details updated successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error updating employee', error });
  }
};

// Delete an employee by ID
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.query.eid); // Delete employee by ID
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    return res.status(200).json({ message: 'Employee deleted successfully' }); // Return a success message
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting employee', error }); // Return an error message
  }
};

// Search for employees by department and/or position
exports.searchEmployees = async (req, res) => {
  const { department, position } = req.query; // Extract query parameters

  try {
    // Build the query dynamically
    const query = {};
    if (department) query.department = { $regex: department, $options: 'i' };
    if (position) query.position = { $regex: position, $options: 'i' };

    // Execute the query
    const employees = await Employee.find(query);

    // Handle no results found
    if (!employees.length) {
      return res.status(404).json({ message: 'No employees found matching the criteria' });
    }

    // Return results
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Error fetching employees', error });
  }
};