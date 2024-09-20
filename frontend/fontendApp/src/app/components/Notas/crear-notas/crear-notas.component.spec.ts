import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearNotasComponent } from './crear-notas.component';

describe('CrearNotasComponent', () => {
  let component: CrearNotasComponent;
  let fixture: ComponentFixture<CrearNotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearNotasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
