import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-botao-excluir",
  templateUrl: "./botao-excluir.component.html",
  styleUrls: ["./botao-excluir.component.css"]
})
export class BotaoExcluirComponent implements OnInit {
  @Input() mensagemConfirmacao: string;
  @Input() identificador: string;
  @Output() acaoConfirmada = new EventEmitter();

  constructor() {
    
  }

  ngOnInit() {}

  public confirmarAcao() {
    this.acaoConfirmada.emit(null);
  }
}
