import {
  Component,
  ViewChild,
  Output,
  EventEmitter,
  Input,
  ElementRef
} from "@angular/core";
import { Subject } from "rxjs/Subject";
import { NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "app-dropdown-typeahead",
  templateUrl: "./dropdown-typeahead.component.html",
  styleUrls: ["./dropdown-typeahead.component.css"]
})
export class DropdownTypeaheadComponent {
  @Input() values: any[];
  @Input() fieldFilter: string;
  @Input() fieldDisplay: string;
  @Input() fieldValue: string;
  @Input()
  set model(value: any) {
    this._model = value;
    if (value && value[this.fieldValue]) {
      let selected = this.values.find(
        elemento => elemento[this.fieldValue] == value[this.fieldValue]
      )[this.fieldDisplay];
      this.elementoView.nativeElement.value = selected;
    }
  }
  private _model: any;
  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() whenSelectItem = new EventEmitter();
  @ViewChild("elemento") elementoView: ElementRef;
  constructor() {}

  public selecionouItem(eventItem) {
    this._model[this.fieldValue] = eventItem[this.fieldValue];
    this.modelChange.emit(this._model);
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
