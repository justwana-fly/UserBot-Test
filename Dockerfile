# Usa l'immagine di Node.js
FROM node:18

# Imposta la directory di lavoro
WORKDIR /usr/src/app

# Copia i file di dipendenza
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia il resto del codice
COPY . .

# Costruisci l'app
RUN npm run build

# Avvia l'app
CMD ["node", "dist/index.js"]
