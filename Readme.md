
# Medico - Hospital Management System

## Project Overview

Medico is a comprehensive hospital management system designed to streamline administrative processes while providing secure access to medical data. The system includes role-based access control for hospital staff (admins) and patients, allowing for efficient management of patient information, prescriptions, and reports. The project also integrates RFID-based UID verification for secure identification.

## Features

- **Role-based Access Control**: Admins can manage patients, prescriptions, and reports, while patients have view-only access to their data.
- **Patient Management**: Admins can add, update, and delete patient details.
- **Prescription Management**: Admins can manage patient prescriptions. Patients can view their prescribed medications.
- **Reports Management**: Admins can upload medical reports (PDF, images) for patients. Patients can view their own reports.
- **Secure Login System**: Role selection and secure login based on RFID-based UID verification.
- **RFID-based UID Verification**: UID verification ensures secure and personalized access for both admin and patient roles.
- **Responsive Frontend**: User-friendly and visually appealing interface with a dynamic dashboard for easy navigation.

## Tech Stack

- **Frontend**: React.js, HTML, CSS, JavaScript
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **HTTP Requests**: Axios
- **RFID Integration**: Arduino-based UID reading using RFID
- **State Management**: React State and Context API for managing user session and data flow

## Backend Routes

| **HTTP Method** | **Endpoint**                     | **Description**                                               | **Role**   |
|-----------------|----------------------------------|---------------------------------------------------------------|------------|
| POST            | `/api/auth/login`                | Authenticate user (admin or patient) via UID                   | Admin/User |
| POST            | `/api/auth/register`             | Register new user (admin or patient)                           | Admin/User |
| GET             | `/api/auth/logout`               | Log out the current user                                       | Admin/User |
| GET             | `/api/health/status`             | Check server health and status                                 | Public     |
| GET             | `/api/patients`                  | Fetch all patient details                                      | Admin      |
| POST            | `/api/patients`                  | Add a new patient                                              | Admin      |
| PUT             | `/api/patients/:uid`             | Update patient details by UID                                  | Admin      |
| DELETE          | `/api/patients/:uid`             | Delete a patient by UID                                        | Admin      |
| GET             | `/api/prescriptions/:uid`        | Get all prescriptions for a patient                            | Admin/User |
| POST            | `/api/prescriptions`             | Add a new prescription                                         | Admin      |
| PUT             | `/api/prescriptions/:id`         | Update an existing prescription by ID                          | Admin      |
| DELETE          | `/api/prescriptions/:id`         | Delete a prescription by ID                                    | Admin      |
| GET             | `/api/reports/:uid`              | Get all reports for a patient                                  | Admin/User |
| GET             | `/api/reports/:filePath`         | Retrieve a specific report file by path                        | Admin/User |
| POST            | `/api/reports`                   | Upload a new report for a patient                              | Admin      |
| DELETE          | `/api/reports/:filePath`         | Delete a report by file path                                   | Admin      |

## Frontend Pages

| **Page**                | **Description**                                                            | **Role**   |
|-------------------------|----------------------------------------------------------------------------|------------|
| `LoginPage.js`           | Login form for admins and patients with UID verification                   | Admin/User |
| `RegisterPage.js`        | Register new users (admins and patients)                                   | Admin/User |
| `DashboardPage.js`       | Admin dashboard for managing patients, prescriptions, and reports          | Admin      |
| `AddPatientsPage.js`     | Form to add new patient information                                        | Admin      |
| `EditPatientPage.js`     | Form to update existing patient details                                    | Admin      |
| `PatientDetailsPage.js`  | View patient details                                                       | Admin      |
| `PrescriptionsPage.js`   | View and manage patient prescriptions (for admins)                         | Admin      |
| `AddPrescriptionPage.js` | Form to add new prescriptions for a patient                                | Admin      |
| `EditPrescriptionPage.js`| Form to update an existing prescription                                    | Admin      |
| `ReportsPage.js`         | View and manage patient reports (for admins)                               | Admin      |
| `AddReportPage.js`       | Upload new reports for patients                                            | Admin      |
| `UserPrescriptionsPage.js`| Patients can view their prescribed medications                            | User       |
| `UserReportsPage.js`     | Patients can view their uploaded medical reports (PDF, images)             | User       |
| `VerifyUIDPage.js`       | UID verification page for patients to access their medical records         | User       |
| `UserDashboard.js`       | Patient dashboard for viewing prescriptions and reports                    | User       |
| `NotFoundPage.js`        | 404 error page for routes that don’t exist                                 | Public     |

## Environment Variables

To run this project, create a `.env` file in the root directory with the following values:

```
MONGODB_URI=<your-mongodb-uri>
PORT=5000
JWT_SECRET=<your-secret-key>
```

## Installation & Setup

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running locally or on a cloud service (e.g., MongoDB Atlas)
- Arduino setup with RFID integration for UID reading

### Steps

1. **Clone the repository**  
   ```bash
   git clone https://github.com/ucs200525/medico.git
   ```

2. **Navigate into the project directory**  
   ```bash
   cd medico
   ```

3. **Install server dependencies**  
   ```bash
   npm install
   ```

4. **Install client dependencies**  
   ```bash
   cd client
   npm install
   ```

5. **Set up environment variables**  
   Create a `.env` file in the root directory and add the required values (as shown above).

6. **Run the project**  
   To start both backend and frontend:
   ```bash
   npm run server   # Starts the backend server
   npm start        # Starts the frontend React application
   ```

7. **Access the application**  
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## Usage

### Admin Role

1. Login as an admin using your credentials.
2. Verify your UID using the RFID card.
3. Use the dashboard to manage patients, prescriptions, and reports.

### Patient Role

1. Enter your UID to view your details.
2. Navigate through the different sections to view your prescriptions and reports.

## Project Structure

```bash
medico/
├── client/               # Frontend React application
│   ├── src/              # Source files for React
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Individual pages (Login, Dashboard, etc.)
│   │   ├── App.js        # Main app component
│   ├── public/           # Public assets (HTML, favicon, etc.)
│   ├── package.json      # Client-side dependencies
├── server/               # Backend Express.js server
│   ├── controllers/      # Route handlers (patients, prescriptions, reports)
│   ├── models/           # Mongoose models (User, Patient, Prescription, Report)
│   ├── routes/           # API routes
│   ├── utils/            # Utility functions (authentication, JWT, etc.)
│   ├── server.js         # Entry point for backend
│   ├── config/           # Configuration files (database, environment)
├── .env                  # Environment variables
├── README.md             # Documentation
├── package.json          # Backend dependencies
└── .gitignore            # Files and directories to be ignored by Git
```

