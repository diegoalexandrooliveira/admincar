import { Usuario, Mensagem } from "../model/index";
import { clientFactory } from "../database/index";
import { QueryResult, Client, Query } from "pg";
import { logger } from "../utils";


export class UsuarioDAO {



    public static buscaUsuario(usuario: string): Promise<Usuario> {
        let query = `select usuario, senha from usuario where usuario = $1`;

        return new Promise((resolve, reject) => {

            clientFactory.query(query, [usuario])
                .then((result: QueryResult) => {
                    let user = new Usuario();
                    if (result.rowCount > 0) {
                        user.$usuario = result.rows[0].usuario;
                        user.$senha = result.rows[0].senha;
                    }
                    resolve(user);
                })
                .catch((error) => {
                    logger.error(`usuario.dao.buscaUsuario - ${error}`);
                    reject(new Mensagem(`Erro ao tentar recuperar o usuário ${usuario}`, "erro"));
                });
        });
    }

    public static inserirUsuario(client: Client, usuario: Usuario): Promise<number> {

        let insert = `insert into usuario (usuario, senha) values ($1, $2)`;

        return new Promise((resolve, reject) => {
            client.query("BEGIN")
                .then((begin: QueryResult) => {
                    return;
                })
                .then(() =>
                    client.query(insert, [usuario.$usuario, usuario.$senha]))
                .then((result: QueryResult) => {
                    resolve(result.rowCount);
                })
                .catch(error => {
                    logger.error(`usuario.dao.inserirUsuario - ${error}`);
                    reject(new Mensagem(`Erro ao inserir o usuário ${usuario.$usuario}`, "erro"));
                });
        });
    }
}