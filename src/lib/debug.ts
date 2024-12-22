// Debug levels
export type DebugLevel = 'error' | 'warn' | 'info' | 'debug';

class Debug {
  private static instance: Debug;
  private isEnabled: boolean = true;
  private logs: Array<{ level: DebugLevel; message: string; data?: any; timestamp: Date }> = [];

  private constructor() {}

  static getInstance(): Debug {
    if (!Debug.instance) {
      Debug.instance = new Debug();
    }
    return Debug.instance;
  }

  enable() {
    this.isEnabled = true;
  }

  disable() {
    this.isEnabled = false;
  }

  log(level: DebugLevel, message: string, data?: any) {
    if (!this.isEnabled) return;

    const logEntry = {
      level,
      message,
      data,
      timestamp: new Date()
    };

    this.logs.push(logEntry);

    const consoleMethod = level === 'error' ? 'error' : 
                         level === 'warn' ? 'warn' : 
                         level === 'info' ? 'info' : 'debug';

    console[consoleMethod](`[${level.toUpperCase()}] ${message}`, data || '');
  }

  getLogs() {
    return [...this.logs];
  }

  clearLogs() {
    this.logs = [];
  }
}

export const debug = Debug.getInstance();