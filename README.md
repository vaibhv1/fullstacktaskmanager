In this project,the aim is to create a full-stack task management application with a Node.js backend and a React frontend. The backend uses Express for handling HTTP requests and PostgreSQL as the database. The frontend is built with React and styled using Tailwind CSS.

Backend Decisions:

Express: Chosen for its simplicity and flexibility in handling HTTP requests.
PostgreSQL: Selected for its robustness and support for advanced SQL features.
Schema Design: The tasks table includes fields for title, description, due_date, priority, and status. Constraints ensure data integrity.
Triggers and Functions: A trigger function automatically updates the task status to "Overdue" if the due date has passed, ensuring data consistency.

Frontend Decisions:

React: Chosen for its component-based architecture and ease of state management.
Tailwind CSS: Used for its utility-first approach, allowing for rapid and consistent styling.
State Management: The useTasks hook manages task-related state and handles API interactions, ensuring a clean separation of concerns.
Overall Architecture: The project is structured to separate concerns between the frontend and backend, allowing for independent development and testing. The backend provides a RESTful API for task management, while the frontend consumes this API to provide a user-friendly interface.

By following these decisions, we aimed to create a scalable, maintainable, and user-friendly task management application.

PostgreSQL schema

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE,
    priority VARCHAR(50) CHECK (priority IN ('Low', 'Medium', 'High')),
    status VARCHAR(50) CHECK (status IN ('Pending', 'In Progress', 'Completed', 'Overdue'))
);

Complete Application deployment link(FE/BE and Database)
https://fullstacktaskmanager.vercel.app/
