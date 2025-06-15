import React from 'react';
import { Toaster } from 'react-hot-toast';
import Hero from './components/Hero';
import AIDemo from './components/AIDemo';
import Waitlist from './components/Waitlist';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Hero Section */}
      <Hero />
      
      {/* AI Demo Section */}
      <AIDemo />
      
      {/* Waitlist Section */}
      <Waitlist />
      
      {/* Footer */}
      <Footer />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            style: {
              background: '#10B981',
            },
          },
          error: {
            duration: 4000,
            style: {
              background: '#EF4444',
            },
          },
        }}
      />
    </div>
  );
}

export default App;
