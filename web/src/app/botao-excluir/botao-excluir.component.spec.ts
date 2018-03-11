import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoExcluirComponent } from './botao-excluir.component';

describe('BotaoExcluirComponent', () => {
  let component: BotaoExcluirComponent;
  let fixture: ComponentFixture<BotaoExcluirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotaoExcluirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotaoExcluirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
