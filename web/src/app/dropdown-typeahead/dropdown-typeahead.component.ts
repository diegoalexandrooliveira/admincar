import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  Input
} from "@angular/core";
import { Subject } from "rxjs/Subject";
import { NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "app-dropdown-typeahead",
  templateUrl: "./dropdown-typeahead.component.html",
  styleUrls: ["./dropdown-typeahead.component.css"]
})
export class DropdownTypeaheadComponent implements OnInit {
  @Input() values: any[];
  @Input() fieldFilter: string;
  @Input() fieldDisplay: string;
  @Input() fieldValue: string;
  @Input() model: any;
  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() whenSelectItem = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  public selecionouItem(eventItem) {
    this.model[this.fieldValue] = eventItem[this.fieldValue];
    this.modelChange.emit(this.model);
    this.whenSelectItem.emit();
  }

  @ViewChild("dropdownTypeAhead") instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .merge(this.focus$)
      .merge(this.click$.filter(() => !this.instance.isPopupOpen()))
      .map(term =>
        (term === ""
          ? this.values
          : this.values.filter(
              v =>
                v[this.fieldFilter].toLowerCase().indexOf(term.toLowerCase()) >
                -1
            )
        ).slice(0, 40)
      );

  formatter = result => result[this.fieldDisplay];
}
