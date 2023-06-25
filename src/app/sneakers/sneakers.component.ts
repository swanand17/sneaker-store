import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sneaker } from '../models/sneaker.model';

@Component({
  selector: 'app-sneakers',
  templateUrl: './sneakers.component.html',
  styleUrls: ['./sneakers.component.scss'],
})
export class SneakersComponent implements OnInit, OnDestroy {
  @Input() brand = '';

  sneakerList: Array<Sneaker> = environment.sneakers;
  filteredSneakerList!: Array<Sneaker>;

  filterFormGroup!: FormGroup;

  brandList = new Set();
  filterList: any[] = [];

  genderSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.filterFormGroup = this.fb.group({
      brandsFormControl: this.fb.control(''),
      sortFormControl: this.fb.control(''),
      genderFormControl: this.fb.control(''),
    });
  }

  ngOnInit(): void {
    this.getFilteredSneakerList();
    this.sneakerList.forEach((sneaker) => this.brandList.add(sneaker.brand));

    if (this.brand) {
      this.filterFormGroup.get('brandsFormControl')?.setValue([this.brand]);
      this.applyFilters();
    }

    this.genderSubscription = this.route.queryParams.subscribe((params) => {
      if (
        params['gender'] !==
        this.filterFormGroup.get('genderFormControl')?.value
      ) {
        this.filterFormGroup
          .get('genderFormControl')
          ?.setValue(params['gender']);
        this.applyFilters();
      }
    });
  }

  viewSneakerDetails(sneaker: Sneaker) {
    this.router.navigate(['/sneakerDetails', { id: sneaker.id }]);
  }

  applyFilters() {
    this.filterList = [];
    for (const [key, value] of Object.entries(this.filterFormGroup.value)) {
      if (value) {
        if (Array.isArray(value)) {
          value.forEach((element) => this.filterList.push(element));
        } else {
          this.filterList.push(value);
        }
      }
    }
    this.getFilteredSneakerList();
  }

  removeFilterChip(filter: any) {
    this.filterList.splice(this.filterList.indexOf(filter), 1);
    this.getFilteredSneakerList();
  }

  getFilteredSneakerList() {
    this.filteredSneakerList = [...this.sneakerList];

    let filterBrandList: string[] = [];
    if (this.filterList?.length) {
      this.filterList.forEach((filterName) => {
        // Filter brands(part1)
        if (this.brandList.has(filterName)) {
          filterBrandList.push(filterName);
        }

        //Filter gender
        if (filterName === 'Male' || filterName === 'Female') {
          this.filteredSneakerList = this.filteredSneakerList.filter(
            (sneaker) => sneaker.gender === filterName
          );
        }

        //Filter sort by
        if (filterName === 'Price: Low to High') {
          this.filteredSneakerList.sort(
            (sneaker1, sneaker2) => sneaker1.price - sneaker2.price
          );
        } else if (filterName === 'Price: High to Low') {
          this.filteredSneakerList.sort(
            (sneaker1, sneaker2) => sneaker2.price - sneaker1.price
          );
        }
      });

      // Filter brands(part2)
      if (filterBrandList.length) {
        this.filteredSneakerList = this.filteredSneakerList.filter(
          (filteredSneaker) => {
            return filterBrandList.includes(filteredSneaker.brand);
          }
        );
      }

      return this.filteredSneakerList;
    } else {
      this.filteredSneakerList = this.sneakerList;
      return this.filteredSneakerList;
    }
  }

  resetFilters() {
    this.filterList = [];
    this.filterFormGroup.reset();
    this.getFilteredSneakerList();
  }

  ngOnDestroy(): void {
    this.resetFilters();
    this.genderSubscription.unsubscribe();
  }
}
