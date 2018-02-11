"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
class PassportStrategy {
    static initialize(passport) {
        let opts = {
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "123"
        };
        passport.use(new passport_jwt_1.Strategy(opts, (jwt_payload, done) => {
            console.log(jwt_payload);
            done(null, "diego");
        }));
    }
}
exports.PassportStrategy = PassportStrategy;
//# sourceMappingURL=passport.strategy.js.map