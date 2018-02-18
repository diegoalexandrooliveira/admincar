"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Resposta {
    constructor(mensagem, mensagens, data) {
        if (data) {
            this.data = data;
        }
        if (mensagem) {
            this.mensagens = [];
            this.mensagens.push(mensagem);
        }
        else if (mensagens) {
            this.mensagens = mensagens;
        }
    }
}
exports.Resposta = Resposta;
//# sourceMappingURL=resposta.model.js.map