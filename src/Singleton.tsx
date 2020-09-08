class Singleton {
  static valueList: { [key: string]: any } = {};
  static listenerList: { [key: string]: Function[] } = {};

  static getListeners(componentKey: string): Function[] {
    return Singleton.listenerList[componentKey];
  }

  static addListener(listenerFN: Function, componentKey: string): void {
    if (Singleton.listenerList[componentKey] === undefined) {
      Singleton.listenerList[componentKey] = [];
    }

    Singleton.listenerList[componentKey] = [
      ...Singleton.listenerList[componentKey],
      listenerFN,
    ];
  }

  static removeListener(listenerFN: Function, componentKey: string): void {
    if (Singleton.listenerList[componentKey] !== undefined) {
      Singleton.listenerList[componentKey] = Singleton.listenerList[
        componentKey
      ].filter((fn: Function) => fn !== listenerFN);
    }
  }

  static reset(componentKey: string): void {
    delete Singleton.valueList[componentKey];
    delete Singleton.listenerList[componentKey];
  }

  static setValue(value: any, componentKey: string): void {
    Singleton.valueList[componentKey] = value;

    if (Singleton.listenerList[componentKey] !== undefined) {
      Singleton.listenerList[componentKey].forEach(listenerFN =>
        listenerFN(value)
      );
    }
  }

  static getValue(componentKey: string): any {
    return Singleton.valueList[componentKey];
  }
}

export default Singleton;
