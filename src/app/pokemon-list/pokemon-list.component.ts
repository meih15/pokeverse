import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, InputTextModule, CardModule, HttpClientModule],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
  providers: [PokemonService]
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];
  filteredPokemons: any[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe(data => {
      this.pokemons = data;
      this.filteredPokemons = this.pokemons; // Initial display
    });
  }

  filterPokemons(searchTerm: string) {
    this.filteredPokemons = this.pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
