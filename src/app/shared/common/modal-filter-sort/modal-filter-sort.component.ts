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
  selectAll = {
    group: false,
    country: false,
    industry: false,
  };
  constructor(private modalCtrl: ModalController, private gs: GlobalService) {}

  ionViewDidEnter() {
    this.gs.log("datA?", this.data);
  }
  dismissModal() {
    const checked = this.checkSelected();
    this.modalCtrl.dismiss(checked.length > 0 ? this.data : checked);
  }

  checkSelected() {
    const selected = [];
    this.gs.log("x??", Object.keys(this.data));
    Object.keys(this.data).forEach((x) => {
      if (this.data[x].length) {
        this.data[x].forEach((y) => {
          if (y.selected) {
            selected.push(y.name);
          }
        });
      }
    });

    return selected;
  }

  selectSort(data) {
    this.data.sort.forEach((element) => {
      if (element.uniq === data.uniq) {
        element.selected = true;
        element.isAsc = !element.isAsc;
      } else {
        element.selected = false;
        element.isAsc = true;
      }
    });
  }

  onSelectAll(key) {
    this.selectAll[key] = !this.selectAll[key];
    this.data[key].forEach((element) => {
      element.selected = this.selectAll[key];
    });
  }

  clearAllFilters() {
    const keys = Object.keys(this.data);
    this.gs.log("keys?", keys);

    keys.forEach((key) => {
      if (key !== "bookmarked" && key !== "sort") {
        this.data[key].forEach((element) => {
          element.selected = false;
        });
      }
    });

    this.selectAll.group = false;
    this.selectAll.industry = false;
    this.selectAll.country = false;
  }
}
