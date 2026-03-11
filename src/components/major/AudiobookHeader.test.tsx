import { render } from '@testing-library/react-native';
import AudiobookHeader from './AudiobookHeader';

jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({
  connect: () => (Component: unknown) => Component,
}));
jest.mock('react-use/lib/useToggle', () => () => [false, jest.fn()]);
jest.mock('../../hooks/useWideMode', () => () => false);
jest.mock('../../hooks/useRouterState', () => () => ({
  historyGoBackToLibrary: jest.fn(),
}));
jest.mock('../../hooks/useDimensions', () => () => ({
  window: { width: 400 },
}));
jest.mock('../../hooks/useMetadataValuesByKeyId', () => () => ({}));
jest.mock('../basic/AppHeader', () => () => null);
jest.mock('../basic/HeaderIcon', () => () => null);

const defaultProps = {
  title: 'Test Audiobook',
  author: 'Test Author',
  isbn: '978-0-00-000000-0',
  epubSizeInMB: 5,
  metadataValues: [],
  metadataKeys: [],
};

describe('AudiobookHeader Component', () => {
  it('should render without crashing', () => {
    expect(() => render(<AudiobookHeader {...defaultProps} />)).not.toThrow();
  });

  it('should render without optional props', () => {
    expect(() =>
      render(
        <AudiobookHeader
          title="Minimal Audiobook"
          epubSizeInMB={2}
          metadataValues={[]}
          metadataKeys={[]}
        />,
      ),
    ).not.toThrow();
  });

  it('should render with metadata keys', () => {
    expect(() =>
      render(
        <AudiobookHeader
          {...defaultProps}
          metadataKeys={[{ id: 'key1', name: 'Genre' }]}
          metadataValues={[{ metadataKeyId: 'key1', value: 'Fiction' }]}
        />,
      ),
    ).not.toThrow();
  });
});
