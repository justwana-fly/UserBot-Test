export class Logger {
    private static instance: Logger;
  
    private constructor() {}
  
    public static getInstance(): Logger {
      if (!Logger.instance) {
        Logger.instance = new Logger();
      }
      return Logger.instance;
    }
  
    public log(...messages: any[]): void {
      console.log(...messages);
    }
  
    public error(...messages: any[]): void {
      console.error(...messages);
    }
  }
  