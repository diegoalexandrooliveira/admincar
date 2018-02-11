import * as bcrypt from "bcrypt";
import { Mensagem } from "./index";
import { UsuarioDAO } from "../dao/index";

export class Usuario {
    private usuario: string;
    private senha: string;


    constructor($usuario?: string, $senha?: string) {
        this.usuario = $usuario;
        this.senha = $senha;
    }

    public get $usuario(): string {
        return this.usuario;
    }

    public set $usuario(value: string) {
        this.usuario = value;
    }

    public get $senha(): string {
        return this.senha;
    }

    public set $senha(value: string) {
        this.senha = value;
    }

    public encodeSenha(): void {
        if (this.senha) {
            let salt: string = bcrypt.genSaltSync(10);
            this.$senha = bcrypt.hashSync(this.$senha, salt);
        }
    }

    public validarUsuario(ehInsercao: boolean): Promise<Mensagem[]> {
        return new Promise((resolve, reject) => {
            let erros: Mensagem[] = [];

            if (!this.$usuario) {
                erros.push(new Mensagem("Usuário não informado.", "erro"));
            } else {
                if (this.$usuario.length > 20) {
                    erros.push(new Mensagem("Tamanho do usuário deve ser de no máximo 20 caracteres.", "erro"));
                }
            }
            if (!this.$senha) {
                erros.push(new Mensagem("Senha não informada", "erro"));
            }
            if (!ehInsercao || !this.$usuario) {
                resolve(erros);
            } else {
                UsuarioDAO.buscaUsuario(this.$usuario)
                    .then((usuarioEncontrado: Usuario) => {
                        if (usuarioEncontrado.$usuario) {
                            erros.push(new Mensagem(`Usuário ${this.$usuario} já cadastrado.`, "erro"));
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