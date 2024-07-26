"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    constructor() { }
    static getInstance() {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    log(...messages) {
        console.log(...messages);
    }
    error(...messages) {
        console.error(...messages);
    }
}
exports.Logger = Logger;
