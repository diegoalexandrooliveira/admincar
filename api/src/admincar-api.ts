import { CustomExpress } from "./config/custom.express";
import { Express } from "express";

class AdminCarApi {
    private _port: Number = 8080;
    private _express: Express;

    constructor() {
        this._express = new CustomExpress().getExpress();
        this._express.listen(this._port, () => {
            console.log("API admincar rodando na porta " + this._port);
        });
    }
}
new AdminCarApi();