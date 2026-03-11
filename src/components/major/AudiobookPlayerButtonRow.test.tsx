import { render } from '@testing-library/react-native';
import AudiobookPlayerButtonRow from './AudiobookPlayerButtonRow';

jest.mock('../basic/Icon', () => () => null);
jest.mock('../basic/Button', () => () => null);
jest.mock('../basic/Spin', () => () => null);
jest.mock('../basic/CoverAndSpin', () => () => null);

const defaultProps = {
  positionMS: 30000,
  setPosition: jest.fn(),
  playing: false,
  scanIconToShow: undefined,
  play: jest.fn(),
  pause: jest.fn(),
  playbackSpeed: 1,
  getPlaybackSpeed: () => 1,
  setPlaybackSpeed: jest.fn(),
  downloadStatus: '0',
  toggleDownloaded: jest.fn(),
  loading: false,
  error: undefined,
};

describe('AudiobookPlayerButtonRow Component', () => {
  it('should render without crashing', () => {
    const { toJSON } = render(<AudiobookPlayerButtonRow {...defaultProps} />);
    expect(toJSON()).not.toBeNull();
  });

  it('should return null when error is provided', () => {
    const { toJSON } = render(
      <AudiobookPlayerButtonRow {...defaultProps} error="Playback error" />,
    );
    expect(toJSON()).toBeNull();
  });

  it('should render when playing is true', () => {
    expect(() =>
      render(<AudiobookPlayerButtonRow {...defaultProps} playing={true} />),
    ).not.toThrow();
  });
});
