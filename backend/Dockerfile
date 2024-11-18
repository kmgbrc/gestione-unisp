# Étape 1 : Image de base avec Maven pour compilation
FROM maven:3.9.5-eclipse-temurin-17 AS build

# Étape 2 : Définir le répertoire de travail
WORKDIR /gestione-unisp

# Étape 3 : Copier uniquement le fichier pom.xml et télécharger les dépendances Maven
COPY backend/pom.xml backend/
RUN mvn -f backend/pom.xml dependency:go-offline

# Étape 4 : Copier tout le code source
COPY backend backend/

# Étape 5 : Construire le projet et générer le fichier .jar
RUN mvn -f backend/pom.xml clean package -DskipTests

# Étape 6 : Image runtime (légère)
FROM eclipse-temurin:17-jre

# Étape 7 : Définir le répertoire de travail
WORKDIR /gestione-unisp/backend

# Étape 8 : Copier le fichier .jar depuis l'étape précédente
COPY --from=build /gestione-unisp/backend/target/backend-0.0.1-SNAPSHOT.jar app.jar

# Étape 9 : Exposer le port défini dans application.properties
EXPOSE 8080

# Étape 10 : Commande d'entrée pour exécuter l'application
ENTRYPOINT ["java", "-jar", "app.jar"]
