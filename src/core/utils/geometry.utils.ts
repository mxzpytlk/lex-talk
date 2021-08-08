export interface IPoint {
  x: number;
  y: number;
}

export default class ScreenConverter {
  private scale: number;

  constructor(screenSize: number, realSize: number, private center: IPoint) {
  	this.scale = realSize / screenSize;
  }

  public screenPointToReal(point: IPoint): IPoint {
  	return {
  		x: (this.center.x + point.x) * this.scale,
  		y: (this.center.y + point.y) * this.scale,
  	};
  }

  public screenSizeToReal(size: number): number {
  	return size * this.scale;
  }
}
