import { Component, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { GlobalService } from "@shared/services";

@Component({
  selector: "app-modal-filter-sort",
  templateUrl: "./modal-filter-sort.component.html",
  styleUrls: ["./modal-filter-sort.component.scss"],
})
export class ModalFilterSortComponent {
  @Input() data: any;
  limitIndustry = 8;
  limitCountry = 8;
  constructor(private modalCtrl: ModalController, private gs: GlobalService) {}

  ionViewDidEnter() {
    this.gs.log("datA?", this.data);
  }
  dismissModal() {
    this.modalCtrl.dismiss();
  }
}
