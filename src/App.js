import React, { useState } from 'react';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    email: '',
    phoneNumber: '',
    department: '',
    dateOfJoining: '',
    role: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required.';
    if (!formData.employeeId || formData.employeeId.length > 10) newErrors.employeeId = 'Give valid employee ID ,check length<10';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = 'Valid phone number is required(length should be 10 and no special characters)';
    if (!formData.department) newErrors.department = 'Department is required.';
    if (!formData.dateOfJoining || new Date(formData.dateOfJoining) > new Date()) newErrors.dateOfJoining = 'Date of joining must not be in the future.';
    if (!formData.role) newErrors.role = 'Role is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch('http://localhost:8080/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Employee added successfully.');
        setFormData({
          name: '',
          employeeId: '',
          email: '',
          phoneNumber: '',
          department: '',
          dateOfJoining: '',
          role: '',
        });
      } else {
        const error = await response.text();
        setMessage(error);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      employeeId: '',
      email: '',
      phoneNumber: '',
      department: '',
      dateOfJoining: '',
      role: '',
    });
    setErrors({});
    setMessage('');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-r from-violet-300 shadow-lg to-blue-200  min-h-screen p-8">
      <h1 className="text-center text-3xl font-bold mb-8 text-gray-700">Add Employee</h1>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
        
        {/* Name Field */}
        <div className="mb-6">
          <label className="block font-bold text-gray-700 mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          {errors.name && <span className="text-red-600 text-sm">{errors.name}</span>}
        </div>

        {/* Employee ID Field */}
        <div className="mb-6">
          <label className="block font-bold text-gray-700 mb-2">Employee ID:</label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          {errors.employeeId && <span className="text-red-600 text-sm">{errors.employeeId}</span>}
        </div>

        {/* Email Field */}
        <div className="mb-6">
          <label className="block font-bold text-gray-700 mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          {errors.email && <span className="text-red-600 text-sm">{errors.email}</span>}
        </div>

        {/* Phone Number Field */}
        <div className="mb-6">
          <label className="block font-bold text-gray-700 mb-2">Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          {errors.phoneNumber && <span className="text-red-600 text-sm">{errors.phoneNumber}</span>}
        </div>

        {/* Date of Joining Field */}
        <div className="mb-6">
          <label className="block font-bold text-gray-700 mb-2">Date of Joining:</label>
          <input
            type="date"
            name="dateOfJoining"
            value={formData.dateOfJoining}
            onChange={handleChange}
            max={new Date().toISOString().split("T")[0]} // Ensures the date cannot be in the future
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          {errors.dateOfJoining && <span className="text-red-600 text-sm">{errors.dateOfJoining}</span>}
        </div>

        {/* Role Field */}
        <div className="mb-6">
          <label className="block font-bold text-gray-700 mb-2">Role:</label>
          <select
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          >
            <option value="">Select</option>
            <option value="Engineering">Manager</option>
            <option value="Marketing">Developer</option>
          </select>
          {errors.role && <span className="text-red-600 text-sm">{errors.role}</span>}
        </div>

        {/* Department Field */}
        <div className="mb-6">
          <label className="block font-bold text-gray-700 mb-2">Department:</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          >
            <option value="">Select</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
          </select>
          {errors.department && <span className="text-red-600 text-sm">{errors.department}</span>}
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-md cursor-pointer hover:bg-blue-700"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-300 text-gray-700 p-3 rounded-md cursor-pointer hover:bg-gray-400"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default App;