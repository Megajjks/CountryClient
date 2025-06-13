import { Country } from '../interfaces/country.interface';
import { RESTCountry } from '../interfaces/rest-country.interface';

export class CountryMapper {
  static mapRestCountrytoCountry(restCountry: RESTCountry): Country {
    return {
      capital: restCountry.capital.join(', '),
      cca2: restCountry.cca2,
      name: restCountry.translations['spa'].common ?? 'No spa name',
      population: restCountry.population,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      region: restCountry.region,
      subRegion: restCountry.subregion ?? 'No subregion',
    };
  }

  static mapRestCountryArrayToCountryArray(
    restCountry: RESTCountry[]
  ): Country[] {
    return restCountry.map((country) => this.mapRestCountrytoCountry(country));
  }
}
