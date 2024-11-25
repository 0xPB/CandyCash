
# CandyCash 🍬📈
CandyCash is a playful financial dashboard that allows users to track stock performance and market trends in real time. Inspired by the candy universe, CandyCash makes financial analysis sweet and enjoyable! 🍭

## Features

- 🔒 **Secure User Login**
- 📊 **Real-time Stock Tracking** with external financial data API
- 🍬 **Dynamic Data Visualization** with interactive charts
- ⭐ **Favorites Management** to monitor specific stocks with personalized views
- 🚨 **Real-time Notifications** for market changes
- 🍭 **Intuitive Interface** with a candy-themed design

## Technologies Used

### Frontend
- **Vue.js**: JavaScript framework for building the user interface
- **Vue Router**: Handles navigation between different pages
- **Vuex**: Manages the global state of the application
- **Chart.js**: Displays financial data as dynamic charts

### Backend
- **Node.js**: Development environment for the server
- **Express.js**: Web framework for building the API
- **Database**: SQL/NoSQL to store user data and preferences
- **Socket.io**: Real-time communication for instant notifications

## 🖋️ Authors

- Paul Bruno [LinkedIn](https://www.linkedin.com/in/paulbruno33)
- Hugo Andrejewski [LinkedIn](https://www.linkedin.com/in/hugo-andrejewski-a0385b253)
- Mathias Chauvet [LinkedIn](https://www.linkedin.com/in/mathias-chauvet-022447204)

## 📜 License

This project is licensed under the GPLv3 License. See the `LICENSE` file for more information.

## Todo

installer mongod

2. Vérifier l'adresse d'écoute de MongoDB
MongoDB peut être configuré pour écouter uniquement sur 127.0.0.1 (localhost), ce qui empêche les connexions externes. Vérifiez le fichier de configuration mongod.conf :
bash
Copy code
sudo nano /etc/mongod.conf
Recherchez la section bindIp. Si elle est définie sur 127.0.0.1, remplacez-la par 0.0.0.0 pour permettre les connexions externes :
yaml
Copy code
net:
  bindIp: 0.0.0.0
  port: 27017
Redémarrez MongoDB après cette modification :
bash
Copy code
sudo systemctl restart mongod

Ouvrir ces ports:
3000 frontend
, 4000: chat
5000: backend
27017: mongodb

. Activer le routage temporairement
Cette méthode active le routage des paquets uniquement jusqu'au prochain redémarrage.

Utilisez la commande suivante pour activer le routage des paquets :

bash
Copy code
sudo sysctl -w net.ipv4.ip_forward=1
Vérifiez que le routage est activé :

bash
Copy code
cat /proc/sys/net/ipv4/ip_forward
Si la sortie est 1, le routage est activé.


sudo apt install ufw
sudo ufw enable