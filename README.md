# Dashboard and Messaging App

This project is a role-based dashboard application with integrated messaging functionality, built with **React**, **React Router**, **React Query**, and **Context API**.

## ✨ Features

- **Authentication System** (Login, Register, Logout)
- **Role-based Access Control** (Admin and User)
- **Protected Routes** with dynamic permission checking
- **Real-time like Chat Interface** (mocked)
- **Toast Notifications** using Sonner
- **Reusable Layout Components** (Dashboard Layout)
- **Error Handling Pages** (404, Unauthorized)
- **Responsive UI** with tooltips and loaders

## 🛠️ Tech Stack

- **React** (Frontend Framework)
- **React Router DOM** (Routing)
- **React Query** (Server State Management)
- **Context API** (Auth and Chat Management)
- **Sonner** (Notification System)
- **TypeScript** (for type safety)
- **Mock Data** (users, chats, and messages)

## 🔥 Important Files

- `App.tsx`: Handles routes, providers, and global setups.
- `AuthContext.tsx`: Manages user authentication, registration, permission, and session storage.
- `ChatContext.tsx`: Manages chat conversations, messages, and active chat state.
- `ProtectedRoute.tsx`: Restricts access based on authentication and user roles.
- `DashboardLayout.tsx`: Reusable layout structure for dashboard pages.

## 🧠 How Authentication Works

- On login/register, the user data is stored in `localStorage`.
- Role-based checks (`admin`, `user`) are implemented through `hasPermission()` method.
- Toast notifications are shown for success/error actions.

## 🎯 How Messaging Works

- Chats and messages are **mocked** for demonstration.
- Users can send messages, including attachments (images/files).
- Unread counts and active chats are managed via `ChatContext`.

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone [https://github.com/jeff-antony/Chat-App-Dashboard.git]
   
