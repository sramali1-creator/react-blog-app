# React Blog App – Module 11 Lab

A React blog built with Vite and React Router that pulls data from the JSONPlaceholder API.

## Features
- **Blog Posts page** (`/posts`): fetches all posts with `useEffect` + `useState`; shows the title, a content preview and a link to each post.
- **Individual post page** (`/posts/:postId`): uses `useParams` to read the post ID, fetches the post, then fetches its author from `/users/{userId}` (name, username, email, company, website).
- **Comments**: fetched from `/posts/{postId}/comments` and shown below the post. Shows "No comments yet. Be the first to comment!" when there are none.
- **Comment form**: validates that name and comment aren't empty, sends a POST to `/posts/{postId}/comments`, and adds the new comment to the list on success.
- **Styling**: plain CSS (`src/index.css`).
- **Bonus**: error handling with user-friendly messages for every API call, and loading spinners for the posts, the post and the comments.

> Note: JSONPlaceholder is a fake API, so new comments aren't saved on the server and disappear on refresh.

## Run it
```bash
npm install
npm run dev
```
Then open the URL Vite prints (usually http://localhost:5173).
