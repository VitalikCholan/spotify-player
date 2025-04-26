import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyObjectInfoComponent } from './spotify-object-info.component';

describe('SpotifyObjectInfoComponent', () => {
  let component: SpotifyObjectInfoComponent;
  let fixture: ComponentFixture<SpotifyObjectInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpotifyObjectInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotifyObjectInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
