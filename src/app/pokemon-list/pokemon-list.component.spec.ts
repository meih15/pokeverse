import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonListComponent } from './pokemon-list.component';
import { PokemonService } from '../services/pokemon.service';
import { SquadService } from '../services/squad.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;

  // Define the type explicitly
  let mockPokemonService: jasmine.SpyObj<PokemonService>;
  let mockSquadService: jasmine.SpyObj<SquadService>;

  beforeEach(async () => {
    // Create the spy objects with the necessary methods
    mockPokemonService = jasmine.createSpyObj<PokemonService>('PokemonService', ['getPokemons']);
    mockSquadService = jasmine.createSpyObj<SquadService>('SquadService', ['addPokemon', 'removePokemon', 'isInSquad', 'squad$']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CardModule, ButtonModule, InputTextModule],
      declarations: [PokemonListComponent],
      providers: [
        { provide: PokemonService, useValue: mockPokemonService },
        { provide: SquadService, useValue: mockSquadService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;

    // Mock the service methods' return values
    mockPokemonService.getPokemons.and.returnValue(of([
      {
        id: 1,
        name: 'bulbasaur',
        height: 7,
        weight: 69,
        base_experience: 64,
        sprites: {
          front_default: '', // Added to match the interface
          other: {
            'official-artwork': {
              front_default: ''
            }
          }
        },
        types: [{ slot: 1, type: { name: 'grass' } }],
        abilities: [{ ability: { name: 'overgrow' } }],
        stats: [{ base_stat: 45, stat: { name: 'hp' } }],
        held_items: []
      },
      {
        id: 2,
        name: 'ivysaur',
        height: 10,
        weight: 130,
        base_experience: 142,
        sprites: {
          front_default: '', // Added to match the interface
          other: {
            'official-artwork': {
              front_default: ''
            }
          }
        },
        types: [{ slot: 1, type: { name: 'grass' } }],
        abilities: [{ ability: { name: 'overgrow' } }],
        stats: [{ base_stat: 60, stat: { name: 'hp' } }],
        held_items: []
      }
    ]));

    Object.defineProperty(mockSquadService, 'squad$', { writable: true, value: of(['bulbasaur']) });

    fixture.detectChanges(); // Trigger initial data binding
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the list of Pokemon', () => {
    const pokemonCards = fixture.nativeElement.querySelectorAll('.p-card');
    expect(pokemonCards.length).toBe(2);
  });

  it('should display the squad', () => {
    const squadCards = fixture.nativeElement.querySelectorAll('.squad-section .p-card');
    expect(squadCards.length).toBe(1);
    expect(squadCards[0].textContent).toContain('Bulbasaur');
  });

  it('should add a Pokemon to the squad', () => {
    const addButton = fixture.nativeElement.querySelectorAll('.pokemon-list-section button')[1];
    addButton.click();
    fixture.detectChanges();
    expect(mockSquadService.addPokemon).toHaveBeenCalledWith('ivysaur');
  });

  it('should remove a Pokemon from the squad', () => {
    const removeButton = fixture.nativeElement.querySelector('.squad-section button');
    removeButton.click();
    fixture.detectChanges();
    expect(mockSquadService.removePokemon).toHaveBeenCalledWith('bulbasaur');
  });
});
