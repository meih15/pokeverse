import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component'; // Import PokemonListComponent

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PokemonListComponent], // Add PokemonListComponent to imports
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Corrected from `styleUrl` to `styleUrls`
})
export class AppComponent {
  title = 'pokeverse';
}
