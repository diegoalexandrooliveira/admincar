import { Mensagem } from "./index";

export class Resposta {
  private mensagens: Mensagem[];
  private data: any;

  constructor(mensagem?: Mensagem, mensagens?: Mensagem[], data?: any) {
    if (data) {
      this.data = data;
    }
    if (mensagem) {
      this.mensagens = [];
      this.mensagens.push(mensagem);
    } else if (mensagens) {
      this.mensagens = mensagens;
    }
  }
}
