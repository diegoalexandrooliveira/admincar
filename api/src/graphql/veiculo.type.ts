import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat
} from "graphql";
// import * as graphqlDate from "graphql-date";

export let VeiculoType: GraphQLObjectType = new GraphQLObjectType({
  name: "Veiculo",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    idModelo: { type: new GraphQLNonNull(GraphQLInt) },
    descricaoModelo: {
      type: new GraphQLNonNull(GraphQLString)
    },
    idMarca: { type: new GraphQLNonNull(GraphQLInt) },
    descricaoMarca: {
      type: new GraphQLNonNull(GraphQLString)
    },
    anoFabricacao: { type: new GraphQLNonNull(GraphQLInt) },
    anoModelo: { type: new GraphQLNonNull(GraphQLInt) },
    placa: { type: GraphQLString },
    renavam: { type: GraphQLString },
    chassi: { type: GraphQLString },
    idCor: { type: new GraphQLNonNull(GraphQLInt) },
    descricaoCor: {
      type: new GraphQLNonNull(GraphQLString)
    },
    idCidade: { type: GraphQLInt },
    nomeCidade: {
      type: GraphQLString
    },
    idEstado: { type: GraphQLInt },
    nomeEstado: {
      type: GraphQLString
    },
    siglaEstado: {
      type: GraphQLString
    },
    dataInclusao: { type: new GraphQLNonNull(GraphQLString) },
    dataAquisicao: { type: GraphQLString },
    dataVenda: { type: GraphQLString },
    valorAnuncio: {
      type: new GraphQLNonNull(GraphQLFloat)
    },
    valorCompra: { type: GraphQLFloat },
    valorVenda: { type: GraphQLFloat },
    observacoes: { type: GraphQLString },
    idCombustivel: { type: GraphQLInt },
    descricaoCombustivel: { type: GraphQLString }
  }
});
