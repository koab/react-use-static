import { useState, useEffect, useRef } from 'react';

import Proxy from './Proxy';

const useStatic = (
  defaultValue: any,
  componentKey: string,
  persistData: boolean = false
) => {
  const { current: proxy } = useRef(new Proxy(componentKey));

  if (proxy.getValue() === undefined) {
    proxy.setValue(defaultValue);
  }

  const [state, setState] = useState(proxy.getValue());

  useEffect(() => {
    proxy.addListener(setState);
    return () => {
      proxy.removeListener(setState);
    };
  }, [setState, proxy]);

  const setStoreClassValue = (value: any) => proxy.setValue(value);

  useEffect(() => {
    return () => {
      if (!persistData && proxy.getListeners().length === 0) {
        proxy.reset();
      }
    };
  }, [proxy, persistData]);

  return [state, setStoreClassValue];
};

export default useStatic;
