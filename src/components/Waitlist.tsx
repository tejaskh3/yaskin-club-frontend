import React, { useState, useEffect } from 'react';
import { Mail, Building, User, CheckCircle, Users } from 'lucide-react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

interface WaitlistEntry {
  email: string;
  name: string;
  organization: string;
  interestedFeatures: string[];
  createdAt: Date;
}

const Waitlist: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    organization: '',
  });
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState(150); // Start with initial count
  const [error, setError] = useState<string | null>(null);

  const features = [
    'AI-generated birthday posters',
    'Automated birthday reminders',
    'Team message collection',
    'Photo sharing for celebrations',
    'Email notifications',
    'Calendar integration',
    'Custom celebration themes',
    'Analytics and insights'
  ];

  useEffect(() => {
    // Fetch current waitlist count
    const fetchWaitlistCount = async () => {
      try {
        const waitlistRef = collection(db, 'waitlist');
        const snapshot = await getDocs(waitlistRef);
        setWaitlistCount(Math.max(150, snapshot.size)); // Minimum 150 for social proof
      } catch (error) {
        console.error('Error fetching waitlist count:', error);
      }
    };

    fetchWaitlistCount();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev =>
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.name) {
      setError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const waitlistEntry: WaitlistEntry = {
        email: formData.email.toLowerCase().trim(),
        name: formData.name.trim(),
        organization: formData.organization.trim(),
        interestedFeatures: selectedFeatures,
        createdAt: new Date(),
      };

      await addDoc(collection(db, 'waitlist'), waitlistEntry);
      
      setIsSubmitted(true);
      setWaitlistCount(prev => prev + 1);
      
      // Reset form
      setFormData({ email: '', name: '', organization: '' });
      setSelectedFeatures([]);
    } catch (error) {
      console.error('Error adding to waitlist:', error);
      setError('Failed to join waitlist. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="waitlist" className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              🎉 You're In!
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Welcome to the yaskin.club waitlist! We'll notify you as soon as we launch.
            </p>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-6 h-6 text-purple-600" />
                <span className="text-3xl font-bold text-purple-600">{waitlistCount}+</span>
              </div>
              <p className="text-gray-600">Organizations now waiting</p>
            </div>
            <div className="mt-8">
              <p className="text-gray-600 mb-4">
                Help us spread the word and make workplace birthdays amazing!
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors"
                >
                  Invite Another Team
                </button>
                <a
                  href="https://forms.google.com/your-feedback-form-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-600 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition-colors"
                >
                  Give Feedback
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="waitlist" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Join the Waitlist
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Be among the first to transform how your team celebrates birthdays. 
            Get early access and special pricing!
          </p>
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-lg">
            <Users className="w-5 h-5 text-purple-600" />
            <span className="font-semibold text-purple-600">{waitlistCount}+ teams waiting</span>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Work Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="john@company.com"
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organization Name
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Your Company Name"
                />
              </div>
            </div>

            {/* Feature Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Which features interest you most? (Optional)
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {features.map((feature) => (
                  <button
                    key={feature}
                    type="button"
                    onClick={() => toggleFeature(feature)}
                    className={`text-left p-3 rounded-lg border transition-colors ${
                      selectedFeatures.includes(feature)
                        ? 'bg-purple-50 border-purple-300 text-purple-700'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                        selectedFeatures.includes(feature)
                          ? 'bg-purple-600 border-purple-600'
                          : 'border-gray-300'
                      }`}>
                        {selectedFeatures.includes(feature) && (
                          <CheckCircle className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {isSubmitting ? 'Joining Waitlist...' : 'Join the Waitlist 🚀'}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              We'll never spam you. Unsubscribe at any time.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Waitlist; 