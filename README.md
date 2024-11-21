# gestione-unisp

## Guida Docker per il progetto Gestione-Unisp

Questa guida descrive come configurare e gestire i container Docker per il progetto **Gestione-Unisp**, che include un backend (Spring Boot), un frontend (React con Vite), e i servizi di database (PostgreSQL) e cache (Redis).

### Prerequisiti

1. **Docker Desktop** deve essere installato sul tuo sistema Windows.
   - Scarica e installa Docker Desktop da [docker.com](https://www.docker.com/products/docker-desktop).
   - Assicurati di attivare **WSL 2** durante l'installazione.

2. Verifica l'installazione di Docker aprendo un terminale e digitando:
   ```
    docker --version
  Dovresti vedere una risposta simile a Docker version 24.x.x.

### Struttura del Progetto
Assicurati che i file Docker siano organizzati correttamente:
  ```
  gestione-unisp/
      ├── backend/
      │   ├── Dockerfile
      │   ├── src/
      │   ├── pom.xml
      ├── frontend/
      │   ├── Dockerfile
      │   ├── src/
      │   ├── package.json
      ├── docker-compose.yml
```
### Comandi Principali
1. Costruire e Avviare i Container
Per costruire le immagini Docker e avviare i container, posizionati nella directory principale del progetto (dove si trova docker-compose.yml) ed esegui:

```
docker-compose up --build
```
Questa operazione creerà i container per:
 - Backend (porta: 8081)
 - Frontend (porta: 5173)
 - PostgreSQL (porta: 5432)
 - Redis (porta: 6379)
2. Verifica dei Container in Esecuzione
Dopo l'avvio, controlla che i container siano attivi con:
```
docker ps
```
3. Arrestare i Container
Per fermare tutti i container, esegui:
```
docker-compose down
```
Se desideri anche rimuovere i volumi associati (ad esempio per cancellare i dati di PostgreSQL), usa:
```
docker-compose down --volumes
```
### Accesso ai Servizi
  - Frontend: http://localhost:5173
  - Backend: http://localhost:8081
  - PostgreSQL: accessibile localmente su localhost:5432 (username: postgres, password: xcvbn)
  - Redis: accessibile localmente su localhost:6379
    
### Risoluzione dei Problemi
1. Controllare i Log dei Container
Per visualizzare i log dei container in caso di errori, usa:
```
docker-compose logs
```
2. Ricostruire un Singolo Container
Se un singolo servizio ha bisogno di essere ricostruito, esegui:
```
docker-compose build <nome_servizio>
```
Esempio per il backend:
```
docker-compose build backend
```

### Note Aggiuntive
 - Variabili d'Ambiente: Configura le variabili d'ambiente nel file .env per gestire le configurazioni di backend e frontend.
 - Persistenza dei Dati: Assicurati di utilizzare i volumi Docker per mantenere i dati di PostgreSQL e Redis tra le sessioni.
```
volumes:
  postgres_data:
```
Con questa configurazione, i dati del database non verranno persi quando i container vengono fermati.
