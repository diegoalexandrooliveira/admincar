import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-site",
  templateUrl: "./site.component.html",
  styleUrls: ["./site.component.css"]
})
export class SiteComponent implements OnInit {
  constructor(private titleService: Title, private router: Router) {}

  @ViewChild("navBar") navBar: ElementRef;

  ngOnInit() {
    this.titleService.setTitle("Perimetral veículos");
    let navItens: HTMLCollection = this.navBar.nativeElement.children[1]
      .children["0"].children;
    for (let index = 0; index < navItens.length; index++) {
      const navItem: Element = navItens.item(index).children[0];
      navItem.addEventListener("click", event => {
        for (let index2 = 0; index2 < navItens.length; index2++) {
          navItens.item(index2).classList.remove("active");
        }
        event["path"][1].classList.add("active");
      });

      if (
        this.router.url.toUpperCase().includes(navItem.innerHTML.toUpperCase())
      ) {
        navItens.item(index).classList.add("active");
      }
    }
  }
}
