import { render, screen } from '@testing-library/react-native';
import EnhancedScores from './EnhancedScores';
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
jest.mock('../../utils/dummyStudents', () => [
  { user_id: 'u1', fullname: 'Alice', email: 'alice@test.com' },
]);
jest.mock('../../utils/dummyScores', () => ({
  isDummy: true,
  dataColumns: [['Quiz 1', '80%']],
  csvData: [],
}));
jest.mock('../basic/CoverAndSpin', () => () => null);
jest.mock('../basic/NoStudentsBox', () => () => null);
jest.mock('../basic/FAB', () => () => null);

const defaultProps = {
  bookId: 'book1',
  idps: { idp1: { domain: 'test.example.com' } },
  accounts: {},
  books: {},
  userDataByBookId: {},
};

describe('EnhancedScores Component', () => {
  it('should return null when classroomUid is not set', () => {
    const { toJSON } = render(<EnhancedScores {...defaultProps} />);
    expect(toJSON()).toBeNull();
  });

  it('should render loading state when classroomUid is set but data is loading', () => {
    (useClassroomInfo as jest.Mock).mockReturnValue({
      classroomUid: 'classroom1',
      idpId: 'idp1',
      isDefaultClassroom: true,
      classroom: { isNew: false },
      students: [],
      spines: [],
    });
    expect(() => render(<EnhancedScores {...defaultProps} />)).not.toThrow();
  });

  it('should render dummy scores when data has no quizzes', () => {
    (useClassroomInfo as jest.Mock).mockReturnValue({
      classroomUid: 'classroom1',
      idpId: 'idp1',
      isDefaultClassroom: true,
      classroom: { isNew: false },
      students: [],
      spines: [],
    });
    (useDashboardData as jest.Mock).mockReturnValue({
      data: { quizzesByLoc: {} },
      error: null,
    });
    render(<EnhancedScores {...defaultProps} />);
    expect(screen.getByText('Student')).toBeTruthy();
  });
});
