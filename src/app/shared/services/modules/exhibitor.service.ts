import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { ApiService } from "../core/api.service";
import { ToastService } from "../toast.service";

@Injectable({
  providedIn: "root",
})
export class ExhibitorService {
  private eventId =
    "1b59351267938da712d19d57889c7f565cab96406e27a874607b90492a2845232f233a2b72bb4ae006a79b53f95aef054935c50b64d6a2a03cfe5cc75cbcd5cd";
  private clientId = "45426";
  private exhibitorKey = "jublia-exhibitor";
  private exhibitorBookmarkKey = "jublia-exhibitor-bookmark";
  constructor(
    private api: ApiService,
    private storage: Storage,
    private toast: ToastService
  ) {}

  fetchExhibitor() {
    this.removeCacheExhibitor();
    return this.api.getData("directory/search", null, null, {
      event_id: this.eventId,
      client_id: this.clientId,
    });
  }

  setCacheExhibitor(data) {
    this.setCacheExhibitorBookmark(data);
    return this.storage.set(this.exhibitorKey, data);
  }

  getCacheExhibitor() {
    return this.storage.get(this.exhibitorKey);
  }

  removeCacheExhibitor() {
    return this.storage.remove(this.exhibitorKey);
  }

  setCacheExhibitorBookmark(data) {
    this.getCacheExhibitorBookmark().then((value) => {
      console.warn("valuuuuuu", value);
      let bookmark = value ? value : [];
      if (data.bookmark === 1) {
        bookmark.push(data.id_exhibitor);
        this.toast.showToast(`Successfully bookmark ${value.company_name}`);
      } else if (data.bookmark === 0) {
        const filtered = bookmark.filter((x) => x !== data.id_exhibitor);
        bookmark = filtered;
        this.toast.showToast(`Successfully unbookmark ${value.company_name}`);
      }

      this.storage.set(this.exhibitorBookmarkKey, bookmark);
    });
  }

  getCacheExhibitorBookmark() {
    return this.storage.get(this.exhibitorBookmarkKey);
  }
}
