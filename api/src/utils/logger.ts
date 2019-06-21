import * as winston from "winston";
import * as fs from "fs";

class Logger {
    private _logger: winston.Logger;

    private _folderLog: string = "logs";

    private _debug: Object = {
        name: "debug-file",
        level: "debug",
        filename: this._folderLog + "/debug/admincar-api.log",
        maxsize: 100000,
        maxFiles: 3
    };

    private _info: Object = {
        name: "info-file",
        level: "info",
        filename: this._folderLog + "/info/admincar-api.log",
        maxsize: 100000,
        maxFiles: 3
    };

    private _error: Object = {
        name: "error-file",
        level: "error",
        filename: this._folderLog + "/error/admincar-api.log",
        maxsize: 100000,
        maxFiles: 20
    };

    constructor() {
        this.checkFolders();
        this._logger = winston.createLogger({
            transports: [
                new winston.transports.File(this._debug),
                new winston.transports.File(this._info),
                new winston.transports.File(this._error)
            ]
        });

    }

    private checkFolders(): void {
        if (!fs.existsSync(this._folderLog)) {
            fs.mkdirSync(this._folderLog);
        }
        if (!fs.existsSync(this._folderLog + "/debug")) {
            fs.mkdirSync(this._folderLog + "/debug");
        }
        if (!fs.existsSync(this._folderLog + "/info")) {
            fs.mkdirSync(this._folderLog + "/info");
        }
        if (!fs.existsSync(this._folderLog + "/error")) {
            fs.mkdirSync(this._folderLog + "/error");
        }
    }

    public info(message: string): void {
        this._logger.info(message);
    }

    public debug(message: string): void {
        this._logger.debug(message);
    }

    public error(message: string): void {
        this._logger.error(message);
    }
}

export let logger = new Logger();