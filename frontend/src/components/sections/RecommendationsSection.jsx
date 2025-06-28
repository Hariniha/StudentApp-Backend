import React from 'react';
import { Target, TrendingUp, Star, ArrowRight, BookOpen, Code, Palette, Calculator } from 'lucide-react';

const domainRecommendations = [
  {
    domain: 'Computer Science & Engineering',
    match: 92,
    description: 'Based on your strong performance in mathematics and logical thinking skills',
    subjects: ['Programming', 'Algorithms', 'Data Structures', 'Software Engineering'],
    careerPaths: ['Software Developer', 'Data Scientist', 'AI Engineer', 'System Architect'],
    icon: Code,
    color: 'from-blue-500 to-cyan-600',
  },
  {
    domain: 'Mathematics & Statistics',
    match: 88,
    description: 'Your excellent analytical skills and problem-solving abilities align well',
    subjects: ['Pure Mathematics', 'Applied Statistics', 'Operations Research', 'Actuarial Science'],
    careerPaths: ['Data Analyst', 'Research Mathematician', 'Actuary', 'Financial Analyst'],
    icon: Calculator,
    color: 'from-purple-500 to-pink-600',
  },
  {
    domain: 'Creative Arts & Design',
    match: 75,
    description: 'Your creative thinking and aesthetic sense show great potential',
    subjects: ['Digital Design', 'Fine Arts', 'Animation', 'User Experience Design'],
    careerPaths: ['Graphic Designer', 'UX/UI Designer', 'Animator', 'Art Director'],
    icon: Palette,
    color: 'from-orange-500 to-red-600',
  },
  {
    domain: 'Literature & Communication',
    match: 82,
    description: 'Strong communication skills and language proficiency indicate good fit',
    subjects: ['Creative Writing', 'Journalism', 'Public Relations', 'Content Strategy'],
    careerPaths: ['Content Writer', 'Journalist', 'Editor', 'Communications Manager'],
    icon: BookOpen,
    color: 'from-green-500 to-teal-600',
  },
];

const skillsAssessment = [
  { skill: 'Analytical Thinking', score: 92, category: 'Cognitive' },
  { skill: 'Problem Solving', score: 88, category: 'Cognitive' },
  { skill: 'Creative Thinking', score: 76, category: 'Creative' },
  { skill: 'Communication', score: 82, category: 'Social' },
  { skill: 'Leadership', score: 74, category: 'Social' },
  { skill: 'Technical Skills', score: 85, category: 'Technical' },
];

export const RecommendationsSection = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Domain Recommendations</h1>
        <p className="text-gray-600 mt-2">Discover career paths that align with your strengths and interests</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommended Domains</h2>
            <div className="space-y-4">
              {domainRecommendations.map((domain, index) => {
                const IconComponent = domain.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow border border-gray-100"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${domain.color}`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{domain.domain}</h3>
                          <p className="text-sm text-gray-600">{domain.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-2xl font-bold ${
                            domain.match >= 85 ? 'text-green-600' : domain.match >= 70 ? 'text-yellow-600' : 'text-gray-600'
                          }`}
                        >
                          {domain.match}%
                        </div>
                        <div className="text-sm text-gray-500">Match</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full bg-gradient-to-r ${domain.color} transition-all duration-500`}
                          style={{ width: `${domain.match}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Key Subjects</h4>
                        <div className="flex flex-wrap gap-1">
                          {domain.subjects.map((subject, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Career Paths</h4>
                        <div className="flex flex-wrap gap-1">
                          {domain.careerPaths.map((career, idx) => (
                            <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                              {career}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium">
                      <span>Explore this domain</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-blue-600" />
              Skills Assessment
            </h3>
            <div className="space-y-4">
              {skillsAssessment.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{skill.skill}</span>
                    <span className="text-sm text-gray-500">{skill.score}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        skill.score >= 85 ? 'bg-green-500' : skill.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${skill.score}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{skill.category}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <Star className="w-6 h-6 text-yellow-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Next Steps</h3>
            </div>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                Take advanced courses in your top recommended domains
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                Connect with professionals in fields of interest
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                Consider internships or project work
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                Build a portfolio showcasing your skills
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
