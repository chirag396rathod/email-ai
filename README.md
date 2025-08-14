# 📧 Email AI - Intelligent Email Automation Platform

> Transform your email workflow with AI-powered automation. Connect Google Sheets, generate intelligent content, and send bulk emails with just a few clicks.

## 🌟 Overview

Email AI is a comprehensive email automation tool that revolutionizes how you handle bulk email campaigns. By combining the power of AI content generation with Google Sheets integration, it eliminates the tedious process of manual email creation and sending.

**Perfect for:** Marketing teams, small businesses, content creators, and anyone who needs to send personalized emails at scale.

## ✨ Key Features

### 🔐 **Seamless Authentication**
- Google Sign-In integration for secure access
- OAuth-based authentication with proper session management

### 📊 **Google Sheets Integration**
- Direct connection to your Google Sheets
- Real-time data synchronization
- Flexible data handling for contact lists and templates

### 🧠 **AI-Powered Content Generation**
- Ultra-fast email content creation using Groq AI
- Intelligent personalization based on recipient data
- Context-aware email generation

### ✏️ **Smart Email Management**
- Real-time email preview before sending
- Edit and customize AI-generated content
- Template management system

### 🚀 **Bulk Operations**
- One-click bulk email sending
- Progress tracking for large campaigns
- Error handling and retry mechanisms

### 🎨 **Modern User Interface**
- Clean, intuitive design with shadcn/ui components
- Responsive layout for desktop and mobile
- Beautiful Lucide icons throughout the interface

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | Next.js 14, React, TypeScript |
| **Backend** | Next.js API Routes, Prisma ORM |
| **Database** | PostgreSQL / SQLite |
| **AI Integration** | Groq AI API |
| **Authentication** | NextAuth.js, Google OAuth |
| **UI Components** | shadcn/ui, Tailwind CSS, Lucide Icons |
| **External APIs** | Google Sheets API, Gmail API |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Cloud Console project (for OAuth and APIs)
- Groq AI API key

### Installation

```bash
# Clone the repository
git clone https://github.com/chirag396rathod/email-ai.git
cd email-ai

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your API keys and configuration

# Set up database
npx prisma generate
npx prisma db push

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 📋 Environment Setup

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="your_database_url"

# Google OAuth
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_nextauth_secret"

# Groq AI
GROQ_API_KEY="your_groq_api_key"
```

## 🎯 How It Works

1. **Connect**: Sign in with Google and connect your Google Sheets
2. **Import**: Select your sheet containing contact data
3. **Generate**: Let AI create personalized email content
4. **Preview**: Review and edit emails before sending
5. **Send**: Execute bulk email campaigns with progress tracking


## 📱 Screenshots & Demo
https://github.com/user-attachments/assets/cb7a74b4-5de9-4ac6-8117-c1a4d2a29a96

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Author

**Chirag Rathod**
- Portfolio: [imchiragrathod.netlify.app](https://imchiragrathod.netlify.app)
- LinkedIn: [linkedin.com/in/imchiragrathod](https://linkedin.com/in/imchiragrathod)
- Email: ahirchirag396@gmail.com

## 🎉 Acknowledgments

- Thanks to Groq AI for lightning-fast AI processing
- shadcn/ui for the beautiful component library
- Google for their robust APIs
- The open-source community for inspiration

---

<div align="center">

**⭐ If you found this project helpful, please give it a star!**

[🐛 Report Bug](https://github.com/chirag396rathod/email-ai/issues) • [💡 Request Feature](https://github.com/chirag396rathod/email-ai/issues)

</div>
