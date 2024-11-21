# Dockerfile pour le frontend
FROM node:20-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers du projet
COPY package.json yarn.lock ./
COPY . ./

# Installer les dépendances
RUN yarn install --frozen-lockfile

# Construire le projet
RUN yarn build

# Exposer le port 5173
EXPOSE 5173

# Lancer le serveur en mode preview
CMD ["yarn", "preview", "--host", "0.0.0.0"]
