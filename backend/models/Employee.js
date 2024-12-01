const mongoose = require('mongoose');

// Define the Employee schema with required fields and validation
const employeeSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  position: { type: String },
  salary: { type: Number },
  date_of_joining: { type: Date },
  department: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});


// Export the Employee model based on the schema
module.exports = mongoose.model('Employee', employeeSchema);