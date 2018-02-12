"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const configs_1 = require("../config/configs");
const dao_1 = require("../dao");
class PassportStrategy {
    static initialize(passport) {
        let opcoesEstrategia = {
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configs_1.configs.JWT.secret
        };
        let funcaoDeVerificacao = (jwt_payload, done) => {
            if (!jwt_payload.usuario) {
                return done(null, false);
            }
            if (!jwt_payload.expires) {
                return done(null, false);
            }
            if (jwt_payload.expires < Date.now()) {
                return done(null, false);
            }
            dao_1.UsuarioDAO.buscaUsuario(jwt_payload.usuario)
                .then((usuario) => {
                if (!usuario.$usuario) {
                    return done(null, false);
                }
                done(null, jwt_payload.usuario);
            })
                .catch((error) => {
                done(new Error("Problema de conexão ao tentar validar o token."));
            });
        };
        passport.use(new passport_jwt_1.Strategy(opcoesEstrategia, funcaoDeVerificacao));
    }
}
exports.PassportStrategy = PassportStrategy;
//# sourceMappingURL=passport.strategy.js.map