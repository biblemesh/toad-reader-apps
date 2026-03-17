import { render, screen } from '@testing-library/react-native';
import EnhancedMyScores from './EnhancedMyScores';
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
    classroom: {},
    spines: [],
  })),
);
jest.mock('../../hooks/useDashboardData', () =>
  jest.fn(() => ({ data: undefined, error: null })),
);
jest.mock('../../hooks/useWideMode', () => () => false);
jest.mock('../../utils/toolbox', () => ({
  getDateLine: () => 'Jan 1',
  getTimeLine: () => '12:00',
  combineItems: (...items: string[]) => items.join(', '),
  orderSpineIdRefKeyedObj: ({ obj }: { obj: object }) => Object.values(obj),
  orderCfiKeyedObj: ({ obj }: { obj: object }) => Object.values(obj),
}));
jest.mock('../basic/CoverAndSpin', () => () => null);
jest.mock('../basic/FAB', () => () => null);

const defaultProps = {
  bookId: 'book1',
  idps: { idp1: { domain: 'test.example.com' } },
  accounts: {},
  books: {},
  userDataByBookId: {},
};

describe('EnhancedMyScores Component', () => {
  it('should return null when classroomUid is not set', () => {
    const { toJSON } = render(<EnhancedMyScores {...defaultProps} />);
    expect(toJSON()).toBeNull();
  });

  it('should render loading state when classroomUid is set', () => {
    (useClassroomInfo as jest.Mock).mockReturnValue({
      classroomUid: 'classroom1',
      idpId: 'idp1',
      isDefaultClassroom: true,
      classroom: {},
      spines: [],
    });
    expect(() => render(<EnhancedMyScores {...defaultProps} />)).not.toThrow();
  });

  it('should show "no quizzes" when data has no entries', () => {
    (useClassroomInfo as jest.Mock).mockReturnValue({
      classroomUid: 'classroom1',
      idpId: 'idp1',
      isDefaultClassroom: true,
      classroom: {},
      spines: [],
    });
    (useDashboardData as jest.Mock).mockReturnValue({
      data: { quizzesByLoc: {} },
      error: null,
    });
    render(<EnhancedMyScores {...defaultProps} />);
    expect(
      screen.getByText('This classroom does not contain any quizzes.'),
    ).toBeTruthy();
  });
});
