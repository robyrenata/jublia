import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExhibitorDetailComponent } from "./exhibitor-detail.component";
import { IonicModule } from "@ionic/angular";

@NgModule({
  declarations: [ExhibitorDetailComponent],
  imports: [CommonModule, IonicModule.forRoot()],
  exports: [ExhibitorDetailComponent],
  entryComponents: [ExhibitorDetailComponent],
})
export class ExhibitorDetailModule {}
