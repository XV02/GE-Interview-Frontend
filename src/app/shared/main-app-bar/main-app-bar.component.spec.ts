import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAppBarComponent } from './main-app-bar.component';

describe('MainAppBarComponent', () => {
  let component: MainAppBarComponent;
  let fixture: ComponentFixture<MainAppBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainAppBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainAppBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
