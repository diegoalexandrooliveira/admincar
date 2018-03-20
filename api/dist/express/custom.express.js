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
    }
    privateRoutes() {
        this._express.use("/api/graphql", this._passportMiddleware, apollo_server_express_1.graphqlExpress({ schema: graphql_1.GraphQlSchemaFactory.createSchema() }));
        this._express.use("/api/graphiql", this._passportMiddleware, apollo_server_express_1.graphiqlExpress({ endpointURL: "/api/graphql" }));
        this._express.get("/api/autenticacao", this._passportMiddleware, (req, res) => res.status(200).send("ok"));
    }
    publicRoutes() {
        this._express.use("/api/v1/public/autenticar", routes.autenticacao);
        this._express.use("/public/images", express.static("./dist/public"));
    }
    getExpress() {
        return this._express;
    }
}
exports.CustomExpress = CustomExpress;
//# sourceMappingURL=custom.express.js.map