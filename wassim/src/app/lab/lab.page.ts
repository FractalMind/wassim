import {Component, OnInit} from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  concatMap,
  debounceTime,
  delay,
  distinctUntilChanged,
  from,
  lastValueFrom,
  Observable,
  of
} from "rxjs";
import {map, startWith, tap} from "rxjs/operators";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FilterItemsPipe} from "../../core/pipes/filter-items.pipe";
import {ItemInterface} from "./models/item.interface";

@Component({
  templateUrl: './lab.page.html',
  styleUrls: ['./lab.page.scss'],
  providers: [FilterItemsPipe],
})
export class LabPage implements OnInit {

  ///////////////////////////////////////////////////////////////
  // map()
  ///////////////////////////////////////////////////////////////
  public labFormGroup: FormGroup;
  public assignedNumberDoubled$: Observable<number> | undefined;


  ///////////////////////////////////////////////////////////////
  // concatMap()
  ///////////////////////////////////////////////////////////////
  public itemList$ = new BehaviorSubject<Array<ItemInterface>>([]);
  public filteredItemListToDisplay$: Observable<ItemInterface[]> | undefined;

  public labConcatMapFromGroup = this.formBuilder.group({
    nameToCreateANewItem: new FormControl('test', [
      Validators.required,
    ]),
    searchTermsToFilterItems: new FormControl('')
  })

  constructor(private formBuilder: FormBuilder,) {
    this.labFormGroup = formBuilder
      .group({
        assignedNumberToBeDoubled: new FormControl(2)
      })
  }

  ngOnInit() {
    this.setAssignedNumberDoubled();
    this.setItemListToDisplay()
  }

  public setAssignedNumberDoubled() {
    this.assignedNumberDoubled$ = this.labFormGroup
      .get('assignedNumberToBeDoubled')
      ?.valueChanges
      .pipe(
        map(value => value * 2),
      );
  }

  public setItemListToDisplay() {
    this.filteredItemListToDisplay$ = combineLatest([
      this.itemList$,
      this.labConcatMapFromGroup.valueChanges
        .pipe(
          debounceTime(400),
          distinctUntilChanged(),
          startWith(null),
        )
    ]).pipe(
      map(([itemList, searchTerm]) => {
        console.log('setFilterItemList', {itemList, searchTerm});
        const keyword = (searchTerm != null)
          ? searchTerm.searchTermsToFilterItems!.toString().toLowerCase().trim()
          : '';
        return itemList?.filter((item: ItemInterface) => item.name.toLowerCase().includes(keyword))
      })
    )
  }

  public fakeApiGetItem(id: number) {
    return of(id)
      .pipe(
        map(id => {
          return <ItemInterface>{
            id: id,
            name: 'item' + id
          }
        }),
        delay(1000)
      )
  }

  public reloadConcatMap() {
    const idToFetch$ = from([1, 2, 3]);
    lastValueFrom(idToFetch$
      .pipe(
        concatMap(id => this.fakeApiGetItem(id)),
        tap(item => {
          let newItemList = this.itemList$.getValue();
          newItemList.push(item);
          this.itemList$.next(newItemList)
        })
      ))
  }

  public removeOneItem() {
    let newItemList = this.itemList$.getValue()
    this.itemList$.next(newItemList.splice(0, 1));
  }

  public addItemToList() {
    if (this.labConcatMapFromGroup.valid) {
      this.itemList$.getValue().push({
        id: 0,
        name: this.labConcatMapFromGroup.get('nameToCreateANewItem')?.value!
      })
      this.labConcatMapFromGroup.patchValue({
        nameToCreateANewItem: 'momo',
      });
    }
  }

}

