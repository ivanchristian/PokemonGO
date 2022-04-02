import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from 'src/app/model/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemondetail',
  templateUrl: './pokemondetail.component.html',
  styleUrls: ['./pokemondetail.component.css']
})
export class PokemondetailComponent implements OnInit {
  state = {
    pokemonname: '',
    pokemonid: '',
    pokemonType: [],
    pokemonImage: '',
    moves: '',
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    abilities: [],
    base_experience: '',
  }

  pokemon: Pokemon = {
    id: '',
    counter: 0,
    index: '',
    image: '',
    name: ''
  };

  constructor(private pokemonService: PokemonService, private activatedRouter: ActivatedRoute) {
    this.activatedRouter.params.subscribe(
      params => {
        this.getPokemons(params['id']);
      }
    );
  }

  ngOnInit(): void {
  }

  getPokemons(id: any) {

    this.pokemonService.getPokemons(id).subscribe(

      res => {
        this.state = res;
        this.state.pokemonid = res.id;
        this.state.pokemonname = res.name;
        this.state.pokemonType = res.types.map((t: { type: { name: any; }; }) => t.type.name.toUpperCase());
        this.state.pokemonImage = res.sprites.front_default;
        this.state.moves = res.moves[0].move.name;
        this.state.base_experience = res.base_experience;
        this.state.weight = res.weight;
        this.state.height = res.height;
        this.state.abilities = res.abilities[0].ability.name;
        this.state.hp = res.stats[0].base_stat;
        this.state.attack = res.stats[1].base_stat;
        this.state.defense = res.stats[2].base_stat;
        this.state.speed = res.stats[3].base_stat;
        console.log(this.state.pokemonType);
      },
      err => {
        console.log(err);
      }
    );
  }

  getNotification() {
    alert('Do you want to catch this pokemon?');
  }

  savePokemon(): void {
    const data = {
      counter: 0,
      index: this.state.pokemonid,
      image: this.state.pokemonImage,
      name: this.state.pokemonname
    };
    var randNumber = Math.random() * 2;
    if (randNumber <= 1) {
      this.pokemonService.create(data).subscribe(
        res => {
          console.log(randNumber);
        },
        err => {
          console.log(err);
        }
      );
      alert('You successfully caught this pokemon!');
      window.location.reload();
    } else {
      console.log(randNumber);
      alert('You failed to catch this pokemon!');
    }

  }

}
