import { Strategy, ExtractJwt, StrategyOptions, VerifiedCallback } from "passport-jwt";
import * as passport from "passport";
import { configs } from "../config/configs";
import { Mensagem, Usuario } from "../model";
import * as moment from "moment";
import { UsuarioDAO } from "../dao";


export class PassportStrategy {
    public static initialize(passport: passport.PassportStatic) {
        let opcoesEstrategia: StrategyOptions = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configs.JWT.secret
        };

        let funcaoDeVerificacao: VerifiedCallback = (jwt_payload, done) => {
            if (!jwt_payload.usuario) {
                return done(null, false);
            }
            if (!jwt_payload.expires) {
                return done(null, false);
            }
            if (jwt_payload.expires < Date.now()) {
                return done(null, false);
            }
            UsuarioDAO.buscaUsuario(jwt_payload.usuario)
                .then((usuario: Usuario) => {
                    if (!usuario.$usuario) {
                        return done(null, false);
                    }
                    done(null, jwt_payload.usuario);
                })
                .catch((error: Mensagem) => {
                    done(new Error("Problema de conexão ao tentar validar o token."));
                });
        };


        passport.use(new Strategy(opcoesEstrategia, funcaoDeVerificacao));
    }
}