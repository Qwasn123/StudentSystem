import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import LoginForm from './components/auth/LoginForm';
import Dashboard from './pages/Dashboard';
import MentorManagement from './pages/MentorManagement';
import StudentManagement from './pages/StudentManagement';
import TaskManagement from './pages/TaskManagement';
import MeetingManagement from './pages/MeetingManagement';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import DashboardLayout from './components/layout/DashboardLayout';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/dashboard" element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          } />
          <Route path="/mentors" element={
            <DashboardLayout>
              <MentorManagement />
            </DashboardLayout>
          } />
          <Route path="/students" element={
            <DashboardLayout>
              <StudentManagement />
            </DashboardLayout>
          } />
          <Route path="/tasks" element={
            <DashboardLayout>
              <TaskManagement />
            </DashboardLayout>
          } />
          <Route path="/meetings" element={
            <DashboardLayout>
              <MeetingManagement />
            </DashboardLayout>
          } />
          <Route path="/statistics" element={
            <DashboardLayout>
              <Statistics />
            </DashboardLayout>
          } />
          <Route path="/settings" element={
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          } />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
