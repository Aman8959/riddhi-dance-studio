# Riddhi Dance Studio

A premium dance studio website built for class discovery, trial bookings, inquiries, and brand storytelling.

## Overview

Riddhi Dance Studio is a modern dance academy website designed to help students and parents explore classes, view trainer profiles, check the timetable, and book trial sessions with ease. The website is built to feel energetic, premium, and trustworthy while remaining fast and mobile-friendly.

## Key Features

- Premium landing page with strong call-to-action sections
- Class listings for kids, teens, and adults
- Trainer profiles and studio credentials
- Timetable and batch information
- Gallery and media showcase
- Testimonials and social proof
- Trial booking and registration flow
- Contact and WhatsApp inquiry support
- Responsive layout for desktop, tablet, and mobile

## Tech Stack

- React
- TypeScript
- Vite
- TanStack Router
- Tailwind CSS
- Radix UI

## Project Structure

```text
src/
  components/
  config/
  data/
  hooks/
  lib/
  routes/
public/
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the app locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Available Scripts

```bash
npm run dev        # local development server
npm run build      # production build
  npm run preview    # preview the Nitro production server
npm run lint       # lint the project
npm run format     # format code with Prettier
```

## Brand Goal

The website is designed to position Riddhi Dance Studio as a professional, joyful, and results-driven dance academy that helps students build confidence, technique, and performance skills.

## Notes

This project is structured for future maintenance and easy content updates, making it suitable for real studio operations and marketing growth.

Admin should be able to manage:

Students

Add student

Edit student

Delete student

View student details

Search students

Classes

Add class

Edit class

Delete class

Manage pricing

Batches

Create batches

Update timings

Assign trainers

Manage capacity

Registrations

View registrations

Approve/reject registration

Update status

Trial Bookings

View bookings

Confirm booking

Cancel booking

Trainers

Add/edit/delete trainer profiles

Gallery

Upload images

Delete images

Categorize images

Events

Create events

Edit events

Delete events

Manage registrations

Testimonials

### Managed website content setup

The admin dashboard now manages classes, membership plans, events, and timetable batches through simple forms. Classes and events can include an image upload, and class fees are saved in the same form. Deploy the updated `backend/google-apps-script/Code.gs` as a new web-app version and keep the same `SHEET_ID`, `MEDIA_FOLDER_ID`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` script properties. On the first admin login, the existing studio content is copied into `Content_classes`, `Content_plans`, `Content_events`, and `Content_batches` sheets. Subsequent edits and deletes are persisted there and are reflected on the public pages and registration form.

Add testimonials

Approve testimonials

Delete testimonials

20. Dashboard Analytics

Add a dashboard showing:

Total Students

New Registrations

Trial Bookings

Active Classes

Upcoming Events

Monthly Revenue

Most Popular Dance Style

Most Popular Batch

Use clean charts and cards.

21. Authentication

Implement secure authentication for:

Admin

Login

Logout

Password protection

Optional Student Account

Students can:

Create account

View registered classes

View bookings

View upcoming batches

Manage profile

Do not expose admin functionality to normal users.

22. Search & Filters

Implement global search where useful.

Users should be able to search:

Dance classes

Dance styles

Trainers

Events

Workshops

Add filtering and sorting where appropriate.

23. Responsive Design

The website must be fully responsive.

Optimize for:

Desktop

Laptop

Tablet

Mobile

On mobile:

Hamburger navigation

Sticky CTA

WhatsApp button

Touch-friendly cards

Responsive timetable

Optimized images

The mobile experience should feel like a premium modern application.

24. SEO

Implement basic SEO properly.

Include:

SEO-friendly URLs

Meta title

Meta description

Open Graph tags

Structured data / Schema.org

Local Business schema

Dance School / Performing Arts schema where appropriate

Sitemap

Robots.txt

Semantic HTML

Target keywords such as:

Dance studio

Dance classes

Dance academy

Bollywood dance classes

Hip-hop classes

Contemporary dance

Dance classes near me

Riddhi Dance Studio

Avoid keyword stuffing.

25. Performance

