# CandyCash 🍬📈

CandyCash is a playful financial dashboard that allows users to track stock performance and market trends in real time. Inspired by the candy universe, CandyCash makes financial analysis sweet and enjoyable! 🍭

## Features

- Secure User Login: Protect your data with robust authentication.
- Real-time Stock Tracking: Access live financial data through an external API.
- Dynamic Data Visualization: Enjoy interactive charts for intuitive analysis.
- Favorites Management: Monitor specific stocks with personalized views.
- Real-time Notifications: Stay updated on significant market changes.
- Intuitive Interface: Navigate with ease through a candy-themed design.
- System Management via Dialog: Control and manage application services directly through the integrated Python script:
  - Open All Ports: Enable the required ports (3000, 4000, 5000, 27017) for frontend, backend, chat, and database services.
  - Close All Ports: Securely close all ports when services are stopped.
  - Start/Stop Frontend: Manage the frontend service.
  - Start/Stop Backend: Manage the backend service.
  - Start/Stop Chat: Enable or disable the chat service.
  - Modify IP: Replace the current system IP address.
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

4. Run the Application:
   Launch the Python script to manage the system:
   sudo python3 CandyCash.py

5. System Management:
   Use the dialog interface to:
   - Open or close the necessary ports.
   - Start or stop the frontend, backend, and chat services.
   - Modify or reset the system IP address.

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