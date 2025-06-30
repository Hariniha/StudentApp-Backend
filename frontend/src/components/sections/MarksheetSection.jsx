import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Upload, FileText, Download, Eye, Trash2, Plus } from 'lucide-react';

export const MarksheetSection = () => {
  const [marksheets, setMarksheets] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    semester: '',
    grade: '',
  });

  useEffect(() => {
    fetchMarksheets();
  }, []);

  const fetchMarksheets = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/marksheets');
      setMarksheets(res.data);
    } catch (err) {
      console.error('Error fetching marksheets:', err);
    }
  };

  const handleDelete = async (id) => {
  if (!window.confirm('Are you sure you want to delete this marksheet?')) return;
  try {
    await axios.delete(`http://localhost:5000/api/marksheets/${id}`);
    fetchMarksheets(); // Refresh list
  } catch (err) {
    console.error('Delete failed:', err);
  }
};




  const handleUpload = async () => {
    const data = new FormData();
    data.append('subject', formData.subject);
    data.append('semester', formData.semester);
    data.append('grade', formData.grade);

    try {
      await axios.post('http://localhost:5000/api/marksheets', formData);
      setShowUpload(false);
      fetchMarksheets();
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const gradeColors = {
    'A+': 'bg-green-100 text-green-800',
    A: 'bg-green-100 text-green-700',
    'B+': 'bg-blue-100 text-blue-800',
    B: 'bg-blue-100 text-blue-700',
    'C+': 'bg-yellow-100 text-yellow-800',
    C: 'bg-yellow-100 text-yellow-700',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Marksheets</h1>
          <p className="text-gray-600 mt-2">Upload and manage your academic documents</p>
        </div>
        <button
          onClick={() => setShowUpload(true)}
          className="bg-gradient-to-r from-blue-500 to-teal-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-teal-700 transition-all flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Upload Marks with Subject</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {marksheets.map((marksheet) => (
          <div
            key={marksheet._id}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow border border-gray-100"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <span
                className={`px-2 py-1 rounded-full text-sm font-medium ${gradeColors[marksheet.grade] || 'bg-gray-100 text-gray-800'
                  }`}
              >
                {marksheet.grade}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{marksheet.subject}</h3>
            <p className="text-sm text-gray-600 mb-4">{marksheet.semester}</p>
            <div className="space-y-2 mb-4">

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Uploaded:</span>
                <span className="text-gray-900">
                  {marksheet.uploadDate ? new Date(marksheet.uploadDate).toLocaleDateString() : 'No date'}
                </span>
                <button
      onClick={() => handleDelete(marksheet._id)}
      className="text-red-500 hover:text-red-700 ml-4"
      title="Delete"
    >
      <Trash2 className="w-5 h-5" />
    </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Marksheet</h3>
            <div className="space-y-4">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Enter subject"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            
              <select
                name="semester"
                value={formData.semester}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                

                  <option value="">Select Semester</option>
                  <option value="Semester 1">Semester 1</option>
                  <option value="Semester 2">Semester 2</option>
                  <option value="Semester 3">Semester 3</option>
                  <option value="Semester 4">Semester 4</option>
                  <option value="Semester 3">Semester 5</option>
                  <option value="Semester 4">Semester 6</option>
                  <option value="Semester 3">Semester 7</option>
                  <option value="Semester 4">Semester 8</option>
                

               
              </select>
              <input
                type="text"
                name="grade"
                value={formData.grade}
                onChange={handleInputChange}
                placeholder="Enter grade (e.g., A+)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />

            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowUpload(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-600 text-white rounded-lg hover:from-blue-600 hover:to-teal-700"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
