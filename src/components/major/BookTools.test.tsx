import { render } from '@testing-library/react-native';
import BookTools from './BookTools';

jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({
  connect: () => (Component: unknown) => Component,
}));
jest.mock('../../hooks/useClassroomInfo', () => () => ({ visibleTools: [] }));
jest.mock('../../hooks/useSpineToolsByCfi', () => () => ({}));
jest.mock('../../hooks/useRouterState', () => () => ({
  getRouterState: jest.fn(),
  historyPush: jest.fn(),
}));
jest.mock('../basic/ToolChip', () => () => null);

const defaultProps = {
  bookId: 'book1',
  inEditMode: false,
  inPageTurn: false,
  spineIdRef: 'spine1',
  toolSpots: null,
  onToolMove: jest.fn(),
  onToolRelease: jest.fn(),
  books: {},
  userDataByBookId: {},
  setSelectedToolUid: jest.fn(),
};

describe('BookTools Component', () => {
  it('should return null when toolSpots is null', () => {
    const { toJSON } = render(<BookTools {...defaultProps} />);
    expect(toJSON()).toBeNull();
  });

  it('should return null when inPageTurn is true', () => {
    const { toJSON } = render(
      <BookTools
        {...defaultProps}
        toolSpots={{
          spots: [{ spineIdRef: 'spine1', y: 10, ordering: 0 }],
          offsetX: 0,
        }}
        inPageTurn={true}
      />,
    );
    expect(toJSON()).toBeNull();
  });

  it('should render without crashing', () => {
    expect(() => render(<BookTools {...defaultProps} />)).not.toThrow();
  });
});
