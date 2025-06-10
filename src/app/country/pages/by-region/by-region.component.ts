import { Component } from '@angular/core';
import { CountrySearchInputComponent } from '../../components/country-search-input/country-search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';

@Component({
  selector: 'app-by-region-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-region.component.html',
})
export class ByRegionPageComponent {}
