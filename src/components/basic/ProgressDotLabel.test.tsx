import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import ProgressDotLabel from './ProgressDotLabel';

jest.mock('inline-i18n', () => ({ i18n: (str: string) => str }));
jest.mock('../../hooks/useSetTimeout', () => () => [jest.fn()]);

const animatedScrollPosition = {
  addListener: jest.fn(() => 'listener-id'),
  removeListener: jest.fn(),
};

describe('ProgressDotLabel Component', () => {
  it('should render without crashing', () => {
    const { toJSON } = render(
      <ProgressDotLabel
        animatedScrollPosition={animatedScrollPosition}
        maxScroll={1000}
      />,
    );
    expect(toJSON()).not.toBeNull();
  });

  it('should render a Text element', () => {
    render(
      <ProgressDotLabel
        animatedScrollPosition={animatedScrollPosition}
        maxScroll={1000}
      />,
    );
    expect(screen.UNSAFE_getByType(Text)).toBeTruthy();
  });

  it('should render without crashing when maxScroll is zero', () => {
    const { toJSON } = render(
      <ProgressDotLabel
        animatedScrollPosition={animatedScrollPosition}
        maxScroll={0}
      />,
    );
    expect(toJSON()).not.toBeNull();
  });
});
