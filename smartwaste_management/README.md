# Smart Waste Tracking Website

This is a Node.js web application for tracking waste types and amounts. It uses Express.js for the backend, EJS for templating, and stores waste records in a local JSON file.

## Features
- Add new waste entries (type and amount)
- View all waste records
- Delete waste records
- Simple dashboard UI

## Getting Started

### Prerequisites
- Node.js (v14 or higher recommended)

### Installation
1. Open a terminal in the project directory.
2. Run:
   ```
npm install
   ```

### Running the App
Start the server with:
```
node index.js
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
- `index.js` - Main server file
- `views/` - EJS templates
- `public/` - Static assets (CSS)
- `waste-data.json` - Data file (auto-created)

## Customization
You can extend the app to support authentication, analytics, or database storage as needed.
