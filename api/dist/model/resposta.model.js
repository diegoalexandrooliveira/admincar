"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Resposta {
    constructor(mensagem, mensagens, dados) {
        this.mensagens = [];
        if (dados) {
            this.dados = dados;
        }
        if (mensagem) {
            this.mensagens.push(mensagem);
        }
        else if (mensagens) {
            this.mensagens = mensagens;
        }
    }
}
exports.Resposta = Resposta;
//# sourceMappingURL=resposta.model.js.map