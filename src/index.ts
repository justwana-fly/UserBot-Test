import axios from 'axios';
import * as readline from 'readline';
import * as fs from 'fs';
import * as path from 'path';

// Crea un'interfaccia readline per leggere l'input dell'utente
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Funzione per analizzare il file.
 * @param inputPath Il percorso del file (locale o URL).
 */
export const analyzeFile = async (inputPath: string): Promise<void> => {
  try {
    let data: string;

    if (inputPath.startsWith('http')) {
      // Se è un URL, utilizza axios per leggere il contenuto
      const response = await axios.get(inputPath);
      data = response.data;
    } else {
      // Percorso del file nella directory principale del progetto
      const filePath = path.resolve(__dirname, '..', inputPath);
      console.log('Leggendo il file locale da:', filePath);
      if (fs.existsSync(filePath)) {
        data = fs.readFileSync(filePath, 'utf-8');
      } else {
        throw new Error('File non trovato.');
      }
    }

    // Conteggio degli spazi all'inizio e alla fine del testo
    const leadingSpaces = data.match(/^\s+/)?.[0].length || 0;
    const trailingSpaces = data.match(/\s+$/)?.[0].length || 0;

    // Pulizia del testo
    const cleanedData = data
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "") // Rimuove la punteggiatura
      .trim(); // Rimuove spazi all'inizio e alla fine del testo

    // Conteggio degli spazi tra le parole
    const totalSpaces = data.split(/(?<=\s)/).length - 1; // Conta gli spazi tra le parole

    // Split del contenuto del file in parole usando spazi come delimitatori
    const words = cleanedData.split(/\s+/).filter(word => word.length > 0);
    const totalWords = words.length;

    // Conteggio lettere
    const totalLetters = data.replace(/[^a-zA-Z]/g, "").length; // Conta solo le lettere

    // Stampa i risultati dell'analisi
    console.log(`Numero totale di parole: ${totalWords}`);
    console.log(`Numero di lettere: ${totalLetters}`);
    console.log(`Numero di spazi: ${totalSpaces}`);

    console.log('Parole che si ripetono più di 10 volte:');
    const wordCounts = new Map<string, number>();
    for (const word of words) {
      const cleanedWord = word.toLowerCase();
      wordCounts.set(cleanedWord, (wordCounts.get(cleanedWord) || 0) + 1);
    }
    for (const [word, count] of wordCounts.entries()) {
      if (count > 10) {
        console.log(`${word}: ${count}`);
      }
    }

  } catch (error) {
    if (error instanceof Error) {
      console.error('Errore nella lettura del file:', error.message);
    } else {
      console.error('Errore sconosciuto:', error);
    }
  }
};

// Richiesta dell'input all'utente
rl.question('Inserisci il path del file (locale o URL): ', (inputPath) => {
  analyzeFile(inputPath).then(() => rl.close());
});
