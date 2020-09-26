import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { GlobalService } from "@shared/services";

@Component({
  selector: "app-exhibitor-detail",
  templateUrl: "./exhibitor-detail.component.html",
  styleUrls: ["./exhibitor-detail.component.scss"],
})
export class ExhibitorDetailComponent implements OnInit {
  @Input() data: any;
  slideOptions = {
    setWrapperSize: true,
    autoHeight: true,
    preloadImages: true,
    loop: true,
    slidesPerView: 1.3,
    spaceBetween: 7,
    centeredSlides: false,
    zoom: false,
  };
  syntheticAttributes = [];

  constructor(private modalCtrl: ModalController, private gs: GlobalService) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.gs.log("okeeee?", this.data);
    this.processingData(this.data);
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  processingData(val) {
    const data = val;
    data.attributes.forEach((x, indexX) => {
      const keys = Object.keys(x);
      keys.forEach((y) => {
        this.gs.log("y???", y);
        const value = Object.keys(x[y]);
        this.gs.log("value?", value);
        if (
          y.toString() !== "SPECIAL_PRODUCT_IMAGES" &&
          y.toString() !== "Product Ads"
        ) {
          this.syntheticAttributes.push({ title: y, body: value });
        }
      });
    });

    this.gs.log("data detail?", data);
    return (this.data = data);
  }
}
