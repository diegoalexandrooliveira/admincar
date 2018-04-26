import { opcionais } from "../cache/index";
export class OpcionalController {
  public static getType(): string {
    return `type Opcional { id: Int, descricao: String }`;
  }

  public static getQueries(): string {
    return `opcionais: [Opcional]
            opcional(id: Int): Opcional`;
  }

  public static getQueryResolvers(): Object {
    return {
      opcionais: () => opcionais(),
      opcional: (root, args) => opcionais()[args.id - 1]
    };
  }

  public static getResolvers(): Object {
    return {};
  }
}
