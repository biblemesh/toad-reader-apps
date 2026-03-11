import { render } from '@testing-library/react-native';
import AudioTool from './AudioTool';

jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({
  connect: () => (Component: unknown) => Component,
}));
jest.mock('../../hooks/useClassroomInfo', () => () => ({
  accountId: 'idp1:user1',
  classroomUid: 'classroom1',
}));
jest.mock(
  '../../hooks/useAssetBaseUri',
  () => () => 'https://test.example.com',
);
jest.mock('../../utils/toolbox', () => ({
  getReqOptionsWithAdditions: (opts: unknown) => opts,
}));
jest.mock('./AudioPlayer', () => () => null);

const defaultProps = {
  bookId: 'book1',
  toolUid: 'tool1',
  classroomQueryString: '',
  logUsageEvent: jest.fn(),
  audioFile: {},
  audioLink: undefined,
  idps: { idp1: { domain: 'test.example.com' } },
  accounts: { 'idp1:user1': { cookie: 'test-cookie' } },
  books: {},
};

describe('AudioTool Component', () => {
  it('should return null when no audioLink and no audioFile filename', () => {
    const { toJSON } = render(<AudioTool {...defaultProps} />);
    expect(toJSON()).toBeNull();
  });

  it('should render when audioLink is provided', () => {
    const { toJSON } = render(
      <AudioTool
        {...defaultProps}
        audioLink="https://test.example.com/audio.mp3"
      />,
    );
    expect(toJSON()).not.toBeNull();
  });

  it('should render when audioFile has a filename', () => {
    const { toJSON } = render(
      <AudioTool {...defaultProps} audioFile={{ filename: 'audio.mp3' }} />,
    );
    expect(toJSON()).not.toBeNull();
  });
});
