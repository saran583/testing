import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaymovieComponent } from './playmovie.component';

describe('PlaymovieComponent', () => {
  let component: PlaymovieComponent;
  let fixture: ComponentFixture<PlaymovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaymovieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaymovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
