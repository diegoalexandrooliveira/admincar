import { UsuarioDAO } from "../dao/index";
import { Usuario, Mensagem } from "../model/index";
import { clientFactory } from "../database";
import { Client } from "pg";
export class UsuarioController {
  public static getType(): string {
    return `type Usuario { usuario: String, senha: String }
            input UsuarioInput { usuario: String, senha: String }`;
  }

  public static getQueries(): string {
    return `usuarios: [Usuario]
            usuario(usuario: String): Usuario`;
  }

  public static getMutations(): string {
    return `inserirUsuario(usuario: UsuarioInput): Usuario
    alterarUsuario(usuario: UsuarioInput): Usuario
    excluirUsuario(usuario: String): Boolean`;
  }

  public static getQueryResolvers(): Object {
    return {
      usuarios: () => UsuarioDAO.buscaTodosUsuarios(),
      usuario: (root, args) => UsuarioDAO.buscaUsuario(args.usuario)
    };
  }

  public static getMutationsResolvers(): Object {
    return {
      inserirUsuario: this.inserirUsuario,
      alterarUsuario: this.alterarUsuario,
      excluirUsuario: this.excluirUsuario
    };
  }

  public static getResolvers(): Object {
    return {};
  }

  private static inserirUsuario(root, args): Promise<Usuario> {
    return new Promise((resolve, reject) => {
      let usuario: Usuario = new Usuario();
      if (args.usuario) {
        if (args.usuario.usuario) {
          usuario.$usuario = args.usuario.usuario;
        }
        if (args.usuario.senha) {
          usuario.$senha = args.usuario.senha;
        }
      }
      usuario.validaUsuario(true).then((erros: Mensagem[]) => {
        if (erros.length > 0) {
          reject(JSON.stringify(erros));
        } else {
          clientFactory.getClient().then((client: Client) => {
            usuario.codificaSenha();
            UsuarioDAO.inserirUsuario(client, usuario)
              .then(valor => clientFactory.commit(client))
              .then(() => resolve(usuario))
              .catch(erro => reject(erro));
          });
        }
      });
    });
  }

  private static alterarUsuario(root, args): Promise<Usuario> {
    return new Promise((resolve, reject) => {
      let usuario: Usuario = new Usuario();
      if (args.usuario) {
        if (args.usuario.usuario) {
          usuario.$usuario = args.usuario.usuario;
        }
        if (args.usuario.senha) {
          usuario.$senha = args.usuario.senha;
        }
      }
      usuario.validaUsuario(false).then((erros: Mensagem[]) => {
        if (erros.length > 0) {
          reject(JSON.stringify(erros));
        } else {
          clientFactory.getClient().then((client: Client) => {
            usuario.codificaSenha();
            UsuarioDAO.alterarUsuario(client, usuario)
              .then(rows => {
                clientFactory.commit(client);
                return rows;
              })
              .then(rows => {
                if (rows) {
                  resolve(usuario);
                } else {
                  reject(
                    JSON.stringify(
                      Array.of(
                        new Mensagem("Nenhum usuário atualizado.", "warn")
                      )
                    )
                  );
                }
              })
              .catch(erro => reject(erro));
          });
        }
      });
    });
  }

  private static excluirUsuario(root, args): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (args.usuario === "admin") {
        return reject(
          JSON.stringify(
            Array.of(
              new Mensagem("Não é possível excluir o usuário admin.", "erro")
            )
          )
        );
      }
      clientFactory.getClient().then((client: Client) => {
        UsuarioDAO.excluirUsuario(client, args.usuario)
          .then(rows => {
            clientFactory.commit(client);
            return rows;
          })
          .then(rows => {
            if (rows) {
              return resolve(true);
            } else {
              return reject(
                JSON.stringify(
                  Array.of(new Mensagem("Nenhum usuário removido.", "warn"))
                )
              );
            }
          })
          .catch(erro => reject(erro));
      });
    });
  }
}
