import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { HomePage } from "./home.page";
import { ModalFilterSortModule } from "@shared/common/modal-filter-sort/modal-filter-sort.module";
import { SkeletonExhibitorListModule } from "@shared/common/skeletons/skeleton-exhibitor-list/skeleton-exhibitor-list.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: "",
        component: HomePage,
      },
    ]),
    ModalFilterSortModule,
    SkeletonExhibitorListModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
