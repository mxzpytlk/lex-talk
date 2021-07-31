import { loader } from 'graphql.macro';
import { makeAutoObservable } from 'mobx';
import { UserStore } from './models/user-store';

export class Store {

  public userStore: UserStore;

  constructor() {
    makeAutoObservable(this);
    this.userStore = new UserStore();
  }
}