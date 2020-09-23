import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModalFilterSortComponent } from "./modal-filter-sort.component";
import { IonicModule } from "@ionic/angular";

@NgModule({
  declarations: [ModalFilterSortComponent],
  imports: [IonicModule, CommonModule],
  exports: [ModalFilterSortComponent],
  entryComponents: [ModalFilterSortComponent],
})
export class ModalFilterSortModule {}
