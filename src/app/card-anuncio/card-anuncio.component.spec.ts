import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAnuncioComponent } from './card-anuncio.component';

describe('CardAnuncioComponent', () => {
  let component: CardAnuncioComponent;
  let fixture: ComponentFixture<CardAnuncioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardAnuncioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardAnuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
