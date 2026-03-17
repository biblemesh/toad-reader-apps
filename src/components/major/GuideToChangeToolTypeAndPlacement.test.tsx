import { render } from '@testing-library/react-native';
import { Platform } from 'react-native';
import GuideToChangeToolTypeAndPlacement from './GuideToChangeToolTypeAndPlacement';

jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({
  connect: () => (Component: unknown) => Component,
}));
jest.mock('../../hooks/useWideMode', () => () => true);
jest.mock('../../hooks/useDimensions', () => () => ({
  window: { width: 1200 },
}));
jest.mock('./Guide', () => () => null);
jest.mock('../basic/ToolChip', () => () => null);

const defaultProps = {
  bookLoaded: true,
  myRole: 'INSTRUCTOR',
  viewingHighlights: false,
  viewingDashboard: false,
  viewingOptions: false,
  viewingFrontMatter: false,
  inEditMode: true,
  selectedTool: {
    published_at: null,
    toolType: 'NOTES_INSERT',
    data: {},
  },
  sidePanelSettings: { open: true, width: 300 },
  completedGuides: [],
  addCompletedGuide: jest.fn(),
};

describe('GuideToChangeToolTypeAndPlacement Component', () => {
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
    const { toJSON } = render(
      <GuideToChangeToolTypeAndPlacement {...defaultProps} />,
    );
    expect(toJSON()).toBeNull();
  });

  it('should return null when not in edit mode', () => {
    const { toJSON } = render(
      <GuideToChangeToolTypeAndPlacement
        {...defaultProps}
        inEditMode={false}
      />,
    );
    expect(toJSON()).toBeNull();
  });

  it('should return null when guide is already completed', () => {
    const { toJSON } = render(
      <GuideToChangeToolTypeAndPlacement
        {...defaultProps}
        completedGuides={['change-tool-type-and-placement']}
      />,
    );
    expect(toJSON()).toBeNull();
  });
});
