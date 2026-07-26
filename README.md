# Budget Tracker

A full-stack Budget Tracker web application that helps users manage their personal finances by tracking income, expenses, budgets, and financial reports. The application includes secure user authentication, email verification, interactive dashboards, and downloadable reports.

## Features

- User Registration and Login
- Email Verification
- Secure Password Validation
- JWT Authentication
- Income Management
- Expense Management
- Budget Management
- Dashboard with Charts
- Financial Reports
- PDF Report Export
- User Profile Management
- Responsive Design

## Technologies Used

### Frontend
- React.js
- Vite
- React Router
- Axios
- Chart.js
- jsPDF
- CSS

### Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Nodemailer
- bcrypt

### Database
- PostgreSQL (Neon)

## Project Structure

```
budget-tracker/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── middleware/
│   ├── prisma/
│   ├── utils/
│   └── package.json
│
└── README.md
```

## Installation

### Clone the Repository

```bash
git clone https://github.com/yourusername/budget-tracker.git
cd budget-tracker
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file and configure:

```env
DATABASE_URL=
JWT_SECRET=
EMAIL_USER=
EMAIL_PASS=
CLIENT_URL=http://localhost:5173
PORT=5000
```

Run Prisma:

```bash
npx prisma migrate dev
```

Start the backend:

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

## Deployment

- Frontend: Vercel
- Backend: Railway
- Database: Neon PostgreSQL

## Future Improvements

- Budget Alert Email Notifications
- Forgot Password
- Password Reset
- Two-Factor Authentication
- Recurring Transactions
- Excel Report Export
- Mobile Application

## Author

**Wesliy Obonyo**
