export class Estado {
    constructor(private id?: number, private nome?: string, private sigla?: string) {

    }
    public get $id(): number {
        return this.id;
    }
    public set $id(id: number) {
        this.id = id;
    }

    public get $nome(): string {
        return this.nome;
    }
    public set $nome(nome: string) {
        this.nome = nome;
    }

    public get $sigla(): string {
        return this.sigla;
    }
    public set $sigla(sigla: string) {
        this.sigla = sigla;
    }
}