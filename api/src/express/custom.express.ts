import * as express from "express";
import { logger } from "../utils/index";
import * as bodyParser from "body-parser";
import * as bodyParserGraphQl from "body-parser-graphql";
import * as routes from "../routes/index";
import * as passport from "passport";
import { PassportStrategy } from "../auth/index";
import * as compression from "compression";
import * as cors from "cors";
import * as helmet from "helmet";
import { GraphQlSchemaFactory, GraphQlPublicSchemaFactory } from "../graphql";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
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
      graphqlExpress({ schema: GraphQlSchemaFactory.createSchema() })
    );

    this._express.get(
      "/api/autenticacao",
      this._passportMiddleware,
      (req, res) => res.status(200).send("ok")
    );
    this._express.use(
      "/api/uploadFile",
      this._passportMiddleware,
      routes.uploadFile
    );
  }

  private publicRoutes(): void {
    this._express.use("/api/v1/public/autenticar", routes.autenticacao);
    this._express.use(
      "/public/images",
      express.static(configs.local.path + "public")
    );
    this._express.use(
      "/api/v1/public/graphql",
      graphqlExpress({ schema: GraphQlPublicSchemaFactory.createSchema() })
    );
  }

  public getExpress(): express.Express {
    return this._express;
  }
}
