import { render, screen } from '@testing-library/react-native';
import GroupedToolsChip from './GroupedToolsChip';

jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({ connect: () => (Component) => Component }));
jest.mock('react-use/lib/useToggle', () => () => [false, jest.fn()]);

jest.mock('../../hooks/useThemedStates', () => () => ({}));
jest.mock('../../hooks/useThemedStyleSets', () => () => ({
  baseThemedStyle: {},
  labelThemedStyle: {},
  altThemedStyleSets: [{}, {}],
}));
jest.mock('../../hooks/useClassroomInfo', () => () => ({ visibleTools: [] }));
jest.mock('../../hooks/useRouterState', () => () => ({
  getRouterState: jest.fn(),
  historyPush: jest.fn(),
}));
jest.mock('../../hooks/useSpineToolsByCfi', () => () => ({}));
jest.mock('../../hooks/useDimensions', () => () => ({
  window: { height: 600 },
}));
jest.mock('../../utils/toolbox', () => ({ contentCfiComparator: () => 0 }));
jest.mock('../../redux/actions', () => ({ setSelectedToolUid: jest.fn() }));
jest.mock('./ToolChip', () => () => null);

const defaultProps = {
  numToolsWithin: 3,
  bookId: 'book-1',
  inEditMode: false,
  spineIdRef: 'spine-1',
  books: {},
  userDataByBookId: {},
  setSelectedToolUid: jest.fn(),
};

describe('GroupedToolsChip Component', () => {
  it('should render numToolsWithin as text', () => {
    render(<GroupedToolsChip {...defaultProps} numToolsWithin={3} />);
    expect(screen.getByText('3')).toBeTruthy();
  });

  it('should render a different numToolsWithin value', () => {
    render(<GroupedToolsChip {...defaultProps} numToolsWithin={10} />);
    expect(screen.getByText('10')).toBeTruthy();
  });

  it('should render without crashing', () => {
    const { toJSON } = render(<GroupedToolsChip {...defaultProps} />);
    expect(toJSON()).not.toBeNull();
  });
});
