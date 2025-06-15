import React from 'react';
import { PartyPopper, Users, Heart } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-32 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
      </div>
      
      <div className="relative container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center gap-2 mb-6">
            <PartyPopper className="w-8 h-8 text-yellow-300" />
            <span className="text-lg font-medium bg-white/20 px-4 py-2 rounded-full">
              yaskin.club
            </span>
            <PartyPopper className="w-8 h-8 text-yellow-300" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Celebrate Team
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
              Birthdays Together
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Never miss another birthday! Create beautiful AI-powered celebrations 
            that bring your team closer together.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-red-300 mb-2">😔 The Problem</div>
              <p className="text-white/80">
                Birthdays get forgotten in busy workplaces. Team members feel overlooked 
                and celebrations are inconsistent or non-existent.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-green-300 mb-2">🎉 The Solution</div>
              <p className="text-white/80">
                yaskin.club organizes beautiful birthday celebrations with AI-generated 
                posters, team messages, and automated reminders.
              </p>
            </div>
          </div>
          
          <div className="flex justify-center items-center gap-8 mb-12">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-6 h-6 text-yellow-300" />
                <span className="text-3xl font-bold">17+</span>
              </div>
              <p className="text-white/80">Teams Waiting</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Heart className="w-6 h-6 text-pink-300" />
                <span className="text-3xl font-bold">100%</span>
              </div>
              <p className="text-white/80">More Engaged</p>
            </div>
          </div>
          

          <div className="space-y-4">
            <button 
              onClick={() => document.getElementById('ai-demo')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Try AI Demo Now 🚀
            </button>
            <p className="text-white/70 text-sm">
              ⬇️ See how it works in 30 seconds
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 