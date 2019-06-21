"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../database/index");
const index_2 = require("../model/index");
const utils_1 = require("../utils");
class VeiculoDAO {
    static buscarVeiculoPorId(idVeiculo, disponiveis) {
        return new Promise((resolve, reject) => {
            VeiculoDAO.buscarVeiculos(idVeiculo, disponiveis)
                .then((veiculos) => resolve(veiculos[0]))
                .catch((erro) => reject(erro));
        });
    }
    static buscarTodosVeiculos() {
        return VeiculoDAO.buscarVeiculos();
    }
    static buscarTodosVeiculosDisponiveisAleatoriamenteLimitados() {
        let query = `select id, modelo_id, ano_fabricacao, ano_modelo, placa, renavam, chassi, cor_id,
    cidade_id, data_inclusao, data_aquisicao, data_venda, valor_compra, valor_venda, valor_anunciado, observacoes,
    combustivel_id                    
    from veiculo where data_venda is null order by random() limit 5`;
        return new Promise((resolve, reject) => {
            index_1.clientFactory
                .query(query)
                .then((result) => {
                let retorno = [];
                if (result.rows.length > 0) {
                    result.rows.map(row => {
                        retorno.push(new index_2.Veiculo(row.id, row.modelo_id, row.ano_fabricacao, row.ano_modelo, row.placa, row.renavam, row.chassi, row.cor_id, row.cidade_id, row.data_inclusao, row.data_aquisicao, row.data_venda, row.valor_compra, row.valor_venda, row.valor_anunciado, row.observacoes, row.combustivel_id));
                    });
                }
                resolve(retorno);
            })
                .catch(error => {
                utils_1.logger.error(`veiculo.dao.buscarTodosVeiculosDisponiveisAleatoriamenteLimitados - ${error}`);
                reject("Erro ao tentar recuperar os veículos.");
            });
        });
    }
    static buscarTodosVeiculosDisponiveis(procurar) {
        let whereProcurar = "";
        let parametros = [];
        if (procurar) {
            whereProcurar = ` and (
        UPPER(ma.descricao) like '%' || UPPER($1) || '%' OR
        UPPER(m.descricao) like '%' || UPPER($2) || '%' OR
        UPPER(m.descricao) like '%' || UPPER($3) || '%' OR
        UPPER(c.descricao) like '%' || UPPER($4) || '%' OR
        UPPER(co.descricao) like '%' || UPPER($5) || '%' OR
        UPPER(TO_CHAR(v.ano_fabricacao, '9999')) like '%' || UPPER($6) || '%' OR
        UPPER(TO_CHAR(v.ano_modelo, '9999')) like '%' || UPPER($7) || '%'
      ) `;
            parametros.push(procurar);
            parametros.push(procurar);
            parametros.push(procurar);
            parametros.push(procurar);
            parametros.push(procurar);
            parametros.push(procurar);
            parametros.push(procurar);
        }
        let query = `select v.id, v.modelo_id, v.ano_fabricacao, v.ano_modelo, v.cor_id,
    v.valor_anunciado,  v.combustivel_id                    
    from veiculo v inner join (modelo m inner join marca ma on m.marca_id = ma.id) on v.modelo_id = m.id
    inner join cor c on v.cor_id = c.id left outer join combustivel co on v.combustivel_id = co.id
    where v.data_venda is null ${whereProcurar} order by ma.descricao, m.descricao asc`;
        return new Promise((resolve, reject) => {
            index_1.clientFactory
                .query(query, parametros)
                .then((result) => {
                let retorno = [];
                if (result.rows.length > 0) {
                    result.rows.map(row => {
                        retorno.push(new index_2.Veiculo(row.id, row.modelo_id, row.ano_fabricacao, row.ano_modelo, null, null, null, row.cor_id, null, null, null, null, null, null, row.valor_anunciado, null, row.combustivel_id));
                    });
                }
                resolve(retorno);
            })
                .catch(error => {
                utils_1.logger.error(`veiculo.dao.buscarTodosVeiculosDisponiveis - ${error}`);
                reject("Erro ao tentar recuperar os veículos.");
            });
        });
    }
    static buscarVeiculos(idVeiculo, disponiveis) {
        let query = `select id, modelo_id, ano_fabricacao, ano_modelo, placa, renavam, chassi, cor_id,
    cidade_id, data_inclusao, data_aquisicao, data_venda, valor_compra, valor_venda, valor_anunciado, observacoes,
    combustivel_id                    
    from veiculo `;
        let parameters = [];
        let where = '';
        if (idVeiculo) {
            parameters.push(idVeiculo);
            where = ` where id = $1 `;
        }
        if (disponiveis) {
            where = where ? ` ${where} and ` : ` where `;
            where = `${where} data_venda is null `;
        }
        query = `${query} ${where} order by id `;
        return new Promise((resolve, reject) => {
            index_1.clientFactory
                .query(query, parameters)
                .then((result) => {
                let retorno = [];
                if (result.rows.length > 0) {
                    result.rows.map(row => {
                        retorno.push(new index_2.Veiculo(row.id, row.modelo_id, row.ano_fabricacao, row.ano_modelo, row.placa, row.renavam, row.chassi, row.cor_id, row.cidade_id, row.data_inclusao, row.data_aquisicao, row.data_venda, row.valor_compra, row.valor_venda, row.valor_anunciado, row.observacoes, row.combustivel_id));
                    });
                }
                resolve(retorno);
            })
                .catch(error => {
                utils_1.logger.error(`veiculo.dao.buscarTodosVeiculos - ${error}`);
                reject("Erro ao tentar recuperar os veículos.");
            });
        });
    }
    static inserirVeiculo(client, veiculo) {
        let insert = `INSERT INTO veiculo(
      modelo_id, ano_fabricacao, ano_modelo, placa, renavam, chassi, 
      cidade_id, data_inclusao, valor_compra, valor_anunciado, valor_venda, 
      data_venda, observacoes, data_aquisicao, cor_id, combustivel_id)
      VALUES ($1, $2, $3, $4, $5, $6, 
        $7, $8, $9, $10, $11, 
        $12, $13, $14, $15, $16) returning id`;
        return new Promise((resolve, reject) => {
            client
                .query("BEGIN")
                .then((begin) => {
                return;
            })
                .then(() => client.query(insert, [
                veiculo.$modelo_id,
                veiculo.$anoFabricacao,
                veiculo.$anoModelo,
                veiculo.$placa,
                veiculo.$renavam,
                veiculo.$chassi,
                veiculo.$cidade_id,
                veiculo.$dataInclusao,
                veiculo.$valorCompra,
                veiculo.$valorAnuncio,
                veiculo.$valorVenda,
                veiculo.$dataVenda,
                veiculo.$observacoes,
                veiculo.$dataAquisicao,
                veiculo.$cor_id,
                veiculo.$combustivel_id
            ]))
                .then((result) => resolve(result.rows[0].id))
                .catch(error => {
                utils_1.logger.error(`veiculo.dao.inserirVeiculo - ${error}`);
                reject(new index_2.Mensagem(`Erro ao inserir o veículo.`, "erro"));
            });
        });
    }
    static atualizarVeiculo(client, veiculo) {
        let update = `UPDATE veiculo
    SET modelo_id=$1, ano_fabricacao=$2, ano_modelo=$3, placa=$4, renavam=$5, 
        chassi=$6, cidade_id=$7, valor_compra=$8, valor_anunciado=$9, 
        valor_venda=$10, data_venda=$11, observacoes=$12, data_aquisicao=$13, 
        cor_id=$14, combustivel_id=$15
  WHERE id = $16`;
        return new Promise((resolve, reject) => {
            client
                .query("BEGIN")
                .then((begin) => {
                return;
            })
                .then(() => client.query(update, [
                veiculo.$modelo_id,
                veiculo.$anoFabricacao,
                veiculo.$anoModelo,
                veiculo.$placa,
                veiculo.$renavam,
                veiculo.$chassi,
                veiculo.$cidade_id,
                veiculo.$valorCompra,
                veiculo.$valorAnuncio,
                veiculo.$valorVenda,
                veiculo.$dataVenda,
                veiculo.$observacoes,
                veiculo.$dataAquisicao,
                veiculo.$cor_id,
                veiculo.$combustivel_id,
                veiculo.$id
            ]))
                .then((result) => {
                resolve(result.rowCount);
            })
                .catch(error => {
                utils_1.logger.error(`veiculo.dao.atualizarVeiculo - ${error}`);
                reject(new index_2.Mensagem(`Erro ao atualizar o veículo ${veiculo.$id}.`, "erro"));
            });
        });
    }
    static deletarVeiculo(client, idVeiculo) {
        let deleteQ = `DELETE FROM veiculo WHERE id = $1`;
        return new Promise((resolve, reject) => {
            client
                .query("BEGIN")
                .then((begin) => {
                return;
            })
                .then(() => client.query(deleteQ, [idVeiculo]))
                .then((result) => {
                resolve(result.rowCount);
            })
                .catch(error => {
                utils_1.logger.error(`veiculo.dao.deletarVeiculo - ${error}`);
                reject(new index_2.Mensagem(`Erro ao deletar o veículo ${idVeiculo}.`, "erro"));
            });
        });
    }
}
exports.VeiculoDAO = VeiculoDAO;
//# sourceMappingURL=veiculo.dao.js.map