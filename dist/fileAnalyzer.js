"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileAnalyzer = void 0;
const axios_1 = __importDefault(require("axios"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const singletonLogger_1 = require("./singletonLogger");
class FileAnalyzer {
    analyzeFile(inputPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const logger = singletonLogger_1.Logger.getInstance();
            try {
                let data;
                if (inputPath.startsWith('http')) {
                    // Se è un URL, utilizza axios per leggere il contenuto
                    const response = yield axios_1.default.get(inputPath);
                    data = response.data;
                }
                else {
                    // Percorso del file nella directory principale del progetto
                    const filePath = path.resolve(__dirname, '..', inputPath);
                    logger.log('Leggendo il file locale da:', filePath);
                    if (fs.existsSync(filePath)) {
                        data = fs.readFileSync(filePath, 'utf-8');
                    }
                    else {
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
                const wordCounts = new Map();
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
            }
            catch (error) {
                if (error instanceof Error) {
                    logger.error('Errore nella lettura del file:', error.message);
                }
                else {
                    logger.error('Errore sconosciuto:', error);
                }
            }
        });
    }
}
exports.FileAnalyzer = FileAnalyzer;
