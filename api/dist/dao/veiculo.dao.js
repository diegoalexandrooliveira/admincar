"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../database/index");
const index_2 = require("../model/index");
const utils_1 = require("../utils");
class VeiculoDAO {
    static buscarTodosVeiculos() {
        let query = `select v.id, v.modelo_id, mo.descricao as descricaomodelo, ma.id as idmarca, ma.descricao as descricaomarca,
    v.ano_fabricacao, v.ano_modelo, v.placa, v.renavam, v.chassi, v.cor_id as idcor, co.descricao as descricaocor,
    v.cidade_id as idcidade, ci.nome as nomecidade, e.id as idestado, e.nome as nomeestado, e.sigla as siglaestado,
    v.data_inclusao, v.data_aquisicao, v.data_venda, v.valor_compra, v.valor_venda, v.valor_anunciado, v.observacoes,
    v.combustivel_id, com.descricao as descricaocombustivel
                    
    from veiculo v inner join (modelo mo inner join marca ma on mo.marca_id = ma.id ) on v.modelo_id = mo.id
     inner join cor co on v.cor_id = co.id
     left outer join (cidades ci inner join estados e on ci.estado_id = e.id) on v.cidade_id = ci.id
     left outer join combustivel com on v.combustivel_id = com.id`;
        return new Promise((resolve, reject) => {
            index_1.clientFactory
                .query(query)
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
                // reject(new Mensagem("Erro ao tentar recuperar os veículos.", "erro"));
            });
        });
    }
}
exports.VeiculoDAO = VeiculoDAO;
//# sourceMappingURL=veiculo.dao.js.map