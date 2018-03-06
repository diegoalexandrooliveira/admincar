import { clientFactory } from "../database/index";
import { QueryResult } from "pg";
import { ChartComparativo } from "../model/index";
import { logger } from "../utils";

export class ChartDAO {
  public static comparativoMesAnoVendidosEAdquiridos(): Promise<
    ChartComparativo[]
  > {
    let query = `select dados.mes_ano, dados.adquiridos, dados.vendidos, to_date('01/' || dados.mes_ano, 'DD/MM/YYYY') dia_mes_ano
    from (select coalesce(aquisicao.mes, venda.mes) mes_ano, coalesce(aquisicao.quantidade, 0) adquiridos,coalesce(venda.quantidade, 0) vendidos
    from
    (select to_char(data_aquisicao, 'MM/YYYY') mes, count(*) quantidade from veiculo where data_aquisicao is not null group by to_char(data_aquisicao, 'MM/YYYY')) aquisicao
    full outer join
    (select to_char(data_venda, 'MM/YYYY') mes, count(*) quantidade from veiculo where data_venda is not null group by to_char(data_venda, 'MM/YYYY')) venda on aquisicao.mes = venda.mes) dados
    order by dia_mes_ano`;
    return new Promise((resolve, reject) => {
      clientFactory
        .query(query)
        .then((result: QueryResult) => {
          let retorno: ChartComparativo[];
          if (result.rowCount > 0) {
            retorno = [];
            result.rows.map(row =>
              retorno.push(
                new ChartComparativo(row.mes_ano, row.adquiridos, row.vendidos)
              )
            );
          }
          resolve(retorno);
        })
        .catch(error => {
          logger.error(
            `chart.dao.comparativoMesAnoVendidosEAdquiridos - ${error}`
          );
          reject(
            `Erro ao tentar recuperar as informações para o gráfico "Comparativo entre vendidos e adquiridos".`
          );
        });
    });
  }
}
