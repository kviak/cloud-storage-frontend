import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareFilePageComponent } from './share-file-page.component';

describe('ShareFilePageComponent', () => {
  let component: ShareFilePageComponent;
  let fixture: ComponentFixture<ShareFilePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShareFilePageComponent]
    });
    fixture = TestBed.createComponent(ShareFilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
