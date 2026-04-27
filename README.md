# TaskPro — Modern Project Management Workspace

TaskPro is a high-performance, dark-themed project management application designed for modern teams. It provides a unified workspace for planning, tracking, and shipping projects with a focus on speed, aesthetics, and user experience.

---

## 🚀 Features

- **Dynamic Kanban Board**: Real-time task management with smooth drag-and-drop transitions.
- **Analytics Dashboard**: Visual data representation for project velocity, team performance, and task status.
- **Project Tracking**: Manage multiple projects simultaneously with specific tags and deadlines.
- **Team Collaboration**: Integrated team member roles and workload tracking.
- **Secure Authentication**: Built-in JWT authentication with real-time signup and login validation.
- **Responsive Design**: A premium "Glassmorphism" UI that works across all devices.

## 🛠 Tech Stack

### Frontend
- **HTML5 & CSS3**: Custom design system using CSS variables and modern layout techniques.
- **Vanilla JavaScript**: High-performance interactions without framework overhead.
- **Chart.js**: Powering the analytics and visual data representations.

### Backend
- **Node.js & Express**: Scalable RESTful API architecture.
- **MongoDB & Mongoose**: Flexible NoSQL data modeling for rapid development.
- **JWT & bcryptjs**: Industry-standard security for identity management.
- **CORS & Dotenv**: Environment-specific configurations and secure cross-origin resource sharing.

## 📦 Setting Up TaskPro

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (Local instance or Atlas)
- Python3 (for static frontend serving)

### 1. Backend Setup
```bash
cd backend
npm install
# Create a .env file with PORT=5001 and your MONGO_URI
npm start
```

### 2. Frontend Setup
```bash
# From the project root
python3 -m http.server 8080
```
Visit `http://localhost:8080` in your browser to get started.

## 🏗 Architecture Overview

TaskPro follows a decoupled client-server architecture:
- **Client**: Static assets served via a light HTTP server, communicating with the backend via REST.
- **Server**: Stateless Node.js API that manages business logic, authentication, and database interactions.
- **Database**: Persistent storage for projects, tasks, activities, and team members.

## 🚀 Future Advancements & Roadmap

To take TaskPro to the next level, the following technical and feature-based advancements are planned:

### 1. ⚡️ Technical Optimizations
- **Real-Time Collaboration**: Integrate **Socket.io** or **WebSockets** to allow multiple users to see task updates and drag-and-drop actions in real-time without refreshing.
- **Progressive Web App (PWA)**: Implement service workers and a manifest file to make TaskPro installable on mobile and desktop, providing a native app experience.
- **Offline Sync**: Use **IndexedDB** to allow users to continue working without an internet connection, with automatic synchronization when they come back online.

### 2. 🧠 AI-Driven Intelligence
- **Predictive Velocity**: Analyze historical data to forecast project completion risks and identify potential bottlenecks.
- **Smart Resource Allocation**: Automatically recommend task assignments based on team member skills and current workload.
- **Natural Language Querying**: A "Smart Assistant" that allows users to ask questions like "What are the high-priority tasks for this week?" in plain English.

### 3. 🛠 Enhanced Feature Set
- **Time Tracking**: Built-in stopwatch and manual logging for each task to generate automated timesheets.
- **Third-Party Integrations**: Connect with tools like **GitHub**, **Slack**, and **Google Calendar** for a unified workflow.
- **Advanced File Management**: Cloud storage integration (AWS S3) for attaching large files and documents directly to tasks.
- **Custom Themes**: Allow users to create and share their own dashboard themes and color palettes.

---
*Built with ❤️ for modern engineering teams.*
