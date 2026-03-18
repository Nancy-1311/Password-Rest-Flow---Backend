#  Password Reset Flow (MERN Stack)

## Project Description

This project implements a **secure password reset flow** using the MERN stack (MongoDB, Express, React, Node.js).

Users can request a password reset link via email, verify the token, and securely update their password within a limited time.

---

##  Live Demo

*  Frontend:https://password-rest-flow-frontend.vercel.app/
*  Backend API: https://password-rest-flow-backend-1.onrender.com/

---

## Features

* 🔐 Forgot Password functionality
* 📩 Email-based password reset link
* ⏳ Token expiry (10 minutes)
* 🔑 Secure password hashing using bcrypt
* ❌ Invalid/expired token handling
* 🎨 Responsive UI with Bootstrap
* ⚡ RESTful API with MVC architecture

---

##  Tech Stack

### Frontend:

* React.js
* Axios
* React Router DOM
* Bootstrap

### Backend:

* Node.js
* Express.js
* MongoDB (Mongoose)
* Nodemailer
* Bcrypt
* Dotenv

---

##  Project Structure

```
backend/
├── config/
│   └── db.js
├── controllers/
│   └── authController.js
├── models/
│   └── User.js
├── routes/
│   └── authRoutes.js
├── app.js

frontend/
├── src/
│   ├── pages/
│   │   ├── ForgotPassword.jsx
│   │   └── ResetPassword.jsx
│   ├── App.js
```

---

## 🔗 API Endpoints

### 1. Forgot Password

```
POST /api/auth/forgot-password
```

**Request Body:**

```json
{
  "email": "user@example.com"
}
```

---

### 2. Verify Token

```
GET /api/auth/verify/:token
```

---

### 3. Reset Password

```
POST /api/auth/reset-password/:token
```

**Request Body:**

```json
{
  "password": "newpassword123"
}
```

---

## Environment Variables

### Backend (.env)

```
MONGO_URI= mongodb+srv://nancy_1113:nandatabase1113@cluster0.agjay7x.mongodb.net/
EMAIL= nancy6398255@gmail.com
PASSWORD= nan6398255135955
CLIENT_URL= https://password-rest-flow-frontend.vercel.app/
```

---

### Frontend (.env)

```
REACT_APP_API= https://password-rest-flow-backend-1.onrender.com/
```

---

##  Installation & Setup

### 1. Clone Repository

---

### 2. Backend Setup

```
cd backend
npm install
npm run dev
```

---

### 3. Frontend Setup

```
cd frontend
npm install
npm start
```

---

##  Email Configuration

* Uses **Nodemailer with Gmail SMTP**
* Requires **Gmail App Password** (not your actual password)

---

##  Deployment

### Backend:

* Hosted on Render

### Frontend:

* Hosted on Versal

### Database:

* MongoDB Atlas

---

##  Important Notes

* Do not expose `.env` file publicly
* Token expires after 10 minutes
* Password is securely hashed before storing
* Reset token is cleared after successful password update

---

##  Future Enhancements

* Add JWT authentication
* Add login & signup system
* Add password strength validation
* Add toast notifications instead of alerts

---

##  Author

* Nancy

---

##  License

This project is for educational purposes (GUVI assignment).