Optimize the website for fast loading.

Implement:

Lazy loading

Image optimization

WebP/AVIF where supported

Code splitting

Minimized assets

Efficient API calls

Caching

Skeleton loaders

Avoid unnecessary heavy libraries.

26. Animations

Use modern but subtle animations.

Examples:

Hero entrance animation

Scroll reveal

Card hover effects

Image zoom

Button micro-interactions

Smooth page transitions

Animated statistics

Testimonial carousel

Animations should improve the experience rather than distract from the content.

27. Technical Requirements

Use a clean and scalable architecture.

Preferred Frontend

React.js / Next.js

Recommended:

Next.js

TypeScript

Tailwind CSS

Framer Motion

Backend

Use one of:

Node.js + Express

Java Spring Boot

FastAPI

Database

Use:

MySQL or PostgreSQL

Authentication

Use secure authentication with:

JWT / Session based authentication

Password hashing

Role-based authorization

Storage

Use cloud storage for:

Gallery images

Trainer photos

Event images

Videos/thumbnails

28. Suggested Database Entities

Design the database around entities such as:

users

admins

students

trainers

dance_styles

classes

batches

registrations

trial_bookings

memberships

payments

events

event_registrations

gallery

videos

testimonials

contact_messages

notifications

Create proper primary keys, foreign keys, indexes and relationships.

29. Security

Implement:

Input validation

Server-side validation

Authentication

Authorization

Password hashing

Rate limiting

Secure API endpoints

Protection against SQL injection

XSS protection

CSRF protection where applicable

Secure file uploads

Admin route protection

Never expose sensitive credentials in frontend code.

Use environment variables for secrets.

30. UI/UX Requirements

The design should feel similar to a premium modern fitness/dance brand rather than a basic school website.

Important UX principles:

Clear navigation

Strong CTA

Minimal clutter

Large readable typography

High-quality visuals

Consistent spacing

Consistent buttons

Accessible color contrast

Clear forms

Fast interactions

Use a consistent design system for:

Colors

Typography

Buttons

Cards

Forms

Modals

Badges

Icons

31. Homepage Flow

Recommended homepage structure:

Navbar

↓

Hero Section

↓

Quick Stats

↓

About Riddhi Dance Studio

↓

Dance Classes

↓

Dance Styles

↓

Why Choose Us?

↓

Meet Our Trainers

↓

Upcoming Batches

↓

Gallery

↓

Videos

↓

Upcoming Events

↓

Testimonials

↓

Pricing

↓

Book a Trial CTA

↓

FAQ

↓

Contact / Map

↓

Footer

32. Footer

Create a professional footer containing:

Riddhi Dance Studio

Short description.

Quick Links:

Home
About
Classes
Trainers
Gallery
Events
Contact

Dance Styles:

Bollywood
Hip-Hop
Contemporary
Freestyle
Classical
Zumba

Contact:

Phone
Email
Address

Social Media:

Instagram
Facebook
YouTube

Include copyright information.

33. Content Management

Do not hard-code all business information.

Important information should be configurable:

Studio name

Logo

Phone

WhatsApp number

Email

Address

Social links

Class prices

Batch timings

Trainer information

Events

Gallery

Testimonials

This will make the website easier to maintain.

34. Important CTA Strategy

Use clear CTAs throughout the website:

Book a Trial Class

Join Now

View Classes

View Timetable

Contact Us

WhatsApp Us

Register Now

Do not overwhelm the user with too many competing CTAs in the same section.

35. Final Quality Requirements

The final website should be:

Production-ready

Responsive

SEO-friendly

Accessible

Secure

Fast

Scalable

Easy to maintain

Visually premium

Mobile-first

Conversion-focused

Do not create a generic landing page.

Build the website as a complete Dance Studio Management + Marketing Platform.

The final experience should make a visitor immediately understand:

What Riddhi Dance Studio offers → Why they should choose it → Which class is right for them → When they can join → How they can book a trial.

Before implementation, create the complete information architecture, component structure, database schema and API structure. Then implement the frontend and backend systematically.

Use reusable components and clean code architecture throughout the project.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
