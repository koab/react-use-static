# react-use-static
 A react hook which can keep static state between functional components.
 
# Example usage

Basically you need to assign an unique key to separate states between component types via second parameter. The third parameter is for persisting data even after each instance of component is unmounted.

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
