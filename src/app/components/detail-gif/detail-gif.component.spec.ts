import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailGifComponent } from './detail-gif.component';

describe('DetailGifComponent', () => {
  let component: DetailGifComponent;
  let fixture: ComponentFixture<DetailGifComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailGifComponent]
    });
    fixture = TestBed.createComponent(DetailGifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
