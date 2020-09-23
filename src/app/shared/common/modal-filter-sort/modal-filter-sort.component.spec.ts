import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule, NavParams } from "@ionic/angular";

import { ModalFilterSortComponent } from "./modal-filter-sort.component";

describe("ModalFilterSortComponent", () => {
  let component: ModalFilterSortComponent;
  let fixture: ComponentFixture<ModalFilterSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      declarations: [ModalFilterSortComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFilterSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
