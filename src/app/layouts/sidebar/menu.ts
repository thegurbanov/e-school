import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = JSON.parse(localStorage.getItem("user")!)?.permissions;
