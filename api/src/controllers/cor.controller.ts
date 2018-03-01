import { MarcaDAO } from "../dao/index";
import { cores } from "../cache/index";
export class CorController {
  public static getType(): string {
    return `type Cor { id: Int, descricao: String }`;
  }

  public static getQueries(): string {
    return `cores: [Cor]
            cor(id: Int): Cor`;
  }

  public static getQueryResolvers(): Object {
    return {
      cores: () => cores(),
      cor: (root, args) => cores()[args.id - 1]
    };
  }

  public static getResolvers(): Object {
    return {};
  }
}
