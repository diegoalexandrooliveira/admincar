"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const bodyParserGraphQl = require("body-parser-graphql");
const routes = require("../routes/index");
const passport = require("passport");
const index_1 = require("../auth/index");
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const graphql_1 = require("../graphql");
const apollo_server_express_1 = require("apollo-server-express");
const expressFileUpload = require("express-fileupload");
const configs_1 = require("../config/configs");
class CustomExpress {
    constructor() {
        this._express = express();
        this.middlewares();
        this.privateRoutes();
        this.publicRoutes();
    }
    middlewares() {
        this._express.use(helmet());
        this._express.use(cors({
            methods: "*",
            origin: "*"
        }));
        this._express.use(bodyParser.json());
        this._express.use(bodyParserGraphQl.graphql());
        this._express.use(bodyParser.urlencoded({ extended: false }));
        this._express.use(passport.initialize());
        index_1.PassportStrategy.initialize(passport);
        this._passportMiddleware = passport.authenticate("jwt", { session: false });
        this._express.use(compression({ threshold: 0 }));
        this._express.use(expressFileUpload());
    }
    privateRoutes() {
        this._express.use("/api/graphql", this._passportMiddleware, apollo_server_express_1.graphqlExpress({ schema: graphql_1.GraphQlSchemaFactory.createSchema() }));
        this._express.get("/api/autenticacao", this._passportMiddleware, (req, res) => res.status(200).send("ok"));
        this._express.use("/api/uploadFile", this._passportMiddleware, routes.uploadFile);
    }
    publicRoutes() {
        this._express.use("/api/v1/public/autenticar", routes.autenticacao);
        this._express.use("/public/images", express.static(configs_1.configs.local.path + "public"));
        this._express.use("/api/v1/public/graphql", apollo_server_express_1.graphqlExpress({ schema: graphql_1.GraphQlPublicSchemaFactory.createSchema() }));
    }
    getExpress() {
        return this._express;
    }
}
exports.CustomExpress = CustomExpress;
//# sourceMappingURL=custom.express.js.map