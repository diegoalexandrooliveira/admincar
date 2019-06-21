import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  textoProcurar: string;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  public mudouTela() {
    let navItens: HTMLCollection = document.getElementById("navBar").children[1]
      .children["0"].children;
    let achou: Boolean = false;
    for (let index = 0; index < navItens.length; index++) {
      const navItem: Element = navItens.item(index).children[0];
      navItens.item(index).classList.remove("active");
      if (
        this.router.url
          .toUpperCase()
          .includes(navItem.attributes["data-nome"].value.toUpperCase())
      ) {
        navItens.item(index).classList.add("active");
        achou = true;
      }
    }
    if (!achou) {
      navItens.item(0).classList.add("active");
      navItens.item(1).classList.add("active");
    }
    this.limparProcurar();
  }

  public procurar(){
    this.router.navigate(["/veiculos"], {queryParams: {procurar: this.textoProcurar}}).then(()=>
    this.limparProcurar());
  }

  private limparProcurar(){
    this.textoProcurar = "";
  }
}
