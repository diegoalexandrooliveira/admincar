import * as express from "express";
import { logger } from "../utils/index";
import * as bodyParser from "body-parser";
import * as bodyParserGraphQl from "body-parser-graphql";
import * as routes from "../routes/index";
import * as passport from "passport";
import * as jwt from "jwt-simple";
import { PassportStrategy } from "../auth/index";
import * as moment from "moment";
import * as compression from "compression";
import * as cors from "cors";
import * as helmet from "helmet";
import { GraphQlSchemaFactory } from "../graphql";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
// import { apolloUploadExpress } from "apollo-upload-server";
import * as expressFileUpload from "express-fileupload";
import { configs } from "../config/configs";

export class CustomExpress {
  private _express: express.Express;
  private _passportMiddleware;

  constructor() {
    this._express = express();
    this.middlewares();
    this.privateRoutes();
    this.publicRoutes();
  }

  private middlewares(): void {
    this._express.use(helmet());
    this._express.use(
      cors({
        methods: "*",
        origin: "*"
      })
    );
    this._express.use(bodyParser.json());
    this._express.use(bodyParserGraphQl.graphql());
    this._express.use(bodyParser.urlencoded({ extended: false }));
    this._express.use(passport.initialize());
    PassportStrategy.initialize(passport);
    this._passportMiddleware = passport.authenticate("jwt", { session: false });
    this._express.use(compression({ threshold: 0 }));
    this._express.use(expressFileUpload());
  }

  private privateRoutes(): void {
    this._express.use(
      "/api/graphql",
      this._passportMiddleware,
      // apolloUploadExpress({ uploadDir: "./" }),
      graphqlExpress({ schema: GraphQlSchemaFactory.createSchema() })
    );

    // this._express.use(
    //   "/api/graphiql",
    //   this._passportMiddleware,
    //   graphiqlExpress({ endpointURL: "/api/graphql" })
    // );

    this._express.get(
      "/api/autenticacao",
      this._passportMiddleware,
      (req, res) => res.status(200).send("ok")
    );
  }

  private publicRoutes(): void {
    this._express.use("/api/v1/public/autenticar", routes.autenticacao);
    this._express.use("/public/images", express.static("./dist/public"));
    this._express.use("/public/upload", (req, res) => {
      if (!req.files) return res.status(400).send("No files were uploaded.");
      let sampleFile = req.files.sampleFile;

      var tinify = require("tinify");
      tinify.key = configs.TinyPNG.apiKey;
      tinify
        // @ts-ignore
        .fromBuffer(sampleFile.data)
        .resize({
          method: "scale",
          width: 800
        })
        .toBuffer()
        .then(resultData => {
          let cloudinary = require("cloudinary");
          cloudinary.config({
            cloud_name: configs.Cloudinary.cloudName,
            api_key: configs.Cloudinary.apiKey,
            api_secret: configs.Cloudinary.apiSecret
          });
          let imagem = `data:image/jpeg;base64,${resultData.toString(
            "base64"
          )}`;

          cloudinary.uploader
            .upload(imagem, { quality: "auto" })
            .then(result => {
              console.log(result);
              return res.json(result);
            });
        });
    });

    this._express.use("/public/upload2", (req, res) => {
      if (!req.files) return res.status(400).send("No files were uploaded.");
      let sampleFile = req.files.sampleFile;

      let cloudinary = require("cloudinary");
      cloudinary.config({
        cloud_name: configs.Cloudinary.cloudName,
        api_key: configs.Cloudinary.apiKey,
        api_secret: configs.Cloudinary.apiSecret
      });
      //@ts-ignore
      let imagem = `data:image/jpeg;base64,${sampleFile.data.toString(
        "base64"
      )}`;

      cloudinary.v2.uploader
        .upload(imagem, { width: 800, crop: "scale" })
        .then(result => {
          return res.json(result);
        });
    });
  }

  public getExpress(): express.Express {
    return this._express;
  }
}
