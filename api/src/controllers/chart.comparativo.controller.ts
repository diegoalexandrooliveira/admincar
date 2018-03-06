import { ChartDAO } from "../dao/index";
export class ChartComparativoController {
  public static getType(): string {
    return `type ChartComparativo { mesAno: String, mesDescAno: String, adquiridos: Int, vendidos: Int }`;
  }

  public static getQueries(): string {
    return `comparativo: [ChartComparativo]`;
  }

  public static getQueryResolvers(): Object {
    return {
      comparativo: () => ChartDAO.comparativoMesAnoVendidosEAdquiridos()
    };
  }

  public static getResolvers(): Object {
    return {};
  }
}
