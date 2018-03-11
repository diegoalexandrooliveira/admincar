import { Usuario, Mensagem } from "../model/index";
import { clientFactory } from "../database/index";
import { QueryResult, Client, Query } from "pg";
import { logger } from "../utils";

export class UsuarioDAO {
  public static buscaUsuario(usuario: string): Promise<Usuario> {
    let query = `select usuario, senha from usuario where usuario = $1`;

    return new Promise((resolve, reject) => {
      clientFactory
        .query(query, [usuario])
        .then((result: QueryResult) => {
          let user = new Usuario();
          if (result.rowCount > 0) {
            user.$usuario = result.rows[0].usuario;
            user.$senha = result.rows[0].senha;
          }
          resolve(user);
        })
        .catch(error => {
          logger.error(`usuario.dao.buscaUsuario - ${error}`);
          reject(`Erro ao tentar recuperar o usuário ${usuario}`);
        });
    });
  }

  public static buscaTodosUsuarios(): Promise<Usuario[]> {
    let query = `select usuario, senha from usuario order by usuario`;

    return new Promise((resolve, reject) => {
      clientFactory
        .query(query, [])
        .then((result: QueryResult) => {
          let usuarios: Usuario[];
          if (result.rowCount > 0) {
            usuarios = result.rows.map(
              usuario => new Usuario(usuario.usuario, usuario.senha)
            );
          }
          resolve(usuarios);
        })
        .catch(error => {
          logger.error(`usuario.dao.buscaTodosUsuarios - ${error}`);
          reject(`Erro ao tentar recuperar os usuários`);
        });
    });
  }

  public static inserirUsuario(
    client: Client,
    usuario: Usuario
  ): Promise<number> {
    let insert = `insert into usuario (usuario, senha) values ($1, $2)`;

    return new Promise((resolve, reject) => {
      client
        .query("BEGIN")
        .then((begin: QueryResult) => {
          return;
        })
        .then(() => client.query(insert, [usuario.$usuario, usuario.$senha]))
        .then((result: QueryResult) => {
          resolve(result.rowCount);
        })
        .catch(error => {
          logger.error(`usuario.dao.inserirUsuario - ${error}`);
          reject(`Erro ao inserir o usuário ${usuario.$usuario}`);
        });
    });
  }

  public static alterarUsuario(
    client: Client,
    usuario: Usuario
  ): Promise<number> {
    let update = `update usuario set senha = $1 where usuario = $2`;

    return new Promise((resolve, reject) => {
      client
        .query("BEGIN")
        .then((begin: QueryResult) => {
          return;
        })
        .then(() => client.query(update, [usuario.$senha, usuario.$usuario]))
        .then((result: QueryResult) => {
          resolve(result.rowCount);
        })
        .catch(error => {
          logger.error(`usuario.dao.alterarUsuario - ${error}`);
          reject(`Erro ao atualizar o usuário ${usuario.$usuario}`);
        });
    });
  }

  public static excluirUsuario(
    client: Client,
    usuario: string
  ): Promise<number> {
    let sqlDelete = `delete from usuario where usuario = $1`;

    return new Promise((resolve, reject) => {
      client
        .query("BEGIN")
        .then((begin: QueryResult) => {
          return;
        })
        .then(() => client.query(sqlDelete, [usuario]))
        .then((result: QueryResult) => {
          resolve(result.rowCount);
        })
        .catch(error => {
          logger.error(`usuario.dao.excluirUsuario - ${error}`);
          reject(`Erro ao excluir o usuário ${usuario}`);
        });
    });
  }
}
