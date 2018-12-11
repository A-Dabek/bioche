import { Playable } from '@/icons/playable';
import { IconLibrary } from '@/icons/icon-library';

export class IconFactory {
  iconLibrary = new IconLibrary();

  static getInstance(): IconFactory {
    return new IconFactory();
  }

  getRandomIcon(): Playable {
    return {
      path: this.iconLibrary[Object.keys(this.iconLibrary)[Math.floor(Math.random() * Object.keys(this.iconLibrary))]],
      addFirst: !!Math.floor(Math.random() + 0.5)
    }
  }
}
