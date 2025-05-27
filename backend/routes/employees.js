const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Employee = require('../models/Employee');

const jsonFilePath = path.join(__dirname, '../data/employees.json');

// Helper function to read JSON file
function readEmployeesFromFile() {
  try {
    if (!fs.existsSync(jsonFilePath)) {
      fs.writeFileSync(jsonFilePath, JSON.stringify([]));
    }
    const data = fs.readFileSync(jsonFilePath);
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading employees JSON file:', err);
    return [];
  }
}

// Helper function to write JSON file
function writeEmployeesToFile(employees) {
  try {
    fs.writeFileSync(jsonFilePath, JSON.stringify(employees, null, 2));
  } catch (err) {
    console.error('Error writing employees JSON file:', err);
  }
}

// Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get employee by ID
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new employee
router.post('/', async (req, res) => {
  const employee = new Employee({
    name: req.body.name,
    email: req.body.email,
    position: req.body.position,
    department: req.body.department,
    faceImage: req.body.faceImage
  });

  try {
    const newEmployee = await employee.save();

    // Append to JSON file
    const employeesFromFile = readEmployeesFromFile();
    employeesFromFile.push(newEmployee);
    writeEmployeesToFile(employeesFromFile);

    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update employee
router.put('/:id', async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEmployee) return res.status(404).json({ message: 'Employee not found' });
    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete employee
router.delete('/:id', async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
