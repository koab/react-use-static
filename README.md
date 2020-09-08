# react-use-static
 A react hook which can keep static state between functional components
 
# Example usage

```
import useStatic from 'react-use-static';

const Component = ({ defaultValue }) => {
 const persistDataEvenAfterUnmount = false;
 const uniqueComponentKey = 'ComponentKey';
 ...
 const [state, setValue] = useStatic(defaultValue, uniqueComponentKey, persistDataEvenAfterUnmount);
 ...
};
```
