import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-country.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { catchError, delay, map, of, tap, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { Region } from '../interfaces/region.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCachePerCapital = new Map<string, Country[]>();
  private queryCachePerCountry = new Map<string, Country[]>();
  private queryCachePerRegion = new Map<string, Country[]>();

  searchByCapital(query: string) {
    const url = `${API_URL}/capital/${query}`;
    query = query.toLowerCase();

    if (this.queryCachePerCapital.has(query)) {
      return of(this.queryCachePerCapital.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(url).pipe(
      map((resCountries: RESTCountry[]): Country[] =>
        CountryMapper.mapRestCountryArrayToCountryArray(resCountries)
      ),
      tap((countries) => this.queryCachePerCapital.set(query, countries)),
      delay(2000),
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

    if (this.queryCachePerCountry.has(query)) {
      return of(this.queryCachePerCountry.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(url).pipe(
      map((resCountries: RESTCountry[]): Country[] =>
        CountryMapper.mapRestCountryArrayToCountryArray(resCountries)
      ),
      tap((countries) => this.queryCachePerCountry.set(query, countries)),
      delay(2000),
      catchError((error) => {
        console.log('error fetching countries', error);
        return throwError(
          () => new Error(`No se pudo obtener países con el query ${query}`)
        );
      })
    );
  }

  searchByRegion(region: Region) {
    const url = `${API_URL}/region/${region}`;

    if (this.queryCachePerRegion.has(region)) {
      return of(this.queryCachePerRegion.get(region) ?? []);
    }

    return this.http.get<RESTCountry[]>(url).pipe(
      map((resCountries: RESTCountry[]): Country[] =>
        CountryMapper.mapRestCountryArrayToCountryArray(resCountries)
      ),
      tap((countries) => this.queryCachePerRegion.set(region, countries)),
      catchError((error) => {
        console.log('error fetching countries', error);
        return throwError(
          () => new Error(`No se pudo obtener países con el query ${region}`)
        );
      })
    );
  }

  searchByAlphaCode(code: string) {
    const url = `${API_URL}/alpha/${code}`;
    return this.http.get<RESTCountry[]>(url).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      map((countries) => countries.at(0)),
      delay(2000),
      catchError((error) => {
        console.log('error fetching', error);
        return throwError(
          () => new Error(`No se pudo obtener ese país con ese codigo ${code}`)
        );
      })
    );
  }
}
