export enum LogLevel {
    Debug,
    Info,
    Warning,
    Error,
    Fatal,
}

const logLevelColors = {
    [LogLevel.Debug]: "#007bff",
    [LogLevel.Info]: "green",
    [LogLevel.Warning]: "orange",
    [LogLevel.Error]: "red",
    [LogLevel.Fatal]: "purple",
};

const logMethods = {
    [LogLevel.Debug]: console.log,
    [LogLevel.Info]: console.info,
    [LogLevel.Warning]: console.warn,
    [LogLevel.Error]: console.error,
    [LogLevel.Fatal]: console.error,
};

export class Logger {
    private print(level: LogLevel, component?: string, ...args: unknown[]) {
        logMethods[level].call(console, `%c[${component}]`, `background-color: ${logLevelColors[level]};`, ...args);
    }

    public constructor() {
        this.debug = this.debug.bind(this);
        this.info = this.info.bind(this);
        this.warning = this.warning.bind(this);
        this.error = this.error.bind(this);
        this.fatal = this.fatal.bind(this);
    }

    public debug(component: string, ...args: unknown[]) {
        if (process.env.NODE_ENV !== "development") {
            return;
        }

        this.print(LogLevel.Debug, component, ...args);
    }

    public info(component: string, ...args: unknown[]) {
        this.print(LogLevel.Info, component, ...args);
    }

    public warning(component: string, ...args: unknown[]) {
        this.print(LogLevel.Warning, component, ...args);
    }

    public error(component: string, ...args: unknown[]) {
        this.print(LogLevel.Error, component, ...args);
    }

    public fatal(component: string, ...args: unknown[]) {
        this.print(LogLevel.Fatal, component, ...args);
    }

    public static create() {
        return new Logger();
    }
}

export const logger = Logger.create();
