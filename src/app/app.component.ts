import { Component, OnInit } from "@angular/core";
import { POKEMONS } from "./mock-pokemon-list";
import { Pokemon } from "./pokemon";

@Component({
  selector: "app-root",
  // Modifier le template pour affichier le message suivant : Liste de Pokémons
  template: `<h1>Liste de Pokémons !</h1>
    <p>Ceci est un paragraphe</p>
    <p>Ceci est un paragraphe</p>
    <p>Ceci est un paragraphe</p> `,
})

export class AppComponent implements OnInit {
  // Charger la liste des 12 pokemons dans le composant
  pokemonList: Pokemon[] = POKEMONS;

  ngOnInit() {
    console.table(this.pokemonList);
    this.selectPokemon(this.pokemonList[0]);
  }

  // Passer en paramètre de la méthode selectPokemon un pokemon issue du mock de pokemon créee précédemment
  selectPokemon(pokemon: Pokemon) {
    console.log(`Vous avez choisi ${pokemon.name} !`);
  }
}
