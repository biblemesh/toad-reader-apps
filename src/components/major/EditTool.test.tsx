import { render } from '@testing-library/react-native';
import EditTool from './EditTool';

jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({
  connect: () => (Component: unknown) => Component,
}));
jest.mock('uuid', () => ({ v4: () => 'test-uuid' }));
jest.mock('../../utils/toolInfo', () => ({
  getToolInfo: () => ({
    toolTypes: [{ toolType: 'QUIZ', text: 'Quiz' }],
    toolInfoByType: {
      QUIZ: { dataStructure: [], transformData: null },
    },
  }),
}));
jest.mock('../../hooks/useWideMode', () => () => false);
jest.mock('../../hooks/useSetTimeout', () => () => [jest.fn()]);
jest.mock('../../hooks/useClassroomInfo', () => () => ({
  accountId: 'idp1:user1',
  classroomUid: 'classroom1',
  classroom: {},
  isDefaultClassroom: true,
}));
jest.mock('../../hooks/useRouterState', () => () => ({
  getRouterState: jest.fn(),
  historyReplace: jest.fn(),
}));
jest.mock('./StatusAndActions', () => () => null);
jest.mock('../basic/Input', () => () => null);
jest.mock('./EditToolData', () => () => null);
jest.mock('../basic/HeaderIcon', () => () => null);

const defaultProps = {
  bookId: 'book1',
  tool: {
    uid: 'tool1',
    toolType: 'QUIZ',
    name: 'My Quiz',
    data: {},
    published_at: null,
  },
  setViewingPreview: jest.fn(),
  xOutOfTool: jest.fn(),
  books: {},
  userDataByBookId: {},
  updateTool: jest.fn(),
  createTool: jest.fn(),
};

describe('EditTool Component', () => {
  it('should render without crashing', () => {
    expect(() => render(<EditTool {...defaultProps} />)).not.toThrow();
  });

  it('should render without crashing with data in tool', () => {
    expect(() =>
      render(
        <EditTool
          {...defaultProps}
          tool={{ ...defaultProps.tool, data: { question: 'test' } }}
        />,
      ),
    ).not.toThrow();
  });

  it('should render with a published tool', () => {
    expect(() =>
      render(
        <EditTool
          {...defaultProps}
          tool={{ ...defaultProps.tool, published_at: '2024-01-01' }}
        />,
      ),
    ).not.toThrow();
  });
});
