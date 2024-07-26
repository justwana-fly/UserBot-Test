import { FileAnalyzer } from './fileAnalyzer';

// Ottieni il path del file dall'ambiente
const inputPath = process.env.INPUT_PATH;

if (!inputPath) {
  console.error('Per favore, fornisci il path del file (locale o URL) come variabile d\'ambiente.');
  process.exit(1);
}

// Funzione per gestire l'analisi del file e la logica dell'applicazione
const runAnalysis = async (path: string) => {
  try {
    const analyzer = new FileAnalyzer();
    await analyzer.analyzeFile(path);
    console.log('Analisi completata.');
    process.exit(0);
  } catch (err) {
    if (err instanceof Error) {
      console.error('Errore nell\'analisi del file:', err.message);
    } else {
      console.error('Errore sconosciuto:', err);
    }
    process.exit(1);
  }
};

// Avvia l'analisi del file
runAnalysis(inputPath);
