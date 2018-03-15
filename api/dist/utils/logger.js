"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
const fs = require("fs");
class Logger {
    constructor() {
        this._folderLog = "logs";
        this._debug = {
            name: "debug-file",
            level: "debug",
            filename: this._folderLog + "/debug/admincar-api.log",
            maxsize: 100000,
            maxFiles: 3
        };
        this._info = {
            name: "info-file",
            level: "info",
            filename: this._folderLog + "/info/admincar-api.log",
            maxsize: 100000,
            maxFiles: 3
        };
        this._error = {
            name: "error-file",
            level: "error",
            filename: this._folderLog + "/error/admincar-api.log",
            maxsize: 100000,
            maxFiles: 20
        };
        this.checkFolders();
        this._logger = new winston.Logger({
            transports: [
                new winston.transports.File(this._debug),
                new winston.transports.File(this._info),
                new winston.transports.File(this._error)
            ]
        });
    }
    checkFolders() {
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
    info(message) {
        this._logger.info(message);
    }
    debug(message) {
        this._logger.debug(message);
    }
    error(message) {
        this._logger.error(message);
    }
}
exports.logger = new Logger();
//# sourceMappingURL=logger.js.map