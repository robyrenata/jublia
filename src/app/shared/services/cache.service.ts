import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  tokenKey = "token"

  constructor(private storage: Storage) { }

  setToken(token: string) { return this.storage.set(this.tokenKey, token) }

  getToken() { return this.storage.get(this.tokenKey) }
  
  removeToken() { return this.storage.remove(this.tokenKey) }

}
