# CandyCash 🍬📈

CandyCash is a playful financial dashboard that allows users to track stock performance and market trends in real time. Inspired by the candy universe, CandyCash makes financial analysis sweet and enjoyable! 🍭

## Features 🍡✨

- 🔒 **Secure User Login**: Protect your data with robust authentication.
- 📊 **Real-time Stock Tracking**: Access live financial data through an external API.
- 🍩 **Dynamic Data Visualization**: Enjoy interactive charts for intuitive analysis.
- ⭐ **Favorites Management**: Monitor specific stocks with personalized views.
- 🚨 **Real-time Notifications**: Stay updated on significant market changes.
- 🍭 **Intuitive Interface**: Navigate with ease through a candy-themed design.

## Technologies Used 🍫🍬

### Frontend 🍩
- **Vue.js**: JavaScript framework for building the user interface.
- **Vue Router**: Handles navigation between different pages.
- **Vuex**: Manages the global state of the application.
- **Chart.js**: Visualizes financial data with dynamic, interactive charts.

### Backend 🍪
- **Node.js**: Development environment for the server.
- **Express.js**: Web framework for building the API.
- **MongoDB**: Database to store user data and preferences.
- **Socket.io**: Enables real-time communication for instant notifications.

## Installation 🍭✨

1. 🍬 **Install MongoD Community Edition**: [Link](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/)

2. 🍩 **Install MongoDB Compass** (optional for GUI): [Link](https://www.mongodb.com/docs/compass/current/install/)

3. 🍫 **Configure MongoD**:  
   Open the configuration file:  
   `sudo nano /etc/mongod.conf`  

   Modify the bindIp to allow external connections:  
   ```bash
   net:  
     bindIp: 0.0.0.0
     port: 27017
   ```   
   Restart MongoD:  
   `sudo systemctl restart mongod`

   Enable MongoD (automatic launch when machine is up):
   `sudo systemctl enable mongod`

   If not enabled need to type:
   `sudo systemctl start mongod`

4. 🍪 **Run MongoDB Community Edition**: [Link](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/#run-mongodb-community-edition)

5. 🍭 **Install UFW (Uncomplicated Firewall)**:  
   `sudo apt install ufw`

   Enable UFW:  
   `sudo ufw enable`

6. 🍬 **Install npm (Node.js Package Manager)**:  
   `sudo apt install -y npm`

7. 🍪 **Install Node.js Dependencies**:  
   Navigate to the backend folder and install dependencies:  
   `cd backend`  
   `npm install`  

   Navigate to the frontend folder and install dependencies:  
   `cd ../frontend`  
   `npm install`

8. 🍫 **Install Python3 and Packages**:
   Installing Python3 and Pip3   
   `sudo apt update`    
   `sudo apt install -y python3 python3-pip`    

   Installing Tkinter module (Ubuntu based distros.)     
   `sudo apt install -y python3-tk`    

   Alternatively, you can use:   
   `pip install tkinter`   

9. 🍡 **Run the Application**:  
   Return to the root folder and launch the Python script to manage the system:  
   `cd ..`  
   `sudo python3 CandyCash.py`   

## About `CandyCash.py` 🍭✨

The `CandyCash.py` script, located at the root of the project, is the central management tool for controlling the application services and configuring the system. Here's what it does:

- 🍬 **Open All Ports**: Automatically opens the required ports (3000 for the frontend, 4000 for the chat, 5000 for the backend, and 27017 for MongoDB) to ensure all services function correctly.
- 🍩 **Close All Ports**: Closes all the aforementioned ports for security when the services are no longer needed.
- 🍫 **Start/Stop Frontend**: Allows the user to start or stop the Vue.js frontend interface.
- 🍪 **Start/Stop Backend**: Enables the user to start or stop the Node.js backend server.
- ⭐ **Start/Stop Chat**: Manages the chat service by enabling or disabling the Socket.io-based server.
- ✨ **Auto IP Change**: Auto change the IP address to yours.
- 🍩 **Auto NPM installs** : Automatic install of npm in backend and frontend.

## Ports Used 🍩🍫

- 3000: Frontend
- 4000: Chat
- 5000: Backend
- 27017: MongoDB

## Authors 🍭

- Paul Bruno: [LinkedIn](https://www.linkedin.com/in/paulbruno33)
- Hugo Andrejewski: [LinkedIn](https://www.linkedin.com/in/hugo-andrejewski-a0385b253)
- Mathias Chauvet: [LinkedIn](https://www.linkedin.com/in/mathias-chauvet-022447204)

## License 🍬

This project is licensed under the GPLv3 License. See the [LICENSE](LICENSE.md) file for more information.
