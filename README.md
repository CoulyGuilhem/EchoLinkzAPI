# EchoLinkzAPI

API pour la mise en relation d'urgence et de volontariat communautaire, avec messagerie instantanée par signalement.

---

## Authentification

### Inscription - POST /api/auth/signup
```bash
curl -X POST http://localhost:5001/api/auth/signup -H "Content-Type: application/json" -d "{\"username\":\"testuser\",\"email\":\"testuser@example.com\",\"password\":\"password123\"}"
```

### Connexion - POST /api/auth/signin
```bash
curl -X POST http://localhost:5001/api/auth/signin -H "Content-Type: application/json" -d "{\"email\":\"testuser@example.com\",\"password\":\"password123\"}"
```

---

## Signalements

### Créer un signalement - POST /api/reports
```bash
curl -X POST http://localhost:5001/api/reports -H "Content-Type: application/json" -H "Authorization: Bearer TON_TOKEN_ICI" -d "{\"title\":\"Coupure électrique\",\"description\":\"Panne généralisée dans le quartier.\",\"category\":\"électricité\",\"priority\":3}"
```

### Récupérer tous les signalements - GET /api/reports
```bash
curl -X GET http://localhost:5001/api/reports -H "Authorization: Bearer TON_TOKEN_ICI"
```

---

## Réponses Volontaires

### Répondre à un signalement - POST /api/responses
```bash
curl -X POST http://localhost:5001/api/responses -H "Content-Type: application/json" -H "Authorization: Bearer TON_TOKEN_ICI" -d "{\"reportId\":\"68110e110712c2679d64602c\"}"
```

---

## Messagerie Instantanée

### Récupérer l'historique des messages - GET /api/messages/:reportId
```bash
curl -X GET http://localhost:5001/api/messages/68110e110712c2679d64602c -H "Authorization: Bearer TON_TOKEN_ICI"
```

---

## Communication en temps réel (Socket.IO)

- **joinRoom** : rejoindre une room de discussion (`reportId`, thème ou zone)
- **sendMessage** : envoyer un message
- **receiveMessage** : recevoir les nouveaux messages

Exemple côté client :

```javascript
import { io } from "socket.io-client";

const socket = io("http://localhost:5001");

socket.emit('joinRoom', { reportId: '68110e110712c2679d64602c' });
socket.emit('sendMessage', { reportId: '68110e110712c2679d64602c', message: 'Je suis en route !', senderId: '6810f7ea11e4001b5b8d15cc' });
socket.on('receiveMessage', (data) => console.log('Message reçu :', data));
```

---

## Authentification obligatoire pour :
- Créer un signalement
- Répondre à un signalement
- Envoyer/récupérer des messages

Ajouter dans les headers :
```bash
-H "Authorization: Bearer TON_TOKEN_ICI"
```

---

## Technologies
- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- Socket.IO
- JWT pour authentification

---

# Projet API prêt pour une utilisation Hackathon / MVP 🚀

