import React from 'react';
import { PartyPopper, Mail, MessageSquare, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex justify-center items-center gap-2 mb-6">
            <PartyPopper className="w-8 h-8 text-yellow-400" />
            <span className="text-2xl font-bold">yaskin.club</span>
            <PartyPopper className="w-8 h-8 text-yellow-400" />
          </div>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Making workplace birthdays memorable, one celebration at a time.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12">
            <a
              href="https://docs.google.com/forms/d/1XNUybRYGHAnkxgUuAw8CwK7CQkNvIUni9_dzZvwrNBw/edit"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-full transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              Share Your Feedback
              <ExternalLink className="w-4 h-4" />
            </a>
            
            <a
              href="mailto:hello@yaskin.club"
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-full transition-colors"
            >
              <Mail className="w-5 h-5" />
              Contact Us
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-gray-800 rounded-2xl p-6">
                <div className="text-4xl mb-3">🤖</div>
                <h3 className="font-semibold mb-2">AI-Powered</h3>
                <p className="text-gray-400 text-sm">
                  Beautiful posters generated automatically for every celebration
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-800 rounded-2xl p-6">
                <div className="text-4xl mb-3">👥</div>
                <h3 className="font-semibold mb-2">Team-Focused</h3>
                <p className="text-gray-400 text-sm">
                  Bring your team together with shared birthday celebrations
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-800 rounded-2xl p-6">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="font-semibold mb-2">Automated</h3>
                <p className="text-gray-400 text-sm">
                  Never miss a birthday with smart reminders and notifications
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 mb-12">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Transform Your Team Celebrations?
            </h3>
            <p className="text-purple-100 mb-6">
              Join hundreds of organizations already waiting for yaskin.club
            </p>
            <button
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Join the Waitlist Now
            </button>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © 2024 yaskin.club. Made with ❤️ for amazing teams.
              </p>
              
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <span>🚀 Coming Soon</span>
                <span>•</span>
                <span>Early Access Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 