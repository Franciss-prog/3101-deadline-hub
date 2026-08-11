# 3101 Deadline Hub

A simple deadline and announcement hub for students in **BSIT-3101**.

The goal of this project is to give the class a single place to view upcoming deadlines, announcements, and important information — instead of relying entirely on group chats.

---

## Features

### For the Secretary

The secretary manages class information:

- Create, edit, and delete deadlines
- Assign deadlines to a subject
- Add deadline descriptions
- Create class announcements
- Manage subjects

### For Classmates

Students can keep track of their class requirements:

- View upcoming deadlines
- View deadline details
- Filter deadlines by subject
- Mark deadlines as completed
- Add comments to deadlines
- View class announcements

---

## Roles

| Role          | Permissions                                                                         |
| ------------- | ----------------------------------------------------------------------------------- |
| **Secretary** | Manage subjects, deadlines, and announcements                                       |
| **Student**   | View deadlines and announcements, comment on deadlines, mark deadlines as completed |

> Students cannot modify official deadline information.

---

## Tech Stack

| Layer        | Technologies                    |
| ------------ | ------------------------------- |
| **Frontend** | React, TypeScript, Tailwind CSS |
| **Backend**  | Go, REST API                    |
| **Database** | PostgreSQL (Neon)               |

### Basic Architecture

```
React (Frontend)
      │
      │  HTTP / REST
      ▼
Go Backend
      │
      │  SQL
      ▼
Neon DB (PostgreSQL)
```

---

## Database Structure

The initial version uses four main tables.

**users**

| Column | Description              |
| ------ | ------------------------ |
| id     | User ID                  |
| name   | User's name              |
| email  | User's email             |
| role   | `secretary` or `student` |

**subjects**

| Column | Description  |
| ------ | ------------ |
| id     | Subject ID   |
| name   | Subject name |

**deadlines**

| Column      | Description              |
| ----------- | ------------------------ |
| id          | Deadline ID              |
| subject_id  | Related subject          |
| title       | Deadline title           |
| description | Additional information   |
| due_date    | Deadline date/time       |
| created_by  | Secretary who created it |
| created_at  | Creation timestamp       |

**comments**

| Column      | Description        |
| ----------- | ------------------ |
| id          | Comment ID         |
| deadline_id | Related deadline   |
| user_id     | User who commented |
| content     | Comment content    |
| created_at  | Creation timestamp |

---

## API Endpoints

Initial endpoints are planned as follows (subject to change as development progresses):

**Authentication**

```
POST   /api/auth/register
POST   /api/auth/login
```

**Subjects**

```
GET    /api/subjects
POST   /api/subjects
PATCH  /api/subjects/:id
DELETE /api/subjects/:id
```

**Deadlines**

```
GET    /api/deadlines
POST   /api/deadlines
GET    /api/deadlines/:id
PATCH  /api/deadlines/:id
DELETE /api/deadlines/:id
```

**Comments**

```
GET    /api/deadlines/:id/comments
POST   /api/deadlines/:id/comments
```

**Announcements**

```
GET    /api/announcements
POST   /api/announcements
PATCH  /api/announcements/:id
DELETE /api/announcements/:id
```

---

## Project Scope

The first version (MVP) focuses on core functionality only:

**Student**

- View deadlines
- View announcements
- Comment
- Mark completed

**Secretary**

- Manage subjects
- Manage deadlines
- Manage announcements

Push notifications, email reminders, calendar sync, file uploads, and advanced analytics are **outside the MVP** and may be considered for future versions.

---

## Development Workflow

This project is developed collaboratively, split by responsibility:

**Frontend handles:**

- UI and user interactions
- Forms
- API integration
- Client-side validation
- Loading and error states

**Backend handles:**

- REST API
- Authentication & authorization
- Database operations
- Server-side validation
- Business logic

> Both sides should agree on the API request/response format before integration.

---

## Project Goal

The main goal of 3101 Deadline Hub is **not** to build a large production system — it's a learning project for practicing:

- React development
- Go backend development
- PostgreSQL
- REST API design
- Frontend/backend integration
- Git and GitHub collaboration
- Basic software architecture

---

## Future Ideas

Possible features after the MVP:

- Deadline reminders
- Email notifications
- Calendar view
- Recurring deadlines
- File attachments
- Search
- Notification history
- Mobile-friendly improvements
- Multiple classes/sections
- Admin role
- Deadline statistics

---

## Status

🚧 **Currently in development.**
Built as a collaborative learning project for BSIT-3101.
