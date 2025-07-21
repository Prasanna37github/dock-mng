import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FileUpload from './components/FileUpload';
import AdminPage from './components/AdminPage';
import { Home, Upload, Lock, Cloud, Settings, Star, Clock, Plus, Zap, Globe, Github, MessageCircle } from 'lucide-react';
import './index.css';

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const handleAdminLogin = (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300">
        {/* Left Sidebar */}
        <div className="fixed left-0 top-0 h-full w-16 bg-gray-800 flex flex-col items-center py-4 space-y-4">
          <div className="flex flex-col items-center space-y-4">
            <MessageCircle className="h-6 w-6 text-gray-300 hover:text-white cursor-pointer" />
            <Github className="h-6 w-6 text-gray-300 hover:text-white cursor-pointer" />
            <Globe className="h-6 w-6 text-gray-300 hover:text-white cursor-pointer" />
            <Zap className="h-6 w-6 text-gray-300 hover:text-white cursor-pointer" />
            <Plus className="h-6 w-6 text-gray-300 hover:text-white cursor-pointer" />
            <Star className="h-6 w-6 text-gray-300 hover:text-white cursor-pointer" />
            <Clock className="h-6 w-6 text-gray-300 hover:text-white cursor-pointer" />
            <Settings className="h-6 w-6 text-gray-300 hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* Main Content */}
        <div className="ml-16">
          {/* Header */}
          <header className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <Cloud className="h-8 w-8 text-white" />
                  <h1 className="text-2xl font-bold text-white">File Upload System</h1>
                </div>
                <nav className="flex items-center space-x-6">
                  <Link
                    to="/"
                    className="flex items-center space-x-2 text-white hover:text-blue-100 transition-colors"
                  >
                    <Home className="h-5 w-5" />
                    <span>Home</span>
                  </Link>
                  <Link
                    to="/upload"
                    className="flex items-center space-x-2 text-white hover:text-blue-100 transition-colors"
                  >
                    <Upload className="h-5 w-5" />
                    <span>Upload</span>
                  </Link>
                  <Link
                    to="/admin"
                    className="flex items-center space-x-2 text-white hover:text-blue-100 transition-colors"
                  >
                    <Lock className="h-5 w-5" />
                    <span>Admin Login</span>
                  </Link>
                </nav>
              </div>
            </div>
          </header>

          {/* Routes */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/upload" element={<FileUpload />} />
            <Route 
              path="/admin" 
              element={
                isAdminLoggedIn ? (
                  <AdminPage onLogout={handleAdminLogout} />
                ) : (
                  <AdminLogin onLogin={handleAdminLogin} />
                )
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// Home Page Component
function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 p-4 rounded-full">
              <Cloud className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to File Upload System</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your files securely with our modern web application. Support for various file types including documents, images, and presentations.
          </p>
        </div>

        {/* Feature Boxes */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Upload Files Box */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 border border-blue-200">
            <div className="flex items-center mb-4">
              <div className="bg-blue-500 p-3 rounded-lg mr-4">
                <Upload className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Upload Files</h3>
            </div>
            <p className="text-gray-600 mb-6">Submit your files with your contact information.</p>
            <Link
              to="/upload"
              className="inline-flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Upload className="h-5 w-5" />
              <span>Start Upload</span>
            </Link>
          </div>

          {/* Admin Panel Box */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 border border-purple-200">
            <div className="flex items-center mb-4">
              <div className="bg-purple-500 p-3 rounded-lg mr-4">
                <Settings className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Admin Panel</h3>
            </div>
            <p className="text-gray-600 mb-6">View and manage all uploaded files.</p>
            <Link
              to="/admin"
              className="inline-flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Settings className="h-5 w-5" />
              <span>Admin Dashboard</span>
            </Link>
          </div>
        </div>

        {/* Supported File Types */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Supported File Types</h3>
          <div className="flex justify-center space-x-8">
            <div className="flex flex-col items-center">
              <div className="bg-red-100 p-4 rounded-lg mb-2">
                <svg className="h-8 w-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 18h12V6l-4-4H4v16zm2-14h5v4h5v8H6V4z"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">PDF</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-lg mb-2">
                <svg className="h-8 w-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 18h12V6l-4-4H4v16zm2-14h5v4h5v8H6V4z"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">DOC/DOCX</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-orange-100 p-4 rounded-lg mb-2">
                <svg className="h-8 w-8 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 18h12V6l-4-4H4v16zm2-14h5v4h5v8H6V4z"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">PPT/PPTX</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-green-100 p-4 rounded-lg mb-2">
                <svg className="h-8 w-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">Images</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple Admin Login Component
function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (onLogin(username, password)) {
      // Login successful, component will re-render
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Lock className="h-8 w-8 text-purple-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h2>
          <p className="text-gray-600 mb-4">Enter your credentials to access the admin dashboard</p>
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            <span>🔧</span>
            <span>Model Design</span>
          </div>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors font-medium"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default App; 