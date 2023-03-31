import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from '../storage/storage.service';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public Menu = new BehaviorSubject<any>([]);
  public SubMenu = new BehaviorSubject<any>([]);
  public Tabs = new BehaviorSubject<any>([]);
  public ActiveMenu = new BehaviorSubject<any>([]);
  public SubMenuList = new BehaviorSubject<any>([]);
  public User = new BehaviorSubject<any>(this.StorageService.getUser());
  public LanguageKeys = new BehaviorSubject<any | null>('');

  constructor(private StorageService: StorageService) { }


}
