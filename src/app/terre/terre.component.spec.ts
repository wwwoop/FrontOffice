/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TerreComponent } from './terre.component';

describe('TerreComponent', () => {
  let component: TerreComponent;
  let fixture: ComponentFixture<TerreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
