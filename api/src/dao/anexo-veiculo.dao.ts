import { Mensagem, AnexoVeiculo } from "../model/index";
import { clientFactory } from "../database/index";
import { QueryResult, Client, Query } from "pg";
import { logger } from "../utils";

export class AnexoVeiculoDAO {
  public static buscaAnexoPrincipalPorVeiculo(
    veiculoId: number
  ): Promise<AnexoVeiculo> {
    let query = `select id, tipo_arquivo, 
    url, principal from anexo_veiculo where veiculo_id = $1 and principal = TRUE`;

    return new Promise((resolve, reject) => {
      clientFactory
        .query(query, [veiculoId])
        .then((result: QueryResult) => {
          let anexo = new AnexoVeiculo();
          if (result.rowCount > 0) {
            anexo.$id = result.rows[0].id;
            anexo.$tipoArquivo = result.rows[0].tipo_arquivo;
            anexo.$url = result.rows[0].url;
            anexo.$principal = result.rows[0].principal;
          }
          resolve(anexo);
        })
        .catch(error => {
          logger.error(
            `anexo-veiculo.dao.buscaAnexoPrincipalPorVeiculo - ${error}`
          );
          reject(`Erro ao tentar recuperar o anexo do veículo ${veiculoId}`);
        });
    });
  }

  // public static buscaTodosUsuarios(): Promise<Usuario[]> {
  //   let query = `select usuario, senha from usuario order by usuario`;

  //   return new Promise((resolve, reject) => {
  //     clientFactory
  //       .query(query, [])
  //       .then((result: QueryResult) => {
  //         let usuarios: Usuario[];
  //         if (result.rowCount > 0) {
  //           usuarios = result.rows.map(
  //             usuario => new Usuario(usuario.usuario, usuario.senha)
  //           );
  //         }
  //         resolve(usuarios);
  //       })
  //       .catch(error => {
  //         logger.error(`usuario.dao.buscaTodosUsuarios - ${error}`);
  //         reject(`Erro ao tentar recuperar os usuários`);
  //       });
  //   });
  // }

  // public static inserirUsuario(
  //   client: Client,
  //   usuario: Usuario
  // ): Promise<number> {
  //   let insert = `insert into usuario (usuario, senha) values ($1, $2)`;

  //   return new Promise((resolve, reject) => {
  //     client
  //       .query("BEGIN")
  //       .then((begin: QueryResult) => {
  //         return;
  //       })
  //       .then(() => client.query(insert, [usuario.$usuario, usuario.$senha]))
  //       .then((result: QueryResult) => {
  //         resolve(result.rowCount);
  //       })
  //       .catch(error => {
  //         logger.error(`usuario.dao.inserirUsuario - ${error}`);
  //         reject(`Erro ao inserir o usuário ${usuario.$usuario}`);
  //       });
  //   });
  // }

  // public static alterarUsuario(
  //   client: Client,
  //   usuario: Usuario
  // ): Promise<number> {
  //   let update = `update usuario set senha = $1 where usuario = $2`;

  //   return new Promise((resolve, reject) => {
  //     client
  //       .query("BEGIN")
  //       .then((begin: QueryResult) => {
  //         return;
  //       })
  //       .then(() => client.query(update, [usuario.$senha, usuario.$usuario]))
  //       .then((result: QueryResult) => {
  //         resolve(result.rowCount);
  //       })
  //       .catch(error => {
  //         logger.error(`usuario.dao.alterarUsuario - ${error}`);
  //         reject(`Erro ao atualizar o usuário ${usuario.$usuario}`);
  //       });
  //   });
  // }

  public static excluirAnexoVeiculo(
    client: Client,
    id: number
  ): Promise<number> {
    let sqlDelete = `delete from anexo_veiculo where id = $1`;

    return new Promise((resolve, reject) => {
      client
        .query("BEGIN")
        .then((begin: QueryResult) => {
          return;
        })
        .then(() => client.query(sqlDelete, [id]))
        .then((result: QueryResult) => resolve(result.rowCount))
        .catch(error => {
          logger.error(`anexo-veiculo.dao.excluirAnexoVeiculo - ${error}`);
          reject(`Erro ao excluir o anexo ${id}`);
        });
    });
  }

  public static excluirTodosAnexoPorVeiculo(
    client: Client,
    veiculoId: number
  ): Promise<number> {
    let sqlDelete = `delete from anexo_veiculo where veiculo_id = $1`;

    return new Promise((resolve, reject) => {
      client
        .query("BEGIN")
        .then((begin: QueryResult) => {
          return;
        })
        .then(() => client.query(sqlDelete, [veiculoId]))
        .then((result: QueryResult) => resolve(result.rowCount))
        .catch(error => {
          logger.error(
            `anexo-veiculo.dao.excluirTodosAnexoPorVeiculo - ${error}`
          );
          reject(`Erro ao excluir os anexos do veículo ${veiculoId}`);
        });
    });
  }
}
