import * as express from "express";
import * as bodyParser from "body-parser";
import * as bodyParserGraphQl from "body-parser-graphql";
import * as routes from "../routes/index";
import * as passport from "passport";
import { PassportStrategy } from "../auth/index";
import * as compression from "compression";
import * as cors from "cors";
import * as helmet from "helmet";
import { GraphQlSchemaFactory, GraphQlPublicSchemaFactory } from "../graphql";
import { ApolloServer } from "apollo-server-express";
import * as expressFileUpload from "express-fileupload";
import * as path from "path";

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
    const graphql = new ApolloServer({ schema: GraphQlSchemaFactory.createSchema() });
    this._express.use("/api/graphql", this._passportMiddleware);
    graphql.applyMiddleware({
      path: "/api/graphql", app: this._express
    });

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
      express.static( path.join(__dirname, "..", "/public"))
    );
    const graphql = new ApolloServer({ schema: GraphQlPublicSchemaFactory.createSchema() });
    graphql.applyMiddleware({
      path: "/api/v1/public/graphql", app: this._express
    });
  }

  public getExpress(): express.Express {
    return this._express;
  }
}
