import { render } from '@testing-library/react-native';
import CapturingThumbnailsInfoIcon from './CapturingThumbnailsInfoIcon';
import PagesPage from './PagesPage';

jest.mock('expo-constants', () => ({
  __esModule: true,
  default: {
    expoConfig: {
      extra: {
        CURRENT_PAGE_BORDER_COLOR: 'blue',
        CURRENT_PAGE_BORDER_WIDTH: 2,
        PAGES_HORIZONTAL_MARGIN: 20,
      },
    },
  },
}));
jest.mock('./CapturingThumbnailsInfoIcon', () => jest.fn(() => null));
jest.mock('../../utils/toolbox', () => ({
  getSnapshotURI: jest.fn(() => 'uri://snapshot'),
  getStatusBarCurrentHeight: () => 0,
  getIsAndroidWithCameraWithinScreen: () => false,
}));
jest.mock('../../hooks/useSetTimeout', () => () => [jest.fn()]);

const defaultProps = {
  bookId: 'book-1',
  spineIdRef: 'spine-1',
  cfi: '/4/2/1',
  pageIndexInSpine: 0,
  pageCfisKey: 'key',
  zoomToPage: jest.fn(),
  pageWidth: 100,
  pageHeight: 150,
  isCurrentPage: false,
  indicateMultiplePages: false,
  inEditMode: false,
};

describe('PagesPage Component', () => {
  beforeEach(() => {
    jest.mocked(CapturingThumbnailsInfoIcon).mockClear();
  });

  it('should render without crashing', () => {
    const { toJSON } = render(<PagesPage {...defaultProps} />);
    expect(toJSON()).not.toBeNull();
  });

  it('should render CapturingThumbnailsInfoIcon when indicateMultiplePages is true', () => {
    render(<PagesPage {...defaultProps} indicateMultiplePages={true} />);
    expect(
      jest.mocked(CapturingThumbnailsInfoIcon).mock.calls.length,
    ).toBeGreaterThan(0);
  });

  it('should not render CapturingThumbnailsInfoIcon when indicateMultiplePages is false', () => {
    render(<PagesPage {...defaultProps} indicateMultiplePages={false} />);
    expect(jest.mocked(CapturingThumbnailsInfoIcon).mock.calls.length).toBe(0);
  });
});
