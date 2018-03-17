import { Component, OnInit, Input, ElementRef, ViewChild } from "@angular/core";
import { Mensagem } from "../models/mensagem.model";

@Component({
  selector: "app-mensagens",
  templateUrl: "./mensagens.component.html",
  styleUrls: ["./mensagens.component.css"]
})
export class MensagensComponent implements OnInit {
  private _mensagens: Mensagem[];

  constructor() {}

  @Input()
  set mensagens(mensagens: Mensagem[]) {
    this._mensagens = mensagens;
    if (this._mensagens) {
      this._mensagens.forEach((mensagem: Mensagem, index: number) => {
        if (mensagem.nivel !== "erro") {
          setTimeout(() => {
            let elemento = document.getElementById(`mensagem-${index}`);
            if (elemento) {
              new ElementRef(elemento).nativeElement.click();
            }
          }, 5000);
        }
      });
    }
  }

  get mensagens(): Mensagem[] {
    return this._mensagens;
  }

  ngOnInit() {
    this._mensagens = [];
  }
}
