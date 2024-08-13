import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SquadService {
  private squad: string[] = [];
  private squadSubject = new BehaviorSubject<string[]>(this.squad);

  squad$ = this.squadSubject.asObservable();

  addPokemon(pokemonName: string): boolean {
    if (this.squad.length < 6 && !this.squad.includes(pokemonName)) {
      this.squad.push(pokemonName);
      this.squadSubject.next(this.squad);
      return true;
    }
    return false;
  }

  removePokemon(pokemonName: string): void {
    this.squad = this.squad.filter(name => name !== pokemonName);
    this.squadSubject.next(this.squad);
  }

  isInSquad(pokemonName: string): boolean {
    return this.squad.includes(pokemonName);
  }

  canBattle(): boolean {
    return this.squad.length >= 2;
  }
}
