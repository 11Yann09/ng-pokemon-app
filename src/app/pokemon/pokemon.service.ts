import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of, tap } from "rxjs";
import { Pokemon } from "./pokemon";

@Injectable()
export class PokemonService {
  constructor(private http: HttpClient) {}

  getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>("api/pokemons").pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.HandleError(error, []))
    );
  }

  getPokemonById(pokemonId: number): Observable<Pokemon | undefined> {
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.HandleError(error, undefined))
    );
  }

  addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };

    return this.http.post<Pokemon>("api/pokemons", pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.HandleError(error, null))
    );
  }

  updatePokemon(pokemon: Pokemon): Observable<null> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };

    return this.http.put("api/pokemons", pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.HandleError(error, null))
    );
  }

  deletePokemonById(pokemonId: number): Observable<null> {
    return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.HandleError(error, undefined))
    );
  }

  private log(response: any) {
    console.log(response);
  }

  private HandleError(error: Error, errorValue: any) {
    console.log(error);
    return of(errorValue);
  }

  getPokemonTypeListe(): string[] {
    return [
      "Plante",
      "Feu",
      "Eau",
      "Insecte",
      "Normal",
      "Electrik",
      "Poison",
      "Fée",
      "Vol",
      "Combat",
      "Psy",
    ];
  }
}
