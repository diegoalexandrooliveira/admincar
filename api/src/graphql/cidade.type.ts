export let cidadeType: string = `
type Query { cidades: [Cidade] }
type Cidade { id: Number, nome: String, estado: Estado }
`;
