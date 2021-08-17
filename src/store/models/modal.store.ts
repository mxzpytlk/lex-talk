import { makeAutoObservable } from 'mobx';


export class ModalStore {

  public isOpen = false;
  public child: JSX.Element;

  constructor() {
    makeAutoObservable(this);
  }

  public open(child: JSX.Element): void {
    this.child = child;
    this.isOpen = true;
  }

  public close(): void {
    this.child = null;
    this.isOpen = false;
  }
}