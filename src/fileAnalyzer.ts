import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { Logger } from './singletonLogger';

export class FileAnalyzer {
  async analyzeFile(inputPath: string): Promise<void> {
    const logger = Logger.getInstance();
    try {
      let data: string;

      if (inputPath.startsWith('http')) {
        // Se è un URL, utilizza axios per leggere il contenuto
        const response = await axios.get(inputPath);
        data = response.data;
      } else {
        // Percorso del file nella directory principale del progetto
        const filePath = path.resolve(__dirname, '..', inputPath);
        logger.log('Leggendo il file locale da:', filePath);
        if (fs.existsSync(filePath)) {
          data = fs.readFileSync(filePath, 'utf-8');
        } else {
          throw new Error('File non trovato.');
        }
      }

      // Pulizia del testo
      const cleanedData = data
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '') // Rimuove la punteggiatura
        .trim(); // Rimuove spazi all'inizio e alla fine del testo

      // Conteggio degli spazi
      const totalSpaces = data.split(/\s+/).length - 1;

      // Split del contenuto del file in parole
      const words = cleanedData.split(/\s+/).filter(word => word.length > 0);
      const totalWords = words.length;

      // Conteggio lettere
      const totalLetters = data.replace(/[^a-zA-Z]/g, '').length;

      // Stampa i risultati dell'analisi
      logger.log(`Numero totale di parole: ${totalWords}`);
      logger.log(`Numero di lettere: ${totalLetters}`);
      logger.log(`Numero di spazi: ${totalSpaces}`);

      // Conta le occorrenze delle parole
      const wordCounts = new Map<string, number>();
      for (const word of words) {
        const cleanedWord = word.toLowerCase();
        wordCounts.set(cleanedWord, (wordCounts.get(cleanedWord) || 0) + 1);
      }

      // Verifica se ci sono parole che si ripetono più di 10 volte
      let hasRepeatedWords = false;
      logger.log('Parole che si ripetono più di 10 volte:');
      for (const [word, count] of wordCounts.entries()) {
        if (count > 10) {
          logger.log(`${word}: ${count}`);
          hasRepeatedWords = true;
        }
      }

      // Se non ci sono parole ripetute più di 10 volte
      if (!hasRepeatedWords) {
        logger.log('Nessuna.');
      }

    } catch (error) {
      if (error instanceof Error) {
        logger.error('Errore nella lettura del file:', error.message);
      } else {
        logger.error('Errore sconosciuto:', error);
      }
    }
  }
}
