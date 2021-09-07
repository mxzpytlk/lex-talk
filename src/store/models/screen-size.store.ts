import { makeAutoObservable } from 'mobx';

export enum ScreenSize {
  LARGE_LAPTOP = 1400,
  LAPTOP = 1200,
  SMALL_LAPTOP = 992,
  TABLET = 768,
  MOBILE = 576
}

export class ScreenSizeStore {
  private win = {
    width: window.innerWidth,
    height: window.innerHeight
  };

  constructor() {
    makeAutoObservable(this);
    window.addEventListener('resize', this.updateWin.bind(this));
  }

  public get screenSize(): ScreenSize {
    const width = this.win.width;
    for (const size of Object.values(ScreenSize)) {
      if (typeof size === 'number' && size <= width) {
        return size;
      }
    }
    return ScreenSize.MOBILE;
  }

  private updateWin() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.win = { width, height };
  }
}
