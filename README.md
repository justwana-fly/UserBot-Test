# File Analyzer

## Descrizione

L'applicazione `File Analyzer` legge un file dal path inserito dall'utente (locale o URL) e fornisce le seguenti informazioni:
- Numero totale di parole nel file
- Numero di lettere nel file
- Numero di spazi nel file
- Parole che si ripetono più di 10 volte e il numero di ripetizioni

## Requisiti

- Node.js
- npm o yarn

## Installazione

1. Clona il repository:
   ```bash
   git clone <repository-url>
   cd UserBot-Test

2. Installa le dipendenze:
   npm install
   # o
   yarn install

3. Compila il progetto TypeScript:
   npm run build
   # o
   yarn build

4. Esegui l'applicazione:
   npm start
   # o
   yarn start

5. Imposta la variabile d'ambiente INPUT_PATH con il path del file che desideri analizzare. Puoi farlo con il comando:
    export INPUT_PATH=/path/to/your/file.txt
    # su Windows, usa:
    set INPUT_PATH=C:\path\to\your\file.txt

6. Esegui nuovamente l'applicazione per avviare l'analisi.

Esecuzione con Docker

1. Costruisci l'immagine Docker:
   docker build -t file-analyzer .

2. Avvia il container Docker, montando la directory corrente e impostando la variabile d'ambiente INPUT_PATH:
   docker run -it -v "${PWD}:/usr/src/app" -e INPUT_PATH=/usr/src/app/testFile.txt file-analyzer

   Test
   npm test
   # oppure
   yarn test


Questo file contiene tutte le informazioni necessarie per l'installazione, l'esecuzione e il testing dell'applicazione in un unico blocco.



