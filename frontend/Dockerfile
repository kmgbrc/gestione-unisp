# Dockerfile pour le frontend
FROM node:20-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm ci

# Copier les fichiers restants du projet
COPY . ./

# Construire le projet
RUN npm run build

# Exposer le port 5173
EXPOSE 5173

# Lancer le serveur en mode preview
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
