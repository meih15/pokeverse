import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

interface PokemonBasicInfo {
  name: string;
  url: string;
}

interface PokemonDetailedInfo {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: { slot: number; type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  held_items: { item: { name: string } }[];
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151';

  constructor(private http: HttpClient) {}

  getPokemons(): Observable<PokemonDetailedInfo[]> {
    return this.http.get<{ results: PokemonBasicInfo[] }>(this.apiUrl).pipe(
      map(response => response.results),
      mergeMap((pokemons: PokemonBasicInfo[]) => {
        const details$ = pokemons.map((pokemon: PokemonBasicInfo) =>
          this.http.get<PokemonDetailedInfo>(pokemon.url)
        );
        return forkJoin(details$);
      })
    );
  }
}
