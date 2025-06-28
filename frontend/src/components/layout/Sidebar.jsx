import React from 'react';
import { 
  Home, 
  User, 
  FileText, 
  Trophy, 
  BookOpen, 
  MessageSquare, 
  Heart, 
  Briefcase,
  Upload,
  Target,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'quizzes', label: 'Self-Evaluation', icon: User },
  { id: 'marksheets', label: 'Marksheets', icon: Upload },
  { id: 'notes', label: 'Study Notes', icon: FileText },
  { id: 'achievements', label: 'Achievements', icon: Trophy },
  { id: 'journal', label: 'Personal Journal', icon: BookOpen },
  { id: 'recommendations', label: 'Domain Recommendations', icon: Target },
  { id: 'communication', label: 'Communication', icon: MessageSquare },
  { id: 'health', label: 'Health Guidance', icon: Heart },
  { id: 'professional', label: 'Professional Tips', icon: Briefcase },
];

export const Sidebar = ({ activeSection, onSectionChange }) => {
  const { user, isLoading, logout } = useAuth();


  if (isLoading) {
    return (
      <div className="w-64 p-6">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-64 bg-white shadow-lg h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>

          <div>
            <h2 className="font-semibold text-gray-900">Welcome</h2>
            <p className="text-sm text-gray-600">Student</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeSection === item.id
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 pt-8 border-t border-gray-200">
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
};