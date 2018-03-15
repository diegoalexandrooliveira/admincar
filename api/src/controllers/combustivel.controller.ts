import { MarcaDAO } from "../dao/index";
import { combustiveis } from "../cache/index";
export class CombustivelController {
  public static getType(): string {
    return `type Combustivel { id: Int, descricao: String }`;
  }

  public static getQueries(): string {
    return `combustiveis: [Combustivel]
            combustivel(id: Int): Combustivel`;
  }

  public static getQueryResolvers(): Object {
    return {
      combustiveis: () => combustiveis(),
      combustivel: (root, args) => combustiveis()[args.id - 1]
    };
  }

  public static getResolvers(): Object {
    return {};
  }
}
