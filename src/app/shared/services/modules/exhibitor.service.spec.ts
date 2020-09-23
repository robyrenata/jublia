import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { Toast } from "@ionic-native/toast/ngx";
import { IonicStorageModule } from "@ionic/storage";

import { ExhibitorService } from "./exhibitor.service";

describe("ExhibitorService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule, IonicStorageModule.forRoot()],
      providers: [Toast],
    })
  );

  it("should be created", () => {
    const service: ExhibitorService = TestBed.get(ExhibitorService);
    expect(service).toBeTruthy();
  });
});
