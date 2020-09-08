import Signleton from './Singleton';
import Singleton from './Singleton';

class Proxy {
  componentKey: string;

  constructor(componentKey: string) {
    this.componentKey = componentKey;
  }

  reset(): void {
    Singleton.reset(this.componentKey);
  }

  getValue(): any {
    return Signleton.getValue(this.componentKey);
  }

  getListeners(): Function[] {
    return Signleton.getListeners(this.componentKey);
  }

  setValue(value: any): void {
    Signleton.setValue(value, this.componentKey);
  }

  addListener(listenerFN: Function): void {
    Signleton.addListener(listenerFN, this.componentKey);
  }

  removeListener(listenerFN: Function): void {
    Signleton.removeListener(listenerFN, this.componentKey);
  }
}

export default Proxy;
