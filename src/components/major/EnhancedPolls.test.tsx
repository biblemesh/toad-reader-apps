import { render } from '@testing-library/react-native';
import EnhancedPolls from './EnhancedPolls';
import useClassroomInfo from '../../hooks/useClassroomInfo';
import useDashboardData from '../../hooks/useDashboardData';

jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({
  connect: () => (Component: unknown) => Component,
}));
jest.mock('../../hooks/useClassroomInfo', () =>
  jest.fn(() => ({
    classroomUid: null,
    idpId: 'idp1',
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
  concatText: ({ text }: { text: string }) => text,
}));
jest.mock('../../utils/dummyPolls', () => ({
  isDummy: true,
  orderedPolls: [],
}));
jest.mock('../../utils/dummyStudents', () => []);
jest.mock('./Victory', () => ({ VictoryPie: () => null }));
jest.mock('../basic/CoverAndSpin', () => () => null);
jest.mock('../basic/NoStudentsBox', () => () => null);

const defaultProps = {
  bookId: 'book1',
  idps: { idp1: { domain: 'test.example.com' } },
  accounts: {},
  books: {},
  userDataByBookId: {},
};

describe('EnhancedPolls Component', () => {
  it('should return null when classroomUid is not set', () => {
    const { toJSON } = render(<EnhancedPolls {...defaultProps} />);
    expect(toJSON()).toBeNull();
  });

  it('should render without crashing when classroomUid is set and data loads', () => {
    (useClassroomInfo as jest.Mock).mockReturnValue({
      classroomUid: 'classroom1',
      idpId: 'idp1',
      classroom: { isNew: false },
      students: [],
      spines: [],
    });
    (useDashboardData as jest.Mock).mockReturnValue({
      data: { pollsByLoc: {} },
      error: null,
    });
    expect(() => render(<EnhancedPolls {...defaultProps} />)).not.toThrow();
  });

  it('should show loading state when data is undefined', () => {
    (useClassroomInfo as jest.Mock).mockReturnValue({
      classroomUid: 'classroom1',
      idpId: 'idp1',
      classroom: { isNew: false },
      students: [],
      spines: [],
    });
    (useDashboardData as jest.Mock).mockReturnValue({
      data: undefined,
      error: null,
    });
    expect(() => render(<EnhancedPolls {...defaultProps} />)).not.toThrow();
  });
});
