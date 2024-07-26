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
exports.analyzeFile = void 0;
const axios_1 = __importDefault(require("axios"));
const readline = __importStar(require("readline"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
// Crea un'interfaccia readline per leggere l'input dell'utente
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
/**
 * Funzione per analizzare il file.
 * @param inputPath Il percorso del file (locale o URL).
 */
const analyzeFile = (inputPath) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
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
            console.log('Leggendo il file locale da:', filePath);
            if (fs.existsSync(filePath)) {
                data = fs.readFileSync(filePath, 'utf-8');
            }
            else {
                throw new Error('File non trovato.');
            }
        }
        // Conteggio degli spazi all'inizio e alla fine del testo
        const leadingSpaces = ((_a = data.match(/^\s+/)) === null || _a === void 0 ? void 0 : _a[0].length) || 0;
        const trailingSpaces = ((_b = data.match(/\s+$/)) === null || _b === void 0 ? void 0 : _b[0].length) || 0;
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
        const wordCounts = new Map();
        for (const word of words) {
            const cleanedWord = word.toLowerCase();
            wordCounts.set(cleanedWord, (wordCounts.get(cleanedWord) || 0) + 1);
        }
        for (const [word, count] of wordCounts.entries()) {
            if (count > 10) {
                console.log(`${word}: ${count}`);
            }
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Errore nella lettura del file:', error.message);
        }
        else {
            console.error('Errore sconosciuto:', error);
        }
    }
});
exports.analyzeFile = analyzeFile;
// Richiesta dell'input all'utente
rl.question('Inserisci il path del file (locale o URL): ', (inputPath) => {
    (0, exports.analyzeFile)(inputPath).then(() => rl.close());
});
