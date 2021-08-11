import { Injectable } from '@nestjs/common';

function addMr() {
  return function (target: Object, key: string | symbol) {
    let val = target[key];

    const getter = () => {
      return `${val} 👽`;
    };

    const setter = (next) => {
      console.log('Adding Mr To the name');
      val = `Mr. ${next}`;
    };

    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}
@Injectable()
export class AppService {
  @addMr()
  name = 'Arun';

  getHello(): string {
    console.log(this.name);
    const messageToPrint = `Welcome ${this.name}`;

    return messageToPrint;
  }
}
