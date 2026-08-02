<div align="center">

# 🚀 Abdullah Ibne Ali — Developer Portfolio

A modern, high-performance **Full-Stack Developer Portfolio & Admin Dashboard** built with **Next.js 16 (App Router & Turbopack)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**, backed by a RESTful Express + MongoDB API.

[![Netlify Status](https://api.netlify.com/api/v1/badges/03ba9c09-4e7a-4f96-97d4-405807059b95/deploy-status)](https://app.netlify.com/projects/abdullah-ibne-ali/deploys)
[![Next.js 16](https://img.shields.io/badge/Next.js-16%20App%20Router-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/atlas)

</div>

---

## ✨ Features

- 💎 **Modern Glassmorphism UI**: High-end Navy Slate theme with vibrant neon radial glows, smooth Framer Motion entrance reveals, and dynamic hover micro-interactions.
- ⚡ **Next.js 16 + Turbopack**: Blazing-fast page loads, optimized font/image rendering, and server side rendering.
- 🛠️ **Built-in Admin Dashboard (`/admin`)**: Edit your Hero bio, Social links, Skills, Projects, and Testimonials live without redeploying code.
- 🖼️ **Client-Side Image Compression & Upload**: Automatic image optimization before uploading to ImgBB via backend proxy.
- 💼 **Interactive Project Showcase**: Filter projects by tech stack, view live modal galleries, and inspect GitHub/demo links.
- 🔍 **SEO & Accessibility**: Full Next.js Metadata API, JSON-LD `Person` Schema, `sitemap.ts`, `robots.txt`, and OpenGraph social cards.

---

## 🛠️ Tech Stack

### **Frontend App**
* **Framework:** Next.js 16 (App Router, Turbopack)
* **Language:** TypeScript
* **Styling:** Tailwind CSS v4, Glassmorphism Design System
* **Animations:** Framer Motion, GSAP
* **Icons:** React Icons (`react-icons`)
* **Deployment:** Netlify

### **Backend API**
* **Framework:** Express.js + TypeScript
* **Database:** MongoDB Atlas (Mongoose ODM)
* **Authentication:** Single-Admin JWT (Bearer Tokens)
* **Deployment:** Vercel Serverless

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/abdnimit1203/My-Web-Portfolio.git
cd My-Web-Portfolio
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=https://portfolio-api-nextjs-eight.vercel.app/api
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

---

## 🛡️ Admin Dashboard Access
To log into the live dashboard:
1. Navigate to `/admin/login`
2. Authenticate with admin credentials
3. Access real-time management modules at `/admin/dashboard`

---

<div align="center">
  <sub>Designed & Developed by <b>Abdullah Ibne Ali</b></sub>
</div>
