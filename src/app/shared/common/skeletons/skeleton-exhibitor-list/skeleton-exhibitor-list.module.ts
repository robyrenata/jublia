import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SkeletonExhibitorListComponent } from "./skeleton-exhibitor-list.component";
import { IonicModule } from "@ionic/angular";

@NgModule({
  declarations: [SkeletonExhibitorListComponent],
  imports: [IonicModule, CommonModule],
  exports: [SkeletonExhibitorListComponent],
})
export class SkeletonExhibitorListModule {}
