import { TestBed } from "@angular/core/testing";
import { Toast } from "@ionic-native/toast/ngx";

import { ToastService } from "./toast.service";

describe("ToastService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [Toast],
    })
  );

  it("should be created", () => {
    const service: ToastService = TestBed.get(ToastService);
    expect(service).toBeTruthy();
  });
});
