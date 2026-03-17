import { render } from '@testing-library/react-native';
import EnhancedDiscussionQuestions from './EnhancedDiscussionQuestions';
import useClassroomInfo from '../../hooks/useClassroomInfo';

jest.mock('react-redux', () => ({
  connect: () => (Component: unknown) => Component,
}));
jest.mock('react-use/lib/usePrevious', () => () => undefined);
jest.mock('../../hooks/useClassroomInfo', () =>
  jest.fn(() => ({
    classroomUid: null,
    visibleTools: [],
    spines: [],
  })),
);
jest.mock('../../hooks/useWideMode', () => () => false);
jest.mock('../../utils/getDummyDiscussionQuestions', () => () => ({
  orderedQuestions: [],
}));
jest.mock('../../utils/toolbox', () => ({
  orderSpineIdRefKeyedObj: ({ obj }: { obj: object }) => Object.values(obj),
  orderCfiKeyedObj: ({ obj }: { obj: object }) => Object.values(obj),
  combineItems: (...items: string[]) => items.join(', '),
}));
jest.mock('../basic/WebDropdown', () => () => null);
jest.mock('./DiscussionQuestionTool', () => () => null);

const defaultProps = {
  bookId: 'book1',
  logToolUsageEvent: jest.fn(),
  books: {},
  userDataByBookId: {},
};

describe('EnhancedDiscussionQuestions Component', () => {
  it('should return null when classroomUid is not set', () => {
    const { toJSON } = render(
      <EnhancedDiscussionQuestions {...defaultProps} />,
    );
    expect(toJSON()).toBeNull();
  });

  it('should render without crashing when classroomUid is set', () => {
    (useClassroomInfo as jest.Mock).mockReturnValue({
      classroomUid: 'classroom1',
      visibleTools: [],
      spines: [],
    });
    expect(() =>
      render(<EnhancedDiscussionQuestions {...defaultProps} />),
    ).not.toThrow();
  });
});
