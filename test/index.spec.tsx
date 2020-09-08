import React, { createRef, forwardRef, useImperativeHandle } from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import useStatic from '../src';
import Singleton from '../src/Singleton';

type Props = {
  value?: string;
};

type Ref = {
  current: any;
};

const TestComponentGenerator = (
  componentKey: string,
  persistState: boolean = false
) =>
  forwardRef(({ value }: Props, ref) => {
    const [state, setState] = useStatic(value, componentKey, persistState);

    useImperativeHandle(ref, () => ({ setState }));

    return <div>{state}</div>;
  });

const TestComponent = TestComponentGenerator('TestComponent');
const TestComponent2 = TestComponentGenerator('TestComponent2');
const TestComponentWithPersist = TestComponentGenerator(
  'TestComponentWithPersist',
  true
);

describe('useStatic', () => {
  it('should initialize state with given value', () => {
    const dummyValue = 'test';
    const { getByText } = render(<TestComponent value={dummyValue} />);
    getByText(dummyValue);
  });

  it('should update state on setState', () => {
    const dummyValue = 'test';
    const ref: Ref = createRef();
    const { getByText } = render(<TestComponent ref={ref} />);
    act(() => ref.current.setState(dummyValue));
    getByText(dummyValue);
  });

  it('should update state for each component', () => {
    const dummyValue = 'test';
    const ref: Ref = createRef();
    const { getAllByText } = render(
      <>
        <TestComponent />
        <TestComponent ref={ref} />
      </>
    );

    act(() => ref.current.setState(dummyValue));
    expect(getAllByText(dummyValue)).toHaveLength(2);
  });

  it('separate component types should have separate static states', () => {
    const dummyValue = 'test';
    const ref: Ref = createRef();
    const { getAllByText } = render(
      <>
        <TestComponent />
        <TestComponent2 ref={ref} />
      </>
    );

    act(() => ref.current.setState(dummyValue));
    expect(getAllByText(dummyValue)).toHaveLength(1);
  });

  it('should clear state if component instance does not exist anymore', () => {
    const dummyValue = 'test';
    const { unmount } = render(<TestComponent value={dummyValue} />);
    expect(Singleton.getValue('TestComponent')).toBe(dummyValue);
    unmount();
    expect(Singleton.getValue('TestComponent')).toBe(undefined);
  });

  it('should persist state if hook initialized with persistData', () => {
    const dummyValue = 'test';
    const { unmount } = render(<TestComponentWithPersist value={dummyValue} />);
    expect(Singleton.getValue('TestComponentWithPersist')).toBe(dummyValue);
    unmount();
    expect(Singleton.getValue('TestComponentWithPersist')).toBe(dummyValue);
  });
});
