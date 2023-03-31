import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable()
export class StorageService {

   private cache: Map<string, any> = new Map<string, any>();
   private cacheName = "cache";
   constructor() {
      //   for (var x = 0; x < localStorage?.length; x++) {
      //      let key = localStorage.key(x) || '';
      //      if (key.toLowerCase().indexOf(this.cacheName) === -1) continue;

      //      this.cache.set(key, JSON.parse(localStorage.getItem(key) || '[]'));
      //   }
   }
   /**
    * set()
    * sets localstorage data
    * @param name
    * @param data
    */
   public set(name: string, data: string): any {
      this.cache.set(this.cacheName + name, data);
      localStorage.setItem(this.cacheName + name, JSON.stringify(data));
   }

   /**
    * Get User Session
    */
   public getSession() {
      const user = this.getWithoutCacheName('user');
      if (user) { return user.sessionId; }
      return null;
   }

   /**
    * Get User Session
    */
   public getUser() {
      const user = this.getWithoutCacheName('user');
      if (user) { return user; }
      return null;
   }




   /**
    * get()
    * gets localstorage data
    * @param name
    * @returns {null}
    */
   public get(name: string): any {
      let key = this.cacheName + name;
      if (this.cache.has(key)) {
         return this.cache.get(key);
      } else {
         return localStorage.getItem(key)
            ? JSON.parse(localStorage.getItem(key) || '[]')
            : null;
      }
   }

   /**
    * get()
    * gets localstorage data
    * @param name
    * @returns {null}
    */
   public getWithoutCacheName(name: string): any {
      let key = name;
      if (this.cache.has(key)) {
         return this.cache.get(key);
      } else {
         return localStorage.getItem(key)
            ? JSON.parse(localStorage.getItem(key) || '[]')
            : null;
      }
   }

   public getObservable<T>(name: string): Observable<T> {
      if (this.cache.has(name)) {
         let x = new BehaviorSubject<T>(this.cache.get(name));
         x.next(this.get(name));
         return x;
      } else {
         let x = new BehaviorSubject<T>(this.get(name));
         return x;
      }
   }
   /**
    * remove()
    * removes localstorage data
    * @param name
    * @returns {null}
    */
   public remove(name: string): any {
      this.cache.delete(this.cacheName + name);
      return localStorage.removeItem(this.cacheName + name);
   }

   /**
    * getToken()
    * gets token from current user data(localstorage)
    * @returns {any}
    */
   get SessionId() {
      let User = this.getUser();
      return User ? User.SessionId : null;
   }

   /**
    * isLoggedIn()
    * checks if user logged in from local storage
    * TODO : Will be improved by adding api logged in check
    * @returns {boolean}
    */
   isLoggedIn() {
      return !!this.get("user");
   }


}
