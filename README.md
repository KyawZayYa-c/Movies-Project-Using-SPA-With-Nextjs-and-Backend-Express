# 🎬 Movie Management System (Full-stack SPA)

A modern, high-performance Movie Management System built with **Next.js 14** (Frontend) and **Express.js** (Backend). This project demonstrates a robust Single Page Application (SPA) architecture using **Redux Toolkit Query (RTK Query)** for efficient state management, caching, and optimistic UI updates.

---

## 📸 Screenshots

![Movie List View](https://github.com/user-attachments/assets/4a8b679d-e85b-4ea5-b494-802a8cb1bfd5)
*The main dashboard showing the movie list and review summaries.*

![Movie Details and Reviews](https://github.com/user-attachments/assets/6fceecc1-554a-4231-bd70-27f98557394c)
*Detailed view of a movie with the interactive rating and review system.*

![Edit/Add Movie Dialog](https://github.com/user-attachments/assets/35add995-74bc-44ae-98b5-e1032e76640f)
*Management interface for adding or updating movie information.*

---

## ✨ Features

* **🎭 Movie Management:** Full CRUD operations (Create, Read, Update, Delete) for movies.
* **⭐ Interactive Review System:** Users can rate and leave reviews for individual movies.
* **🗑️ Cascade Delete Logic:** Deleting a movie automatically removes all associated reviews via Backend Mongoose middleware to ensure data integrity.
* **⚡ Optimistic Updates:** UI reacts instantly to user actions (Update/Delete) while syncing with the server in the background for a seamless experience.
* **🔐 Secure Authentication:** JWT-based login system for protected routes.
* **🎨 Modern UI/UX:** Built with **Material UI (MUI)** for a clean, responsive, and professional look.
* **📝 Form Validation:** Client-side validation using **React Hook Form** integrated with **Zod.**

---

## 🛠️ Tech Stack

### Frontend
* **Framework:** Next.js 14 (App Router)
* **State Management:** Redux Toolkit & RTK Query
* **UI Library:** Material UI (MUI)
* **Form Handling:** React Hook Form & Zod
* **Styling:** CSS Modules

### Backend
* **Environment:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (via Mongoose)
* **Authentication:** JSON Web Token (JWT)

---

## 🚀 Getting Started

Follow these steps to set up the project locally:

```bash
# 1. Clone the Repository
git clone [https://github.com/KyawZayYa-c/Movies-Project-Using-SPA-With-Nextjs-and-Backend-Express.git](https://github.com/KyawZayYa-c/Movies-Project-Using-SPA-With-Nextjs-and-Backend-Express.git)
cd Movies-Project-Using-SPA-With-Nextjs-and-Backend-Express

# 2. Setup Backend
cd backend
npm install
# Note: Create a .env file with PORT=4000, DATABASE_URL, and JWT_SECRET
npm start

# 3. Setup Frontend (In a new terminal)
cd ../frontend
npm install
echo 'NEXT_PUBLIC_BASE_URL="http://localhost:4000/api"' > .env.local
npm run dev