import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemondetailComponent } from './pokemondetail.component';

describe('PokemondetailComponent', () => {
  let component: PokemondetailComponent;
  let fixture: ComponentFixture<PokemondetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemondetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemondetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
