import { render } from '@testing-library/react-native';
import { Platform } from 'react-native';
import GuideToBookBrowser from './GuideToBookBrowser';

jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({
  connect: () => (Component: unknown) => Component,
}));
jest.mock('../../hooks/useWideMode', () => () => false);
jest.mock('./Guide', () => () => null);
jest.mock('../basic/Icon', () => () => null);

const defaultProps = {
  inInfoMode: false,
  completedGuides: [],
  addCompletedGuide: jest.fn(),
};

describe('GuideToBookBrowser Component', () => {
  beforeEach(() => {
    Object.defineProperty(Platform, 'OS', {
      get: () => 'ios',
      configurable: true,
    });
  });

  it('should return null on web platform', () => {
    Object.defineProperty(Platform, 'OS', {
      get: () => 'web',
      configurable: true,
    });
    const { toJSON } = render(<GuideToBookBrowser {...defaultProps} />);
    expect(toJSON()).toBeNull();
  });

  it('should return null when guide is already completed', () => {
    const { toJSON } = render(
      <GuideToBookBrowser
        {...defaultProps}
        completedGuides={['book-browser']}
      />,
    );
    expect(toJSON()).toBeNull();
  });

  it('should render without crashing when conditions are met on native', () => {
    expect(() =>
      render(<GuideToBookBrowser {...defaultProps} />),
    ).not.toThrow();
  });
});
