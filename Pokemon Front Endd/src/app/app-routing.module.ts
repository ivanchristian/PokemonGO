import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MypokemonComponent } from './components/mypokemon/mypokemon.component';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { PokemondetailComponent } from './components/pokemondetail/pokemondetail.component';

const routes: Routes = [
  {
    path: 'home', component: PokedexComponent
  },
  {
    path: 'pokemondetail/:id', component: PokemondetailComponent
  },
  {
    path: 'mypokemon', component: MypokemonComponent
  },
  {
    path: '', pathMatch: 'full', redirectTo: 'home'
  },
  {
    path: '**', pathMatch: 'full', redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
