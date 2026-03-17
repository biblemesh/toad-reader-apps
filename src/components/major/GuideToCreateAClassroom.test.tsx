import { render } from '@testing-library/react-native';
import { Platform } from 'react-native';
import GuideToCreateAClassroom from './GuideToCreateAClassroom';

jest.mock('expo-constants', () => ({
  __esModule: true,
  default: {
    expoConfig: {
      extra: {
        ENHANCED_EDITOR_HOW_TO_LINKS: {},
      },
    },
  },
}));
jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({
  connect: () => (Component: unknown) => Component,
}));
jest.mock('../../hooks/useWideMode', () => () => true);
jest.mock('./Guide', () => () => null);
jest.mock('./EnhancedHeader', () => () => null);
jest.mock('../basic/LinkLikeText', () => () => null);

const defaultProps = {
  bookId: 'book1',
  bookLoaded: true,
  isDefaultClassroom: true,
  classrooms: [{ uid: 'default' }],
  bookVersion: 'INSTRUCTOR',
  toggleInEditMode: jest.fn(),
  sidePanelSettings: { open: true, width: 300 },
  completedGuides: [],
  addCompletedGuide: jest.fn(),
};

describe('GuideToCreateAClassroom Component', () => {
  beforeEach(() => {
    Object.defineProperty(Platform, 'OS', {
      get: () => 'web',
      configurable: true,
    });
  });

  it('should return null on non-web platform', () => {
    Object.defineProperty(Platform, 'OS', {
      get: () => 'ios',
      configurable: true,
    });
    const { toJSON } = render(<GuideToCreateAClassroom {...defaultProps} />);
    expect(toJSON()).toBeNull();
  });

  it('should return null when bookVersion is not INSTRUCTOR', () => {
    const { toJSON } = render(
      <GuideToCreateAClassroom {...defaultProps} bookVersion="ENHANCED" />,
    );
    expect(toJSON()).toBeNull();
  });

  it('should return null when guide is already completed', () => {
    const { toJSON } = render(
      <GuideToCreateAClassroom
        {...defaultProps}
        completedGuides={['create-a-classroom']}
      />,
    );
    expect(toJSON()).toBeNull();
  });
});
