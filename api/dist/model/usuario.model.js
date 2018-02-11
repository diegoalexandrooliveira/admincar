"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const index_1 = require("./index");
const index_2 = require("../dao/index");
class Usuario {
    constructor($usuario, $senha) {
        this.usuario = $usuario;
        this.senha = $senha;
    }
    get $usuario() {
        return this.usuario;
    }
    set $usuario(value) {
        this.usuario = value;
    }
    get $senha() {
        return this.senha;
    }
    set $senha(value) {
        this.senha = value;
    }
    encodeSenha() {
        if (this.senha) {
            let salt = bcrypt.genSaltSync(10);
            this.$senha = bcrypt.hashSync(this.$senha, salt);
        }
    }
    validarUsuario(ehInsercao) {
        return new Promise((resolve, reject) => {
            let erros = [];
            if (!this.$usuario) {
                erros.push(new index_1.Mensagem("Usuário não informado.", "erro"));
            }
            else {
                if (this.$usuario.length > 20) {
                    erros.push(new index_1.Mensagem("Tamanho do usuário deve ser de no máximo 20 caracteres.", "erro"));
                }
            }
            if (!this.$senha) {
                erros.push(new index_1.Mensagem("Senha não informada", "erro"));
            }
            if (!ehInsercao || !this.$usuario) {
                resolve(erros);
            }
            else {
                index_2.UsuarioDAO.buscaUsuario(this.$usuario)
                    .then((usuarioEncontrado) => {
                    if (usuarioEncontrado.$usuario) {
                        erros.push(new index_1.Mensagem(`Usuário ${this.$usuario} já cadastrado.`, "erro"));
                    }
                    resolve(erros);
                })
                    .catch(error => {
                    reject(error);
                });
            }
        });
    }
}
exports.Usuario = Usuario;
//# sourceMappingURL=usuario.model.js.map