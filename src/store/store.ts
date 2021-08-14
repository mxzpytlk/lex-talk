import { makeAutoObservable } from 'mobx';
import { LexTalkConfigStore } from './models/lex-talk-config-store';
import { MessagesStore } from './models/messages-store';
import { UserStore } from './models/user-store';

export class Store {
  public userStore: UserStore;
  public configStore: LexTalkConfigStore;
  public messageStore: MessagesStore;

  constructor() {
    makeAutoObservable(this);
    this.userStore = new UserStore();
    this.configStore = new LexTalkConfigStore();
    this.messageStore = new MessagesStore();
  }
}
