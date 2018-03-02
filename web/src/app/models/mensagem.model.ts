export class Mensagem {
  constructor(public informativo: string, public nivel: string) {}

  public getEstilo(): string {
    if (this.nivel == "erro") {
      return "alert-danger";
    } else {
      return "alert-primary";
    }
  }
}
