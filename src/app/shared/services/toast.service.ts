import { Injectable } from "@angular/core";
import { Plugins } from "@capacitor/core";
const { Toast } = Plugins;

@Injectable({
  providedIn: "root",
})
export class ToastService {
  constructor() {}

  async showToast(message: string) {
    await Toast.show({
      text: message,
    });
  }
}
