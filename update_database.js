const axios = require('axios');
const {Client} = require("pg")
const fs = require('fs');

let filename = './carros.sql';

fs.writeFileSync(filename, '');

const start = async () => {
    const client = new Client({
        user: '',
        host: '',
        database: '',
        password: '',
        port: 5432
    });

    await client.connect();

    const query = {
        name: 'fetch-marca',
        text: 'SELECT id::int FROM marca where tipo_veiculo_id = 1 order by id'
    }

    const res = await client.query(query);

    const marcas = res.rows.map(row => row.id);

    let count = 0;
    for (const marcaId of marcas) {
        count +=1;
        console.log(`Processando marca ${count}/${marcas.length}`);
        const modelos = (await get(marcaId)).data.modelos;
        const modelosId = modelos.map(modelo => modelo.codigo);

        const queryModelos = {
            name: 'fetch-modelos',
            text: 'SELECT id::int FROM modelo WHERE id = ANY($1::int[])',
            values: [modelosId]
        }

        const resModelos = await client.query(queryModelos);

        const modelosBD = resModelos.rows.map(row => row.id);

        for (const modelo of modelos.filter(novoModelo => !modelosBD.includes(parseInt(novoModelo.codigo)))) {
            fs.appendFileSync(filename, `insert into modelo (id, descricao, marca_id) values (${modelo.codigo}, '${modelo.nome}', ${marcaId});\n`);
        }
    }
    console.log('Finalizado.')
    await client.end();
};

start();


async function get(marcaId) {
    return axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaId}/modelos`)
        .catch(() => {
            return {
                data: {
                    modelos: []
                }
            };
        });
}