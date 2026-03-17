import { render, screen } from '@testing-library/react-native';
import EnhancedMyReflectionQuestions from './EnhancedMyReflectionQuestions';
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

describe('EnhancedMyReflectionQuestions Component', () => {
  it('should return null when classroomUid is not set', () => {
    const { toJSON } = render(
      <EnhancedMyReflectionQuestions {...defaultProps} />,
    );
    expect(toJSON()).toBeNull();
  });

  it('should show loading spinner when data is loading', () => {
    (useClassroomInfo as jest.Mock).mockReturnValue({
      classroomUid: 'classroom1',
      idpId: 'idp1',
      isDefaultClassroom: true,
      classroom: {},
      spines: [],
    });
    expect(() =>
      render(<EnhancedMyReflectionQuestions {...defaultProps} />),
    ).not.toThrow();
  });

  it('should show "no reflection questions" when data has no entries', () => {
    (useClassroomInfo as jest.Mock).mockReturnValue({
      classroomUid: 'classroom1',
      idpId: 'idp1',
      isDefaultClassroom: true,
      classroom: {},
      spines: [],
    });
    (useDashboardData as jest.Mock).mockReturnValue({
      data: { questionsByLoc: {} },
      error: null,
    });
    render(<EnhancedMyReflectionQuestions {...defaultProps} />);
    expect(
      screen.getByText(
        'This classroom does not contain any reflection questions.',
      ),
    ).toBeTruthy();
  });
});
