import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Pokemon } from 'src/app/model/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-mypokemon',
  templateUrl: './mypokemon.component.html',
  styleUrls: ['./mypokemon.component.css']
})
export class MypokemonComponent implements OnInit {
  displayedColumns: string[] = ['index', 'image', 'name', 'action'];
  data: any[] = [];
  dataSource = new MatTableDataSource<any>(this.data);
  pokemons = [];

  currentPokemon: Pokemon = {
    id: '1',
    counter: 0,
    index: '',
    image: '',
    name: 'pokemon'
  };

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  constructor(private pokeService: PokemonService, private router: Router) { }

  ngOnInit(): void {
    this.getAll();
  }

  async getAll() {
    let pokemonData;
    for (let i = 0; i <= 200; i++) {
      this.pokeService.getAll().subscribe(
        res => {
          pokemonData = {
            id: res[i].id,
            index: res[i].index,
            image: res[i].image,
            name: res[i].name
          };
          this.data.push(pokemonData);
          this.dataSource = new MatTableDataSource<any>(this.data);
          this.dataSource.paginator = this.paginator;
          console.log(res[i].index);
        },
        err => {
          console.log(err);
        }
      );
    }
  }
  async applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async getRow(row: any) {
    this.router.navigateByUrl(`pokemondetail/${row.position}`);
  }

  deletePokemon(id: any): void {
    var randNumber = Math.random() * 10;
    var roundNumber = Math.round(randNumber);
    console.log(roundNumber);
    var flag = 0;
    if (roundNumber <= 1) {
      alert('Pokemon doesn`t want to leave you :(');
    } else {
      for (let i = 2; i <= roundNumber / 2; i++) {
        if (roundNumber % i == 0) {
          alert('Pokemon doesn`t want to leave you :(');
          flag = 1;
          break;
        }
      } if (flag == 0) {
        this.pokeService.delete(id)
          .subscribe(
            response => {
              console.log(response);
            },
            error => {
              console.log(error);
            });
        alert('You successfully released this pokemon!');
        window.location.reload();
      }
    }
  }

  renamePokemon(id: any): void {
    this.pokeService.update(this.currentPokemon.id, this.currentPokemon)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }
}

