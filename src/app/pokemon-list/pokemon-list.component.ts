import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { SquadService } from '../services/squad.service';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, InputTextModule, CardModule, ButtonModule, HttpClientModule],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
  providers: [PokemonService]
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];
  filteredPokemons: any[] = [];
  squad: string[] = [];
  canBattle: boolean = false;

  constructor(private pokemonService: PokemonService, private squadService: SquadService) {}

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe(data => {
      this.pokemons = data;
      this.filteredPokemons = this.pokemons; // Initial display
    });

    this.squadService.squad$.subscribe(squad => {
      this.squad = squad;
      this.canBattle = this.squadService.canBattle();
    });
  }

  filterPokemons(searchTerm: string) {
    this.filteredPokemons = this.pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  togglePokemonInSquad(pokemonName: string) {
    if (this.squadService.isInSquad(pokemonName)) {
      this.squadService.removePokemon(pokemonName);
    } else {
      this.squadService.addPokemon(pokemonName);
    }
  }

  isInSquad(pokemonName: string): boolean {
    return this.squadService.isInSquad(pokemonName);
  }

  getPokemonImageUrl(pokemonName: string): string {
    const pokemon = this.pokemons.find(p => p.name === pokemonName);
    return pokemon ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png` : '';
  }
}
