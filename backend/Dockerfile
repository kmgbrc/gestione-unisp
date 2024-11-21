# Dockerfile pour le backend
FROM eclipse-temurin:17-jdk-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier le fichier POM et les fichiers sources
COPY pom.xml ./
COPY src ./src

# Installer les dépendances et compiler le projet
RUN ./mvnw dependency:go-offline
RUN ./mvnw package -DskipTests

# Exposer le port 8081
EXPOSE 8081

# Lancer l'application
CMD ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]
