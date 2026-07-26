<!--
HOW TO USE THIS TEMPLATE
1. This becomes your FRONTEND repo's README.md — the front door of your project.
   Copy everything below the line into that README.md.
2. Replace every [bracket] with your own answer.
3. Delete the italic hints once a section is filled in.
4. The goal is a README a NEW developer could read and run your project without asking you anything.
5. Due Monday, 10:00 AM. The poll app is used as the running example throughout.
-->

---

# Polling App

This app is full-stack web application where users can create polls, vote on available options and view the results. It was built as a team capstone project to practice developing and deploying a complete PERN-stack application. 

## Live Demo

| Environment | URL |
| --- | --- |
| Frontend (Vercel) | [Vercel App](https://frontend-dylanreaves.vercel.app/) |
| Backend API (Render) | [Backend API](https://backend-7j1j.onrender.com) |

## Repo Links
| Repository | URL |
| --- | --- |
| Frontend | https://github.com/TTP-Capstone-I/Frontend |
| Backend | https://github.com/TTP-Capstone-I/Backend |

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React, Vite, React Router, Axios, CSS |
| Backend | Node.js, Express |
| Database | PostgreSQL, Sequelize (ORM) |
| Hosting | Vercel (Frontend), Render (Backend), Neon (Database) |

## Features

- **[X]** View all polls on the home page
- **[X]** Search for polls by title
- **[X]** Sort polls by top voted, latest, oldest, A–Z, or Z–A
- **[X]** Create a poll with a title, description, and two to five options
- **[X]** Submit a vote for one poll option
- **[X]** View vote counts & percentages for each option
- **[X]** Identify the option selected by the current browser
- **[X]** Prevent repeat voting from the same browser using localStorage
- **[X]** Mark previously voted polls on the home page
- **[X]** Store browser-based poll ownership
- **[X]** Allow poll owners to delete their existing polls
- **[X]** Responsive layouts for desktop & mobile screens

## Architecture

The React frontend sends requests to an Express REST API using Axios. The Express server validates each request and uses Sequelize to interact with a PostgreSQL database hosted on Neon.

The API returns polls with their related options and votes. The frontend uses this data and displays it to the user.

```
React + Vite               Express API                 PostgreSQL
  (Vercel)   ── fetch ──>   (Render)  ── Sequelize ──>   (Neon)
```

## Database Schema

| Table | Key columns | Relationships |
| --- | --- | --- |
| Polls | `id`, `title`, `description`, `ownerTokenHash` | Has many Options |
| Options | `id`, `title`, `pollId` | Belongs to Poll; has many Votes |
| Votes | `id`, `optionId`, nullable `userId` | Belongs to Option; may belong to User |
| Users | `id`, `name`, `email` | Has many Votes |

Deleting a poll also deletes its associated options. Deleting an option also deletes its associated votes.

The Users table is included as groundwork for future authentication support, but the current frontend does not require auth, so votes can still be anonymous.

## API Reference
Protected routes expect the ownership token in this request header:
```http
x-owner-token: <poll-owner-token>
```

## Polls
| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/polls` | Returns all polls with their options & votes |
| GET | `/polls/:id` | Returns one poll with it's options & votes |
| POST | `/polls` | Create a poll with two to five options |
| PATCH | `/polls/:id` | Updates the title, description, or both; ownership token required |
| DELETE | `/polls/:id` | Delete an owned poll and its related options & votes; ownership token required |

#### Example: Create a poll

```http
POST /polls
Content-Type: application/json
```

```json
{
  "title": "What is your favorite programming language?",
  "description": "Choose one of the available languages.",
  "options": [
    {
      "title": "JavaScript"
    },
    {
      "title": "Python"
    },
    {
      "title": "C++"
    }
  ]
}
```

The response includes an `ownerToken` on creation. The frontend stores this token so the poll can later be modified or deleted from the browser that created it.

#### Update a poll

```http
PATCH /polls/1
Content-Type: application/json
x-owner-token: <poll-owner-token>
```

Only the fields being changed need to be included:

```json
{
  "title": "Updated poll title"
}
```

## Options
| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/options` | Returns all option records with their votes |
| GET | `/options/:id` | Returns one option with its votes |
| POST | `/options` | Adds an option an owned poll; `pollId` and ownership token required  |
| PATCH | `/options/:id` | Updates the title of an option; ownership token required |
| DELETE | `/options/:id` | Deletes an option from an owned poll; ownership token required |

#### Example: Add an option

```http
POST /options
Content-Type: application/json
x-owner-token: <poll-owner-token>
```

```json
{
  "title": "New poll option",
  "pollId": 1
}
```

## Votes
| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/votes` | Returns all vote records|
| GET | `/votes/:id` | Returns one vote record by it's id |
| POST | `/votes` | Creates a vote for a valid option |
| PATCH | `/votes/:id` | Updates a vote's optionId, i.e. voting for a different option (Currently Disabled) |
| DELETE | `/votes/:id` | Deletes a vote for an option (Currently Disabled) |

```http
POST /votes
Content-Type: application/json
```

```json
{
  "optionId": 1
}
```

Vote editing and deletion are disabled because the application does not yet have user authentication or a secure way to verify ownership of an individual vote.


## Getting Started (Run It Locally)

### Prerequisites
- Node.js (v18+) and npm installed
- A PostgreSQL database URL (we use [Neon](https://neon.tech))

### 1. Clone both repos
```bash
git clone https://github.com/TTP-Capstone-I/Backend.git
git clone https://github.com/TTP-Capstone-I/Frontend.git
```

### 2. Configure and start the backend
Enter the backend repo and install all dependencies.
```bash
cd Backend
npm install
```

Create a `.env` file inside the backend folder: `.env`:
```
DB_URL=postgresql://user:password@host/dbname
PORT=3000
```

Start the server:
```bash
npm run dev
```

The server will run at:
```text
http://localhost:3000
```

### 3. Configure and start the frontend
Enter the frontend repo and install all dependencies.
```bash
cd Frontend
npm install
```

Create a `.env` file inside the frontend folder:
```env
VITE_API_URL=http://localhost:3000 
```
The port should match the port used for the backend.

Start the frontend:
```bash
npm run dev
```

The frontend will normally run at:
```text
http://localhost:5173
```

Do not commit either `.env` file. Both repositories already ignore environment files and `node_modules`.

## Team & Roles

| Name | Focused on |
| --- | --- |
| Dylan Reaves | Full-stack development, including frontend structure, poll creation and results pages, backend routes, database relationships, voting and ownership logic, validation, security, and deployment |
| Shun Lei | Poll voting page, frontend voting states and CSS styling, backend validation middleware, and Users database groundwork |
| Aaditya Koirala | Frontend development and UI planning & testing |

Roles overlapped throughout development. Much of the app was designed and tested collaboratively, so these descriptions show each member's primary areas of focus.

## Design Decisions

- We used React Router so users can move between the poll list, voting page, creation form, and results page without reloading the application.
- We calculate vote totals by loading each option with its associated votes and counting the length of each vote array because it was a direct approach for the size of this project.
- We perform search and sorting on the frontend because the home page already retrieves the complete list of polls.
- We use localStorage to prevent repeat voting from the same browser because the current version does not require user accounts.
- We use randomized poll-ownership tokens so creators can manage their polls without needing a complete authentication system.
- We store only a hash of each ownership token in the database so the raw secret is not exposed through database records or normal GET requests.    

## Challenges & What We Learned

- **Hardest bug or blocker:** One of our biggest challenges was figuring out how to prevent duplicate voting without requiring users to create accounts. We used localStorage as a workaround to prevent repeat voting from the same browser while keeping the database structure open for future user authentication.

- **What we'd do differently:** We would decide how voting, authentication, and poll ownership should work earlier in development. This would make it easier to design the database and API routes around those decisions from the beginning.

- **One thing we learned about working as a team:** We learned that frequent communication is especially important when frontend and backend work overlap. Changes to database relationships or API response structures needed to be communicated because they often required updates in several frontend components.

## Known Limitations

- Voting protection is browser-based rather than account-based.
- Ownership does not transfer between browsers or devices.
- User accounts and authentication are not part of the current version.
- Vote editing and deletion are intentionally disabled.

## Future Improvements

- Add user registration and authentication
- Associate polls and votes with authenticated users
- Allow poll creators to edit polls and options through the frontend
- Add poll closing dates or expiration times
- Add categories and server-side filtering
- Add pagination for larger numbers of polls
- Add automated backend and frontend tests