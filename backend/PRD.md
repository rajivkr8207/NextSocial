# 📌 PRD — Backend System (NextGram)

## 1. Overview

This document defines the **Product Requirements** for the backend of a Full-Stack Instagram-style application named **NextGram**.  
The backend will provide secure authentication, user management, profile handling, and post CRUD functionality with scalability and production-grade practices.

---

## 2. Tech Stack

- Runtime: Node.js  
- Framework: Express.js  
- Database: MongoDB (Mongoose ORM)  
- Authentication: JWT (Access + Refresh Tokens)  
- File Upload: Multer + Imagekit  
- Password Hashing: bcrypt  
- Validation: express-validator  
- Logging: Winston / Morgan  

---

## 3. Goals

- Secure user authentication system  
- CRUD operations for posts  
- Profile management with image upload  
- Scalable API architecture  
- Clean separation of concerns  

---

## 4. Non-Goals

- Real-time chat  
- Notifications system  
- Story feature  


---

## 6. High-Level Architecture

Client (Next.js)  
→ API Gateway (Express)  
→ Controllers  
→ Services  
→ MongoDB  

---

## 7. Authentication Module

### 7.1 Register User

**Endpoint**  
POST /api/auth/register  

**Request Body (multipart/form-data)**
```js
fullname: string
username: string
email: string
password: string
bio: string
profileImage: file
```

**Validations**

- Email must be unique  
- Username must be unique  
- Password min 6 characters  

**Response (201)**
```js
{
success: true,
message: "User registered successfully"
}
```

---

### 7.2 Login User

**Endpoint**  
POST /api/auth/login  

**Request Body**
```js
{
username: string,
password: string
}
```

**Response (200)**
```js
{
success: true,
message: "User login successfully"
}
```
---

### 7.3 Profile User

**Endpoint**  
GET /api/auth/profile  


**Response (200)**
```js
{
success: true,
message: "profile fetch successfully"
}
```