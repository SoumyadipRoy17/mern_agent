import React, { useState } from "react";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";

const UploadList = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("❌ Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const response = await axios.post(
        "http://localhost:1000/api/lists/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setMessage(`✅ ${response.data.message}`);
    } catch (error) {
      setMessage(`❌ ${error.response?.data?.error || "Error uploading file"}`);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage(""); // Reset message
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    setFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 p-6">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg shadow-lg rounded-lg p-8 w-full max-w-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-center  mb-6">
          Upload CSV / XLS File
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Drag & Drop Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
              dragOver
                ? "border-blue-400 bg-blue-200 bg-opacity-20"
                : "border-gray-400"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <FaCloudUploadAlt className="text-4xl  mb-2" />
            <p className=" text-sm">Drag & Drop your file here</p>
            <p className="text-xs text-gray-300">(or click to select a file)</p>
          </div>

          {/* File Input */}
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileChange}
            required
            className="hidden"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className="block text-center bg-blue-500 hover:bg-blue-700  font-bold py-2 px-4 rounded-md cursor-pointer transition duration-300"
          >
            {file ? file.name : "Choose File"}
          </label>

          {/* Upload Button */}
          <button
            type="submit"
            disabled={uploading}
            className={`w-full py-2 px-4  font-semibold rounded-md transition-all duration-300 ${
              uploading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-700"
            }`}
          >
            {uploading ? "Uploading..." : "Upload File"}
          </button>
        </form>

        {/* Message Display */}
        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.includes("✅") ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default UploadList;
