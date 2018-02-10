export class Erro {
    constructor(private mensagem: string) {

    }
    public getMensagem(): string {
        return this.mensagem;
    }
}