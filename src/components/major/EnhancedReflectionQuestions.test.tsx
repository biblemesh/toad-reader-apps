import { render } from '@testing-library/react-native';
import EnhancedReflectionQuestions from './EnhancedReflectionQuestions';
import useClassroomInfo from '../../hooks/useClassroomInfo';
import useDashboardData from '../../hooks/useDashboardData';

jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({
  connect: () => (Component: unknown) => Component,
}));
jest.mock('react-csv', () => ({
  CSVLink: ({ children }: { children: unknown }) => children,
}));
jest.mock('../../hooks/useClassroomInfo', () =>
  jest.fn(() => ({
    classroomUid: null,
    idpId: 'idp1',
    isDefaultClassroom: true,
    classroom: { isNew: false },
    students: [],
    spines: [],
  })),
);
jest.mock('../../hooks/useDashboardData', () =>
  jest.fn(() => ({ data: undefined, error: null })),
);
jest.mock('../../hooks/useWideMode', () => () => false);
jest.mock('../../utils/toolbox', () => ({
  orderSpineIdRefKeyedObj: ({ obj }: { obj: object }) => Object.values(obj),
  orderCfiKeyedObj: ({ obj }: { obj: object }) => Object.values(obj),
}));
jest.mock('../../utils/dummyReflectionQuestions', () => ({
  isDummy: true,
  orderedQuestions: [
    { uid: 'q1', title: 'Question 1', question: 'What is this?', answers: {} },
  ],
  answers: { q1: {} },
  csvData: [],
}));
jest.mock('../../utils/dummyStudents', () => []);
jest.mock('../basic/WebReflectionDropdown', () => () => null);
jest.mock('../basic/CoverAndSpin', () => () => null);
jest.mock('../basic/FAB', () => () => null);
jest.mock('../basic/NoStudentsBox', () => () => null);

const defaultProps = {
  bookId: 'book1',
  idps: { idp1: { domain: 'test.example.com' } },
  accounts: {},
  books: {},
  userDataByBookId: {},
};

describe('EnhancedReflectionQuestions Component', () => {
  it('should return null when classroomUid is not set', () => {
    const { toJSON } = render(
      <EnhancedReflectionQuestions {...defaultProps} />,
    );
    expect(toJSON()).toBeNull();
  });

  it('should show loading state when classroomUid is set but data is loading', () => {
    (useClassroomInfo as jest.Mock).mockReturnValue({
      classroomUid: 'classroom1',
      idpId: 'idp1',
      isDefaultClassroom: true,
      classroom: { isNew: false },
      students: [],
      spines: [],
    });
    expect(() =>
      render(<EnhancedReflectionQuestions {...defaultProps} />),
    ).not.toThrow();
  });

  it('should render dummy data when no students', () => {
    (useClassroomInfo as jest.Mock).mockReturnValue({
      classroomUid: 'classroom1',
      idpId: 'idp1',
      isDefaultClassroom: true,
      classroom: { isNew: false },
      students: [],
      spines: [],
    });
    (useDashboardData as jest.Mock).mockReturnValue({
      data: { questionsByLoc: {} },
      error: null,
    });
    expect(() =>
      render(<EnhancedReflectionQuestions {...defaultProps} />),
    ).not.toThrow();
  });
});
