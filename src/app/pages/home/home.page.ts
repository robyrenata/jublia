import { Component, ViewChild } from "@angular/core";
import { IonContent, ModalController } from "@ionic/angular";
import { ModalFilterSortComponent } from "@shared/common/modal-filter-sort/modal-filter-sort.component";
import { GlobalService } from "@shared/services";
import { ExhibitorService } from "@shared/services/modules/exhibitor.service";
import * as _ from "lodash";

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
  sortFilterEntities: any;
  isHaveFilterEntity = false;
  constructor(
    private exhibitorSrv: ExhibitorService,
    private gs: GlobalService,
    private modalCtrl: ModalController
  ) {}

  ionViewWillEnter() {
    this.onLoad = true;
    this.checkExhibitorCache();
    this.onLoad = false;
  }

  checkExhibitorCache() {
    this.exhibitorSrv.getCacheExhibitor().then((exhibit) => {
      this.onLoad = true;
      this.gs.log("exhibitList?", exhibit);
      exhibit ? (this.exhibitorList = exhibit) : this.fetchExhibitorList();
      this.exhibitorSrv.getCacheExhibitorBookmark().then((bookmark) => {
        if (bookmark) {
          bookmark.forEach((element) => {
            const found = this.exhibitorList.find(
              (x) => x.id_exhibitor === element
            );
            if (found) {
              found.bookmark = 1;
            }
          });
        }
      });
      this.setKeyword(this.exhibitorList);
      this.onLoad = false;
    });
  }

  setKeyword(data) {
    data.forEach((x, idx) => {
      if (x.group) {
        data[idx].keyword = [x.group];
      }

      x.attributes.forEach((y) => {
        if (y.Country) {
          const country = Object.keys(y.Country);
          data[idx].keyword.push(country[0]);
        } else if (y.Industry) {
          const industry = Object.keys(y.Industry);
          data[idx].keyword.push(industry[0]);
        }
      });
    });

    this.gs.log("data okeee?", data);
    this.exhibitorList = data;
  }

  fetchExhibitorList(isRefresh = null) {
    this.onLoad = true;
    this.exhibitorSrv.fetchExhibitor().subscribe(
      (res) => {
        if (res) {
          this.exhibitorList = res.searchResult;

          this.gs.log("event list?", this.exhibitorList);
          this.matchWithCache(this.exhibitorList);
          if (isRefresh) {
            isRefresh.target.complete();
          }
          this.onLoad = false;
        }
      },
      (err) => {
        if (isRefresh) {
          isRefresh.target.complete();
        }
        this.onLoad = false;
      }
    );
  }

  matchWithCache(data) {
    this.exhibitorSrv.getCacheExhibitorBookmark().then((bookmark) => {
      this.gs.log("yeeeeshhhhhh", bookmark);
      if (bookmark) {
        bookmark.forEach((element) => {
          const found = data.find((x) => x.id_exhibitor === element);
          if (found) {
            found.bookmark = 1;
          }
        });
      }
    });

    this.exhibitorSrv.setCacheExhibitor(this.exhibitorList);
  }

  filterExhibitorList(keyword) {
    this.onLoad = true;
    this.searchQuery = keyword;
    this.filteredExhibitorList = [];
    this.gs.log(this.searchQuery);
    const data = this.exhibitorList;
    const filtered = data.filter((x) =>
      x.company_name.toLowerCase().startsWith(this.searchQuery.toLowerCase())
    );
    this.gs.log("found?", filtered);
    this.filteredExhibitorList = filtered;
    this.sortFilterEntities = null;
    this.onLoad = false;
  }

  async openModal(isFilterModal: boolean) {
    const props = isFilterModal
      ? this.sortFilterEntities
        ? this.sortFilterEntities
        : this.checkAvailableEntities()
      : null;
    const modal = await this.modalCtrl.create({
      component: isFilterModal
        ? ModalFilterSortComponent
        : ModalFilterSortComponent,
      componentProps: { data: props },
      cssClass: "ion-half-modal",
    });

    modal.onWillDismiss().then((passed) => {
      if (passed.data.length > 0) {
        this.sortFilterEntities = passed.data;
      }
      this.filterAndSort();
      const filtered = this.filterAndSort();
      if (filtered.length > 0) {
        this.filteredExhibitorList = filtered;
        this.isHaveFilterEntity = true;
      } else {
        this.isHaveFilterEntity = false;
      }

      this.gs.log("okeee?", this.sortFilterEntities);
      const sort = this.sortFilterEntities.sort.find((x) => x.selected);
      this.filteredExhibitorList = _.sortBy(
        this.filteredExhibitorList,
        sort.uniq
      );
      this.exhibitorList = _.sortBy(this.exhibitorList, sort.uniq);

      if (!sort.isAsc) {
        this.filteredExhibitorList = this.filteredExhibitorList.reverse();
        this.exhibitorList = this.exhibitorList.reverse();
      }
    });

    return await modal.present();
  }

  filterAndSort() {
    const entities = this.sortFilterEntities;
    const list = this.exhibitorList;
    const temp = [];
    const final = [];

    const keys = Object.keys(entities);
    keys.forEach((x) => {
      if (x !== "bookmarked" && x !== "sort") {
        entities[x].forEach((y) => {
          if (y.selected) {
            temp.push(y.name);
          }
        });
      }
    });

    this.gs.log("temppp?", temp);

    list.forEach((x, indexX) => {
      x.keyword.forEach((y) => {
        temp.forEach((z) => {
          if (y === z) {
            final.push(list[indexX]);
          }
        });
      });
    });

    return _.uniqBy(final, "id_exhibitor");
  }

  checkAvailableEntities() {
    this.gs.log("masuk check!!");
    const data =
      this.filteredExhibitorList.length > 0
        ? this.filteredExhibitorList
        : this.exhibitorList;
    const entityObj = {
      group: [],
      country: [],
      industry: [],
      bookmarked: 0,
      sort: [
        {
          uniq: "company_name",
          name: "Company Name",
          isAsc: true,
          selected: true,
        },
        {
          uniq: "bookmark",
          name: "Bookmarked",
          isAsc: true,
          selected: false,
        },
        {
          uniq: "booth",
          name: "Booth",
          isAsc: true,
          selected: false,
        },
      ],
    };

    data.forEach((x) => {
      if (x.bookmark > 0) {
        entityObj.bookmarked++;
      } else if (x.group) {
        entityObj.group.push({ name: x.group, selected: false });
      }

      x.attributes.forEach((y) => {
        if (y.Country) {
          const country = Object.keys(y.Country);
          entityObj.country.push({ name: country[0], selected: false });
        } else if (y.Industry) {
          const industry = Object.keys(y.Industry);
          entityObj.industry.push({ name: industry[0], selected: false });
        }
      });
    });

    entityObj.country = _.sortBy(_.uniqBy(entityObj.country, "name"), "name");
    entityObj.industry = _.sortBy(_.uniqBy(entityObj.industry, "name"), "name");
    entityObj.group = _.sortBy(_.uniqBy(entityObj.group, "name"), "name");

    this.gs.log("oobj", entityObj);

    this.sortFilterEntities = entityObj;

    return entityObj;
  }

  initNewEntities() {
    const data =
      this.filteredExhibitorList.length > 0
        ? this.filteredExhibitorList
        : this.exhibitorList;
    const entityObj = {
      group: [],
      country: [],
      industry: [],
      bookmarked: 0,
      sort: [
        {
          uniq: "company_name",
          name: "Company Name",
          isAsc: true,
        },
        {
          uniq: "bookmark",
          name: "Bookmarked",
          isAsc: true,
        },
        {
          uniq: "booth",
          name: "Booth",
          isAsc: true,
        },
      ],
    };

    data.forEach((x) => {
      if (x.bookmark > 0) {
        entityObj.bookmarked++;
      } else if (x.group) {
        entityObj.group.push({ name: x.group, selected: false });
      }

      x.attributes.forEach((y) => {
        if (y.Country) {
          const country = Object.keys(y.Country);
          entityObj.country.push({ name: country[0], selected: false });
        } else if (y.Industry) {
          const industry = Object.keys(y.Industry);
          entityObj.industry.push({ name: industry[0], selected: false });
        }
      });
    });

    entityObj.country = _.sortBy(_.uniqBy(entityObj.country, "name"), "name");
    entityObj.industry = _.sortBy(_.uniqBy(entityObj.industry, "name"), "name");
    entityObj.group = _.sortBy(_.uniqBy(entityObj.group, "name"), "name");

    this.gs.log("oobj", entityObj);

    this.sortFilterEntities = entityObj;

    return this.sortFilterEntities;
  }

  bookmarkExhibitor(id) {
    const found = this.exhibitorList.find((x) => x.id_exhibitor === id);
    found.bookmark === 0 ? (found.bookmark = 1) : (found.bookmark = 0);
    this.gs.log("found?", found);
    this.exhibitorSrv.setCacheExhibitorBookmark(found);
    if (this.sortFilterEntities) {
      setTimeout(() => {
        this.exhibitorSrv.getCacheExhibitorBookmark().then((bookmark) => {
          this.sortFilterEntities.bookmarked = bookmark.length;
        });
      }, 200);
    }
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
