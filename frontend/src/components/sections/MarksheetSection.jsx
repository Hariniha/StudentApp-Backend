import React, { useState } from 'react';
import { Upload, FileText, Download, Eye, Trash2, Plus } from 'lucide-react';

const mockMarksheets = [
  {
    id: '1',
    name: 'Mathematics_Semester_1.pdf',
    subject: 'Mathematics',
    semester: 'Semester 1',
    grade: 'A+',
    uploadDate: new Date('2024-01-15'),
    fileSize: '2.4 MB',
  },
  {
    id: '2',
    name: 'Physics_Semester_1.pdf',
    subject: 'Physics',
    semester: 'Semester 1',
    grade: 'A',
    uploadDate: new Date('2024-01-14'),
    fileSize: '1.8 MB',
  },
  {
    id: '3',
    name: 'Chemistry_Semester_1.pdf',
    subject: 'Chemistry',
    semester: 'Semester 1',
    grade: 'B+',
    uploadDate: new Date('2024-01-13'),
    fileSize: '2.1 MB',
  },
];

export const MarksheetSection = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file drop
    console.log('Files dropped:', e.dataTransfer.files);
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
          <span>Upload Marksheet</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockMarksheets.map((marksheet) => (
          <div
            key={marksheet.id}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow border border-gray-100"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <span
                className={`px-2 py-1 rounded-full text-sm font-medium ${
                  gradeColors[marksheet.grade] || 'bg-gray-100 text-gray-800'
                }`}
              >
                {marksheet.grade}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">{marksheet.subject}</h3>
            <p className="text-sm text-gray-600 mb-4">{marksheet.semester}</p>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">File Size:</span>
                <span className="text-gray-900">{marksheet.fileSize}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Uploaded:</span>
                <span className="text-gray-900">{marksheet.uploadDate.toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                <Eye className="w-4 h-4" />
                <span className="text-sm">View</span>
              </button>
              <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                <Download className="w-4 h-4" />
                <span className="text-sm">Download</span>
              </button>
              <button className="p-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Marksheet</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  placeholder="Enter subject name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Semester/Term</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select semester</option>
                  <option value="semester-1">Semester 1</option>
                  <option value="semester-2">Semester 2</option>
                  <option value="semester-3">Semester 3</option>
                  <option value="semester-4">Semester 4</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Grade</label>
                <input
                  type="text"
                  placeholder="Enter grade (e.g., A+, B, 85%)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600 mb-2">Drag and drop your marksheet here, or</p>
                <button className="text-blue-600 hover:text-blue-700 font-medium">browse files</button>
                <p className="text-xs text-gray-500 mt-2">Supports PDF, JPG, PNG (max 10MB)</p>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowUpload(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowUpload(false)}
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
