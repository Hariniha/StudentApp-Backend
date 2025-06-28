import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginForm } from './components/auth/LoginForm';
import { SignupForm } from './components/auth/SignupForm';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './components/sections/Dashboard';
import { QuizSection } from './components/sections/QuizSection';
import { MarksheetSection } from './components/sections/MarksheetSection';
import { NotesSection } from './components/sections/NotesSection';
import { AchievementsSection } from './components/sections/AchievementsSection';
import { JournalSection } from './components/sections/JournalSection';
import { RecommendationsSection } from './components/sections/RecommendationsSection';
import { CommunicationSection } from './components/sections/CommunicationSection';
import { HealthSection } from './components/sections/HealthSection';
import { ProfessionalSection } from './components/sections/ProfessionalSection';

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {isLogin ? (
          <LoginForm onSwitchToSignup={() => setIsLogin(false)} />
        ) : (
          <SignupForm onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
};

const MainApp = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'quizzes':
        return <QuizSection />;
      case 'marksheets':
        return <MarksheetSection />;
      case 'notes':
        return <NotesSection />;
      case 'achievements':
        return <AchievementsSection />;
      case 'journal':
        return <JournalSection />;
      case 'recommendations':
        return <RecommendationsSection />;
      case 'communication':
        return <CommunicationSection />;
      case 'health':
        return <HealthSection />;
      case 'professional':
        return <ProfessionalSection />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">{renderSection()}</div>
      </main>
    </div>
  );
};

const AppContent = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return user ? <MainApp /> : <AuthScreen />;
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
