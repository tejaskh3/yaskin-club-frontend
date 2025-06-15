# 🎉 yaskin.club Frontend

Beautiful landing page for yaskin.club - the AI-powered birthday celebration platform for teams.

## ✨ Features

- **Hero Section** - Compelling value proposition and problem/solution explanation
- **AI Demo** - Live demo of AI poster generation using Gemini API
- **Waitlist Signup** - Firebase-powered waitlist collection with feature preferences
- **Responsive Design** - Beautiful UI built with Tailwind CSS
- **Smooth Animations** - Engaging user experience with smooth scrolling and hover effects

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Firebase** for waitlist data storage
- **Lucide React** for beautiful icons

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Firebase project set up

### Installation

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd yaskin-club-frontend
npm install
```

2. **Set up environment variables:**
Create a `.env` file in the root directory:
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Backend URL (for AI poster generation)
VITE_BACKEND_URL=http://localhost:3001
```

3. **Start the development server:**
```bash
npm run dev
```

Visit `http://localhost:5173` to see the application.

## 🔥 Firebase Setup

1. **Create a Firebase project** at [Firebase Console](https://console.firebase.google.com)

2. **Enable Firestore Database:**
   - Go to Firestore Database
   - Create database in test mode (for development)
   - Choose a location close to your users

3. **Get your Firebase config:**
   - Go to Project Settings > General
   - In "Your apps" section, click on Web app
   - Copy the config object values to your `.env` file

4. **Database Structure:**
The app will automatically create a `waitlist` collection with documents containing:
```javascript
{
  email: "user@company.com",
  name: "John Doe",
  organization: "Company Name",
  interestedFeatures: ["AI-generated posters", "Email notifications"],
  createdAt: Date
}
```

## 🎨 Customization

### Colors and Branding
The design uses a purple-to-pink gradient theme. You can customize colors in:
- `tailwind.config.js` - For global color scheme
- Component files - For specific color overrides

### Content
Update the content in these files:
- `src/components/Hero.tsx` - Main headline and value proposition
- `src/components/AIDemo.tsx` - Demo section content
- `src/components/Waitlist.tsx` - Feature list and form fields
- `src/components/Footer.tsx` - Footer links and contact info

## 📱 Components

- **Hero** - Main landing section with value proposition
- **AIDemo** - Interactive AI poster generation demo
- **Waitlist** - Signup form with Firebase integration
- **Footer** - Contact links and feature highlights

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**

2. **Connect to Vercel:**
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect it's a Vite project

3. **Add environment variables:**
   - In Vercel dashboard, go to Settings > Environment Variables
   - Add all your `VITE_` prefixed variables

4. **Deploy:**
   - Vercel will automatically deploy on every push to main branch
   - Your site will be live at `https://your-project.vercel.app`

### Deploy to Netlify

1. **Build the project:**
```bash
npm run build
```

2. **Deploy the `dist` folder** to Netlify

3. **Set environment variables** in Netlify dashboard

## 🔗 Integration

This frontend works with the yaskin.club backend for:
- AI poster generation via `/api/generate-poster` endpoint
- Make sure backend is deployed and `VITE_BACKEND_URL` is set correctly

## 📧 Features to Implement

Future enhancements:
- [ ] Email validation and duplicate prevention
- [ ] Analytics tracking (Google Analytics/Mixpanel)
- [ ] A/B testing for conversion optimization
- [ ] Social sharing functionality
- [ ] Blog/content section
- [ ] Testimonials section

## 🐛 Troubleshooting

**Firebase connection issues:**
- Verify all environment variables are set correctly
- Check Firebase console for proper Firestore setup
- Ensure Firestore rules allow reads/writes

**Backend connection issues:**
- Verify backend is running on correct port
- Check CORS configuration in backend
- Verify `VITE_BACKEND_URL` environment variable

## 📄 License

MIT License - feel free to use this code for your own projects!
