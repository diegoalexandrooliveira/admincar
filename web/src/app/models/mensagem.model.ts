export class Mensagem {
  constructor(public informativo: string, public nivel: string) {}

  public getEstilo(): string {
    if (this.nivel == "erro") {
      return "alert-danger";
    } else if (this.nivel == "warn") {
      return "alert-warning";
    } else if (this.nivel == "success") {
      return "alert-success";
    } else {
      return "alert-primary";
    }
  }
}
