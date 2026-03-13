import { render } from '@testing-library/react-native';
import DiscussionQuestionTool from './DiscussionQuestionTool';

jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({
  connect: () => (Component: unknown) => Component,
}));
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));
jest.mock('../../hooks/useClassroomInfo', () => () => ({
  classroomUid: 'classroom1',
  idpId: 'idp1',
  userId: 'user1',
}));
jest.mock(
  '../../hooks/useInstanceValue',
  () => (value: unknown) => () => value,
);
jest.mock('../../hooks/useSetTimeout', () => () => [jest.fn()]);
jest.mock('../../hooks/useScroll', () => () => ({
  scrolledToEnd: { current: false },
  contentSizeHeight: { current: 0 },
  y: { current: 0 },
  onScroll: jest.fn(),
  onContentSizeChange: jest.fn(),
}));
jest.mock('../../hooks/useKeyboardSize', () => jest.fn());
jest.mock('../../utils/getDummyDiscussionQuestions', () => () => ({
  responses: {},
}));
jest.mock('../../utils/toolbox', () => ({
  getDataOrigin: () => 'https://test.example.com',
  getDateLine: () => 'Today',
  getReqOptionsWithAdditions: (opts: unknown) => opts,
  getTimeLine: () => '12:00',
  safeFetch: jest.fn().mockResolvedValue({
    status: 200,
    json: async () => ({ responses: [] }),
  }),
}));
jest.mock('../basic/TextInput', () => () => null);
jest.mock('../basic/Icon', () => () => null);
jest.mock('../basic/Button', () => () => null);
jest.mock('../basic/Spin', () => () => null);

const defaultProps = {
  bookId: 'book1',
  toolUid: 'tool1',
  viewingPreview: false,
  logUsageEvent: jest.fn(),
  question: 'What do you think about this passage?',
  idps: { idp1: { domain: 'test.example.com' } },
  accounts: { 'idp1:user1': { cookie: 'test-cookie' } },
  books: {},
};

describe('DiscussionQuestionTool Component', () => {
  it('should render the question text', () => {
    const { getByText } = render(<DiscussionQuestionTool {...defaultProps} />);
    expect(getByText('What do you think about this passage?')).toBeTruthy();
  });

  it('should render without crashing when in preview mode', () => {
    expect(() =>
      render(
        <DiscussionQuestionTool {...defaultProps} viewingPreview={true} />,
      ),
    ).not.toThrow();
  });

  it('should render without crashing with no question', () => {
    expect(() =>
      render(<DiscussionQuestionTool {...defaultProps} question={undefined} />),
    ).not.toThrow();
  });
});
