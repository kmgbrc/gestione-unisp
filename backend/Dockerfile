# Dockerfile pour le backend
FROM eclipse-temurin:17-jdk-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires
COPY .mvn/ .mvn/
COPY mvnw mvnw
COPY pom.xml ./

# Téléchargement des dépendances Maven
RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline

# Copier les sources de l'application
COPY src ./src

# Construire le projet
RUN ./mvnw package -DskipTests

# Exposer le port 8081
EXPOSE 8081

# Démarrer l'application
CMD ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]
