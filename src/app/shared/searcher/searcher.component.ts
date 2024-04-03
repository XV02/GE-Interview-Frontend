import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction, debounceTime, map } from 'rxjs';

@Component({
  selector: 'app-searcher',
  standalone: true,
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './searcher.component.html',
  styleUrl: './searcher.component.sass'
})
export class SearcherComponent {
  @Input() public searchItems: any[] = [];
  @Input() public resultFunction: (x: any) => string = (x: any) => JSON.stringify(x);
  @Input() public filterFunction: (x: any) => string = (x: any) => JSON.stringify(x);
  @Input() public placeholder: string = '';

  @Output() public selectedItem = new EventEmitter<any>();

  @ViewChild('searcher', { static: true }) searcherInput!: ElementRef<HTMLInputElement>;

  public model: any;

  public searchClicked: boolean = false;

  constructor() { }

  search: OperatorFunction<string, 
  readonly any[]> = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(10),
    map((term) => 
      term === ''
        ? (this.searchClicked ? this.searchItems.filter((v: any) => v).slice(0, 500) : [])
        : this.searchItems.filter((v: any) => this.filterFunction(v).indexOf(term.toLowerCase()) > -1).slice(0, 500)
    ),
  );

  formatter = (x: any) => {
    this.selectedItem.emit(x);
    return '';
  };

  getResult(r: any): string {
    return this.resultFunction(r);
  }

  scroll($event: any) {
    const elem = $event.currentTarget.nextElementSibling.getElementsByClassName('active')[0];
    elem.scrollIntoView({ block: 'nearest'});
  }

  searchClickedFn() {
    this.searchClicked = true;
    this.searcherInput.nativeElement.dispatchEvent(new Event('input'));
    this.searcherInput.nativeElement.focus();
  }

  unsetActive() {
    this.searchClicked = false;
  }
}
