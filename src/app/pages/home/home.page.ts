import { Component, ViewChild } from "@angular/core";
import { IonContent, ModalController } from "@ionic/angular";
import { ModalFilterSortComponent } from "@shared/common/modal-filter-sort/modal-filter-sort.component";
import { GlobalService } from "@shared/services";
import { ExhibitorService } from "@shared/services/modules/exhibitor.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  exhibitorList: any = [];
  filteredExhibitorList: any = [];
  searchQuery = "";
  onLoad = false;
  buttonScroll = false;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  constructor(
    private exhibitorSrv: ExhibitorService,
    private gs: GlobalService,
    private modalCtrl: ModalController
  ) {}

  ionViewWillEnter() {
    this.checkExhibitorCache();
  }

  checkExhibitorCache() {
    this.onLoad = true;
    this.exhibitorSrv.getCacheExhibitor().then((exhibit) => {
      this.gs.log("exhibitList?", exhibit);
      exhibit ? (this.exhibitorList = exhibit) : this.fetchExhibitorList();
      this.exhibitorSrv.getCacheExhibitorBookmark().then((bookmark) => {
        bookmark.forEach((element) => {
          const found = this.exhibitorList.find(
            (x) => x.id_exhibitor === element
          );
          if (found) {
            found.bookmark = 1;
          }
        });
      });
    });
    this.onLoad = false;
  }

  fetchExhibitorList() {
    this.exhibitorSrv.fetchExhibitor().subscribe((res) => {
      if (res) {
        this.exhibitorList = res.searchResult;
        this.gs.log("event list?", this.exhibitorList);
        this.exhibitorSrv.setCacheExhibitor(this.exhibitorList);
      }
    });
  }

  filterEventList(keyword) {
    this.searchQuery = keyword;
    this.filteredExhibitorList = [];
    this.gs.log(this.searchQuery);
    const data = this.exhibitorList;
    const filtered = data.filter((x) =>
      x.company_name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.gs.log("found?", filtered);
    this.filteredExhibitorList = filtered;
  }

  async openModal(isFilterModal: boolean) {
    const props = isFilterModal ? this.checkAvailableEntities() : null;
    const modal = await this.modalCtrl.create({
      component: isFilterModal
        ? ModalFilterSortComponent
        : ModalFilterSortComponent,
      componentProps: { data: props },
    });
    return await modal.present();
  }

  checkAvailableEntities() {
    const data =
      this.filteredExhibitorList.length > 0
        ? this.filteredExhibitorList
        : this.exhibitorList;
    const entityObj = {
      group: [...new Set(data.map((obj) => obj.group))].sort(),
      country: [],
      industry: [],
      bookmarked: 0,
    };

    data.forEach((x) => {
      if (x.bookmark > 0) {
        entityObj.bookmarked++;
      }
      x.attributes.forEach((y) => {
        if (y.Country) {
          const country = Object.keys(y.Country);
          entityObj.country.push(country[0]);
        } else if (y.Industry) {
          const industry = Object.keys(y.Industry);
          entityObj.industry.push(industry[0]);
        }
      });
    });

    entityObj.country = [...new Set(entityObj.country)].sort();
    entityObj.industry = [...new Set(entityObj.industry)].sort();

    this.gs.log("oobj", entityObj);

    return entityObj;
  }

  bookmarkExhibitor(id) {
    const found = this.exhibitorList.find((x) => x.id_exhibitor === id);
    found.bookmark =
      found.bookmark === 0 ? (found.bookmark = 1) : (found.bookmark = 0);
    this.exhibitorSrv.setCacheExhibitorBookmark(found);
  }

  logScroll(event) {
    event.detail.scrollTop > 700
      ? (this.buttonScroll = true)
      : (this.buttonScroll = false);
  }

  scrollToTop() {
    this.content.scrollToTop(1500);
  }
}
