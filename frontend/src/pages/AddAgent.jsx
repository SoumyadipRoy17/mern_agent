import React, { useState } from "react";
import axios from "axios";

const AddAgent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:1000/api/agents", {
        name,
        email,
        mobile,
        password,
      });
      alert("Agent added successfully");
      setName("");
      setEmail("");
      setMobile("");
      setPassword("");
    } catch (error) {
      alert("Error adding agent");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-blue-500 p-6">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg shadow-lg rounded-lg p-8 w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-bold text-center  mb-6">Add New Agent</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium ">Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-2 p-3 rounded-lg bg-white bg-opacity-20  placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium ">Email</label>
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 p-3 rounded-lg bg-white bg-opacity-20  placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium ">Mobile</label>
            <input
              type="text"
              placeholder="Enter mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full mt-2 p-3 rounded-lg bg-white bg-opacity-20  placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium ">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 p-3 rounded-lg bg-white bg-opacity-20  placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500  py-3 rounded-lg font-semibold text-lg transition duration-300 transform hover:bg-blue-700 hover:scale-105 focus:ring-2 focus:ring-blue-400"
          >
            Add Agent
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAgent;
