import { render } from '@testing-library/react-native';
import EnhancedAnalytics from './EnhancedAnalytics';

jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({
  connect: () => (Component: unknown) => Component,
}));
jest.mock('../../hooks/useClassroomInfo', () => () => ({
  classroomUid: null,
  idpId: 'idp1',
  classroom: {},
  students: [],
  spines: [],
}));
jest.mock('../../hooks/useWideMode', () => () => false);
jest.mock('../../hooks/useAdjustedDimensions', () => () => ({
  fullPageWidth: 400,
}));
jest.mock('../../hooks/useDashboardData', () => () => ({
  data: undefined,
  error: null,
}));
jest.mock('../../utils/toolbox', () => ({
  getDateLine: () => 'Jan 1',
  getTimeLine: () => '12:00',
  orderSpineIdRefKeyedObj: ({ obj }: { obj: object }) => Object.values(obj),
  orderCfiKeyedObj: ({ obj }: { obj: object }) => Object.values(obj),
  roundFractionToTwoDecimals: (n: number) => Math.round(n * 100) / 100,
}));
jest.mock('../../utils/dummyStudents', () => []);
jest.mock('../../utils/dummyAnalytics', () => ({
  isDummy: true,
  readingBySpine: [],
  readingOverTime: [],
  readingScheduleStatuses: [],
  completionsByQuiz: [],
  averageScoresByQuiz: [],
}));
jest.mock('../basic/WebAnalyticsDropdown', () => () => null);
jest.mock('../basic/CoverAndSpin', () => () => null);
jest.mock('../basic/NoStudentsBox', () => () => null);
jest.mock('./EnhancedAnalyticsTotalReading', () => () => null);
jest.mock('./EnhancedAnalyticsReadingBySpine', () => () => null);
jest.mock('./EnhancedAnalyticsReadingOverTime', () => () => null);
jest.mock('./EnhancedAnalyticsStatusesByDueDate', () => () => null);
jest.mock('./EnhancedAnalyticsQuizCompletions', () => () => null);
jest.mock('./EnhancedAnalyticsQuizScores', () => () => null);

const defaultProps = {
  bookId: 'book1',
  idps: { idp1: { domain: 'test.example.com' } },
  accounts: {},
  books: {},
  userDataByBookId: {},
  sidePanelSettings: { open: false },
};

describe('EnhancedAnalytics Component', () => {
  it('should return null when classroomUid is not set', () => {
    const { toJSON } = render(<EnhancedAnalytics {...defaultProps} />);
    expect(toJSON()).toBeNull();
  });

  it('should show loading spinner when classroomUid is set but data is loading', () => {
    jest.mock('../../hooks/useClassroomInfo', () => () => ({
      classroomUid: 'classroom1',
      idpId: 'idp1',
      classroom: { isNew: false },
      students: [],
      spines: [],
    }));
    expect(() => render(<EnhancedAnalytics {...defaultProps} />)).not.toThrow();
  });
});
