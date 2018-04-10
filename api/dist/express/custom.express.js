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
// import { apolloUploadExpress } from "apollo-upload-server";
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
        this._express.use("/api/graphql", this._passportMiddleware, 
        // apolloUploadExpress({ uploadDir: "./" }),
        apollo_server_express_1.graphqlExpress({ schema: graphql_1.GraphQlSchemaFactory.createSchema() }));
        // this._express.use(
        //   "/api/graphiql",
        //   this._passportMiddleware,
        //   graphiqlExpress({ endpointURL: "/api/graphql" })
        // );
        this._express.get("/api/autenticacao", this._passportMiddleware, (req, res) => res.status(200).send("ok"));
    }
    publicRoutes() {
        this._express.use("/api/v1/public/autenticar", routes.autenticacao);
        this._express.use("/public/images", express.static("./dist/public"));
        this._express.use("/public/upload", (req, res) => {
            if (!req.files)
                return res.status(400).send("No files were uploaded.");
            let sampleFile = req.files.sampleFile;
            var tinify = require("tinify");
            tinify.key = configs_1.configs.TinyPNG.apiKey;
            tinify
                .fromBuffer(sampleFile.data)
                .resize({
                method: "scale",
                width: 800
            })
                .toBuffer()
                .then(resultData => {
                let cloudinary = require("cloudinary");
                cloudinary.config({
                    cloud_name: configs_1.configs.Cloudinary.cloudName,
                    api_key: configs_1.configs.Cloudinary.apiKey,
                    api_secret: configs_1.configs.Cloudinary.apiSecret
                });
                let imagem = `data:image/jpeg;base64,${resultData.toString("base64")}`;
                cloudinary.uploader
                    .upload(imagem, { quality: "auto" })
                    .then(result => {
                    console.log(result);
                    return res.json(result);
                });
            });
        });
        this._express.use("/public/upload2", (req, res) => {
            if (!req.files)
                return res.status(400).send("No files were uploaded.");
            let sampleFile = req.files.sampleFile;
            let cloudinary = require("cloudinary");
            cloudinary.config({
                cloud_name: configs_1.configs.Cloudinary.cloudName,
                api_key: configs_1.configs.Cloudinary.apiKey,
                api_secret: configs_1.configs.Cloudinary.apiSecret
            });
            //@ts-ignore
            let imagem = `data:image/jpeg;base64,${sampleFile.data.toString("base64")}`;
            cloudinary.v2.uploader
                .upload(imagem, { width: 800, crop: "scale" })
                .then(result => {
                return res.json(result);
            });
        });
    }
    getExpress() {
        return this._express;
    }
}
exports.CustomExpress = CustomExpress;
//# sourceMappingURL=custom.express.js.map