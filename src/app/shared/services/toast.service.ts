import { Injectable } from "@angular/core";
import { Toast } from "@ionic-native/toast/ngx";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  constructor(private toast: Toast) {}

  showToast(message: string) {
    return this.toast.show(message, "short", "bottom");
  }
}
