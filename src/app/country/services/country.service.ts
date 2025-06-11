import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-country.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { catchError, map, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string) {
    const url = `${API_URL}/capital/${query}`;
    query = query.toLowerCase();
    return this.http.get<RESTCountry[]>(url).pipe(
      map((resCountries: RESTCountry[]): Country[] =>
        CountryMapper.mapRestCountryArrayToCountryArray(resCountries)
      ),
      catchError((error) => {
        console.log('error fetching countries', error);
        return throwError(
          () => new Error(`No se pudo obtener países con el query ${query}`)
        );
      })
    );
  }

  searchByCountry(query: string) {
    const url = `${API_URL}/name/${query}`;
    query = query.toLowerCase();
    return this.http.get<RESTCountry[]>(url).pipe(
      map((resCountries: RESTCountry[]): Country[] =>
        CountryMapper.mapRestCountryArrayToCountryArray(resCountries)
      ),
      catchError((error) => {
        console.log('error fetching countries', error);
        return throwError(
          () => new Error(`No se pudo obtener países con el query ${query}`)
        );
      })
    );
  }
}
