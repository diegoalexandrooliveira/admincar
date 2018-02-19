"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../database/index");
const index_2 = require("../model/index");
const utils_1 = require("../utils");
class VeiculoDAO {
    static buscarVeiculoPorId(idVeiculo) {
        return new Promise((resolve, reject) => {
            VeiculoDAO.buscarVeiculos(idVeiculo)
                .then((veiculos) => resolve(veiculos[0]))
                .catch((erro) => reject(erro));
        });
    }
    static buscarTodosVeiculos() {
        return VeiculoDAO.buscarVeiculos();
    }
    static buscarVeiculos(idVeiculo) {
        let query = `select v.id, v.modelo_id, mo.descricao as descricaomodelo, ma.id as idmarca, ma.descricao as descricaomarca,
    v.ano_fabricacao, v.ano_modelo, v.placa, v.renavam, v.chassi, v.cor_id as idcor, co.descricao as descricaocor,
    v.cidade_id as idcidade, ci.nome as nomecidade, e.id as idestado, e.nome as nomeestado, e.sigla as siglaestado,
    v.data_inclusao, v.data_aquisicao, v.data_venda, v.valor_compra, v.valor_venda, v.valor_anunciado, v.observacoes,
    v.combustivel_id, com.descricao as descricaocombustivel
                    
    from veiculo v inner join (modelo mo inner join marca ma on mo.marca_id = ma.id ) on v.modelo_id = mo.id
     inner join cor co on v.cor_id = co.id
     left outer join (cidades ci inner join estados e on ci.estado_id = e.id) on v.cidade_id = ci.id
     left outer join combustivel com on v.combustivel_id = com.id`;
        let parameters = [];
        if (idVeiculo) {
            parameters.push(idVeiculo);
            query = query + " where v.id = $1 ";
        }
        query = query + " order by v.id ";
        return new Promise((resolve, reject) => {
            index_1.clientFactory
                .query(query, parameters)
                .then((result) => {
                let retorno;
                if (result.rows.length > 0) {
                    retorno = [];
                    result.rows.map(row => {
                        let veiculo = new index_2.Veiculo();
                        veiculo.$id = row.id;
                        veiculo.$idModelo = row.modelo_id;
                        veiculo.$descricaoModelo = row.descricaomodelo;
                        veiculo.$idMarca = row.idmarca;
                        veiculo.$descricaoMarca = row.descricaomarca;
                        veiculo.$anoFabricacao = row.ano_fabricacao;
                        veiculo.$anoModelo = row.ano_modelo;
                        veiculo.$placa = row.placa;
                        veiculo.$renavam = row.renavam;
                        veiculo.$chassi = row.chassi;
                        veiculo.$idCor = row.idcor;
                        veiculo.$descricaoCor = row.descricaocor;
                        veiculo.$idCidade = row.idcidade;
                        veiculo.$nomeCidade = row.nomecidade;
                        veiculo.$idEstado = row.idestado;
                        veiculo.$nomeEstado = row.nomeestado;
                        veiculo.$siglaEstado = row.siglaestado;
                        veiculo.$dataInclusao = row.data_inclusao;
                        veiculo.$dataAquisicao = row.data_aquisicao;
                        veiculo.$dataVenda = row.data_venda;
                        veiculo.$valorCompra = row.valor_compra;
                        veiculo.$valorVenda = row.valor_venda;
                        veiculo.$valorAnuncio = row.valor_anunciado;
                        veiculo.$observacoes = row.observacoes;
                        veiculo.$idCombustivel = row.combustivel_id;
                        veiculo.$descricaoCombustivel = row.descricaocombustivel;
                        retorno.push(veiculo);
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
      id, modelo_id, ano_fabricacao, ano_modelo, placa, renavam, chassi, 
      cidade_id, data_inclusao, valor_compra, valor_anunciado, valor_venda, 
      data_venda, observacoes, data_aquisicao, cor_id, combustivel_id)
      VALUES (nextval('veiculo_sequence'), $1, $2, $3, $4, $5, $6, 
        $7, $8, $9, $10, $11, 
        $12, $13, $14, $15, $16) returning id`;
        return new Promise((resolve, reject) => {
            client
                .query("BEGIN")
                .then((begin) => {
                return;
            })
                .then(() => client.query(insert, [
                veiculo.$idModelo,
                veiculo.$anoFabricacao,
                veiculo.$anoModelo,
                veiculo.$placa,
                veiculo.$renavam,
                veiculo.$chassi,
                veiculo.$idCidade,
                veiculo.$dataInclusao,
                veiculo.$valorCompra,
                veiculo.$valorAnuncio,
                veiculo.$valorVenda,
                veiculo.$dataVenda,
                veiculo.$observacoes,
                veiculo.$dataAquisicao,
                veiculo.$idCor,
                veiculo.$idCombustivel
            ]))
                .then((result) => {
                veiculo.$id = result.rows[0].id;
                resolve(veiculo);
            })
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
                veiculo.$idModelo,
                veiculo.$anoFabricacao,
                veiculo.$anoModelo,
                veiculo.$placa,
                veiculo.$renavam,
                veiculo.$chassi,
                veiculo.$idCidade,
                veiculo.$valorCompra,
                veiculo.$valorAnuncio,
                veiculo.$valorVenda,
                veiculo.$dataVenda,
                veiculo.$observacoes,
                veiculo.$dataAquisicao,
                veiculo.$idCor,
                veiculo.$idCombustivel,
                veiculo.$id
            ]))
                .then((result) => {
                resolve(veiculo);
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
                resolve();
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