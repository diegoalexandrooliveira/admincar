import { Mensagem } from "./index";

export class Resposta {

    private mensagens: Mensagem[] = [];
    private dados: any;

    constructor(mensagem?: Mensagem, mensagens?: Mensagem[], dados?: any) {
        if (dados) {
            this.dados = dados;
        }
        if (mensagem) {
            this.mensagens.push(mensagem);
        } else if (mensagens) {
            this.mensagens = mensagens;
        }
    }

}