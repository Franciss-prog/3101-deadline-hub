3101 Deadline Hub

A simple deadline and announcement hub designed for students in BSIT-3101.

The goal of this project is to give the class a single place to view upcoming deadlines, announcements, and important information instead of relying entirely on group chats.

Features

Secretary

The secretary is responsible for managing class information.

Create deadlines

Edit deadlines

Delete deadlines

Assign deadlines to a subject

Add deadline descriptions

Create class announcements

Manage subjects

Classmates

Students can keep track of their class requirements.

View upcoming deadlines

View deadline details

Filter deadlines by subject

Mark deadlines as completed

Add comments to deadlines

View class announcements

Roles

The system has two basic roles:

Secretary

Can manage:

Subjects

Deadlines

Announcements

Student

Can:

View deadlines

View announcements

Comment on deadlines

Mark deadlines as completed

Students cannot modify the official deadline information.

Tech Stack

Frontend

React

TypeScript

Tailwind CSS

Backend

Go

REST API

Database

PostgreSQL

Neon

Basic Architecture

React │ │ HTTP / REST ▼ Go Backend │ │ SQL ▼ Neon DB

Database Structure

The initial version will use four main tables.

users

ColumnDescriptionidUser IDnameUser's nameemailUser's emailrolesecretary or student

subjects

ColumnDescriptionidSubject IDnameSubject name

deadlines

ColumnDescriptionidDeadline IDsubject_idRelated subjecttitleDeadline titledescriptionAdditional informationdue_dateDeadline date/timecreated_bySecretary who created itcreated_atCreation timestamp

comments

ColumnDescriptionidComment IDdeadline_idRelated deadlineuser_idUser who commentedcontentComment contentcreated_atCreation timestamp

API

The initial API will provide endpoints similar to:

Authentication POST /api/auth/register POST /api/auth/login Subjects GET /api/subjects POST /api/subjects PATCH /api/subjects/:id DELETE /api/subjects/:id Deadlines GET /api/deadlines POST /api/deadlines GET /api/deadlines/:id PATCH /api/deadlines/:id DELETE /api/deadlines/:id Comments GET /api/deadlines/:id/comments POST /api/deadlines/:id/comments Announcements GET /api/announcements POST /api/announcements PATCH /api/announcements/:id DELETE /api/announcements/:id

The API may change as development progresses.

Project Scope

The first version intentionally focuses on the core functionality:

Student │ ├── View deadlines ├── View announcements ├── Comment └── Mark completed Secretary │ ├── Manage subjects ├── Manage deadlines └── Manage announcements

Features such as push notifications, email reminders, calendar synchronization, file uploads, and advanced analytics are outside the initial MVP.

They may be considered for future versions.

Development Workflow

This project is being developed collaboratively.

Frontend

The frontend handles:

UI

User interactions

Forms

API integration

Client-side validation

Loading and error states

Backend

The backend handles:

REST API

Authentication

Authorization

Database operations

Server-side validation

Business logic

Both sides should agree on the API request and response format before integration.

Project Goal

The main goal of 3101 Deadline Hub is not to build a large production system.

It is a learning project for practicing:

React development

Go backend development

PostgreSQL

REST API design

Frontend/backend integration

Git and GitHub collaboration

Basic software architecture

Future Ideas

Possible features after the MVP:

Deadline reminders

Email notifications

Calendar view

Recurring deadlines

File attachments

Search

Notification history

Mobile-friendly improvements

Multiple classes/sections

Admin role

Deadline statistics

Status

Currently in development.

The project is being built as a collaborative learning project for BSIT-3101.
