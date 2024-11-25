# CandyCash 🍬📈

CandyCash is a playful financial dashboard that allows users to track stock performance and market trends in real time. Inspired by the candy universe, CandyCash makes financial analysis sweet and enjoyable! 🍭

## Features

- Secure User Login: Protect your data with robust authentication.
- Real-time Stock Tracking: Access live financial data through an external API.
- Dynamic Data Visualization: Enjoy interactive charts for intuitive analysis.
- Favorites Management: Monitor specific stocks with personalized views.
- Real-time Notifications: Stay updated on significant market changes.
- Intuitive Interface: Navigate with ease through a candy-themed design.
- System Management via Dialog: Control and manage application services directly through the Python script `CandyCash.py`:
  - Open All Ports: Enable the required ports (3000, 4000, 5000, 27017) for frontend, backend, chat, and database services.
  - Close All Ports: Securely close all ports when services are stopped.
  - Start/Stop Frontend: Manage the frontend service.
  - Start/Stop Backend: Manage the backend service.
  - Start/Stop Chat: Enable or disable the chat service.
  - Modify IP: Replace the current system IP address for the server.
  - Reset IP to Default: Restore the default IP address for the system.

## Technologies Used

### Frontend
- Vue.js: JavaScript framework for building the user interface.
- Vue Router: Handles navigation between different pages.
- Vuex: Manages the global state of the application.
- Chart.js: Visualizes financial data with dynamic, interactive charts.

### Backend
- Node.js: Development environment for the server.
- Express.js: Web framework for building the API.
- MongoDB: Database to store user data and preferences.
- Socket.io: Enables real-time communication for instant notifications.

## Installation

1. Install MongoDB:
   sudo apt update
   sudo apt install -y mongodb

2. Configure MongoDB:
   Open the configuration file:
   sudo nano /etc/mongod.conf

   Modify the bindIp to allow external connections:
   net:
     bindIp: 0.0.0.0
     port: 27017

   Restart MongoDB:
   sudo systemctl restart mongod

3. Install MongoDB Compass (optional for GUI):
   sudo apt install mongodb-compass

4. Install UFW (Uncomplicated Firewall):
   sudo apt install ufw

   Enable UFW:
   sudo ufw enable

5. Install Node.js Dependencies:
   Navigate to the backend folder and install dependencies:
   cd backend
   npm install

   Navigate to the frontend folder and install dependencies:
   cd ../frontend
   npm install

6. Run the Application:
   Return to the root folder and launch the Python script to manage the system:
   cd ..
   sudo python3 CandyCash.py

## About `CandyCash.py`

The `CandyCash.py` script, located at the root of the project, is the central management tool for controlling the application services and configuring the system. Here's what it does:

- **Open All Ports**: Automatically opens the required ports (3000 for the frontend, 4000 for the chat, 5000 for the backend, and 27017 for MongoDB) to ensure all services function correctly.
- **Close All Ports**: Closes all the aforementioned ports for security when the services are no longer needed.
- **Start/Stop Frontend**: Allows the user to start or stop the Vue.js frontend interface.
- **Start/Stop Backend**: Enables the user to start or stop the Node.js backend server.
- **Start/Stop Chat**: Manages the chat service by enabling or disabling the Socket.io-based server.
- **Modify IP**: Changes the server's IP address if needed, useful for deploying the system in different environments or with different network configurations.
- **Reset IP to Default**: Restores the IP address to its default state.

## Ports Used

- 3000: Frontend
- 4000: Chat
- 5000: Backend
- 27017: MongoDB

## Authors

- Paul Bruno: LinkedIn at https://www.linkedin.com/in/paulbruno33
- Hugo Andrejewski: LinkedIn at https://www.linkedin.com/in/hugo-andrejewski-a0385b253
- Mathias Chauvet: LinkedIn at https://www.linkedin.com/in/mathias-chauvet-022447204

## License

This project is licensed under the GPLv3 License. See the LICENSE file for more information.
