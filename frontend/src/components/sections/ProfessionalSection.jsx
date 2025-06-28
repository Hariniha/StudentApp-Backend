import React, { useState } from 'react';
import { Briefcase, Users, Target, TrendingUp, Star, BookOpen, Award, ExternalLink } from 'lucide-react';

const careerTips = [
  {
    category: 'Skill Development',
    icon: TrendingUp,
    color: 'from-blue-500 to-cyan-500',
    tips: [
      'Identify and develop in-demand skills in your field',
      'Take online courses and earn certifications',
      'Practice coding, design, or other technical skills regularly',
      'Stay updated with industry trends and technologies',
    ],
  },
  {
    category: 'Networking',
    icon: Users,
    color: 'from-purple-500 to-pink-500',
    tips: [
      'Join professional communities and forums',
      'Attend industry events and conferences',
      'Connect with alumni and professionals on LinkedIn',
      'Participate in online discussions and share insights',
    ],
  },
  {
    category: 'Resume & Portfolio',
    icon: Star,
    color: 'from-green-500 to-teal-500',
    tips: [
      'Keep your resume updated with latest achievements',
      'Build a strong online portfolio showcasing your work',
      'Quantify your accomplishments with numbers and results',
      'Tailor your resume for each job application',
    ],
  },
  {
    category: 'Interview Preparation',
    icon: Target,
    color: 'from-orange-500 to-red-500',
    tips: [
      'Research the company and role thoroughly',
      'Practice common interview questions',
      'Prepare specific examples using STAR method',
      'Follow up with thank-you notes after interviews',
    ],
  },
];

const resources = [
  {
    title: 'LinkedIn Learning Courses',
    description: 'Professional development courses from industry experts',
    type: 'Online Learning',
    link: '#',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    title: 'Industry Certifications Guide',
    description: 'Complete guide to valuable certifications in different fields',
    type: 'Guide',
    link: '#',
    image: 'https://images.pexels.com/photos/3184311/pexels-photo-3184311.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    title: 'Resume Templates & Examples',
    description: 'Professional resume templates for different industries',
    type: 'Templates',
    link: '#',
    image: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    title: 'Interview Practice Platform',
    description: 'AI-powered mock interviews with real-time feedback',
    type: 'Interactive',
    link: '#',
    image: 'https://images.pexels.com/photos/5726794/pexels-photo-5726794.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
];

const skillAssessments = [
  { skill: 'Technical Skills', level: 'Intermediate', progress: 75 },
  { skill: 'Communication', level: 'Advanced', progress: 85 },
  { skill: 'Leadership', level: 'Beginner', progress: 45 },
  { skill: 'Problem Solving', level: 'Advanced', progress: 90 },
  { skill: 'Project Management', level: 'Intermediate', progress: 65 },
];

export const ProfessionalSection = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Professional Development</h1>
        <p className="text-gray-600 mt-2">Build your career with expert guidance and resources</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Career Development Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {careerTips.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedCategory(index)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      selectedCategory === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color}`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-medium text-gray-900">{category.category}</h3>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {careerTips[selectedCategory].category}
              </h3>
              <ul className="space-y-3">
                {careerTips[selectedCategory].tips.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Professional Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.map((resource, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{resource.title}</h3>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {resource.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                    <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium text-sm">
                      <span>Access Resource</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2 text-purple-600" />
              Skills Assessment
            </h3>
            <div className="space-y-4">
              {skillAssessments.map((assessment, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{assessment.skill}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      assessment.level === 'Advanced' ? 'bg-green-100 text-green-800' :
                      assessment.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {assessment.level}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        assessment.progress >= 80 ? 'bg-green-500' :
                        assessment.progress >= 60 ? 'bg-yellow-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${assessment.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Career Action Plan</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Complete 2 online certifications this quarter</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Build portfolio with 3 major projects</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Network with 10 industry professionals</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Apply to 5 internship opportunities</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Update Resume</span>
                  <BookOpen className="w-4 h-4 text-gray-400" />
                </div>
              </button>
              <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Practice Interview</span>
                  <Users className="w-4 h-4 text-gray-400" />
                </div>
              </button>
              <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Skill Assessment</span>
                  <Target className="w-4 h-4 text-gray-400" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
