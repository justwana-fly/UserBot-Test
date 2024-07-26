"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fileAnalyzer_1 = require("./fileAnalyzer");
// Ottieni il path del file dall'ambiente
const inputPath = process.env.INPUT_PATH;
if (!inputPath) {
    console.error('Per favore, fornisci il path del file (locale o URL) come variabile d\'ambiente.');
    process.exit(1);
}
// Funzione per gestire l'analisi del file e la logica dell'applicazione
const runAnalysis = (path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const analyzer = new fileAnalyzer_1.FileAnalyzer();
        yield analyzer.analyzeFile(path);
        console.log('Analisi completata.');
        process.exit(0);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error('Errore nell\'analisi del file:', err.message);
        }
        else {
            console.error('Errore sconosciuto:', err);
        }
        process.exit(1);
    }
});
// Avvia l'analisi del file
runAnalysis(inputPath);
