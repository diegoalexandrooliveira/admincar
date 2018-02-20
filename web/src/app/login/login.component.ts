import { Component, OnInit, Input } from "@angular/core";
import { Http, Response } from "@angular/http";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  @Input() usuario: string;
  @Input() senha: string;
  httpService: Http;
  url: string;
  JWT: string = "";

  constructor(http: Http) {
    this.httpService = http;
    this.url = "http://192.168.0.114:8080/api/v1/public/autenticar";
  }

  ngOnInit() {}

  public autenticar(event: Event): void {
    event.preventDefault();
    let payload = { usuario: this.usuario, senha: this.senha };
    this.httpService.post(this.url, payload).subscribe(
      (res: Response) => {
        this.JWT = res.json().data.JWT;
        localStorage.setItem("jwt", res.json().data.JWT);
      },
      erro => {
        let mensagem = JSON.parse(erro._body).mensagens;
        console.log(mensagem);
        this.JWT = "";
        mensagem.forEach(elemento => {
          this.JWT = this.JWT + "\n" + elemento.message;
        });
      }
    );
  }
}
