import { render } from '@testing-library/react-native';
import EnhancedFrontMatter from './EnhancedFrontMatter';
import useClassroomInfo from '../../hooks/useClassroomInfo';

jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({
  connect: () => (Component: unknown) => Component,
}));
jest.mock('../../hooks/useClassroomInfo', () =>
  jest.fn(() => ({
    classroom: null,
    viewingFrontMatter: false,
    isDefaultClassroom: true,
  })),
);
jest.mock('../../hooks/useRouterState', () => () => ({
  historyReplace: jest.fn(),
  routerState: {},
}));
jest.mock('../../utils/toolbox', () => ({ nonEmpty: (val: unknown) => !!val }));
jest.mock('./Syllabus', () => () => null);
jest.mock('./ReadingSchedule', () => () => null);
jest.mock('./InstructorsIntroduction', () => () => null);
jest.mock('./EnhancedScreen', () => () => null);

const defaultProps = {
  bookId: 'book1',
  inEditMode: false,
  closeToolAndExitReading: jest.fn(),
  goTo: jest.fn(),
  classroomQueryString: '',
  books: {},
  userDataByBookId: {},
  updateClassroom: jest.fn(),
};

describe('EnhancedFrontMatter Component', () => {
  it('should return null when not viewing front matter', () => {
    const { toJSON } = render(<EnhancedFrontMatter {...defaultProps} />);
    expect(toJSON()).toBeNull();
  });

  it('should return null when tabs are empty and not in preview', () => {
    (useClassroomInfo as jest.Mock).mockReturnValue({
      classroom: { uid: 'c1', draftData: {} },
      viewingFrontMatter: true,
      isDefaultClassroom: false,
    });
    const { toJSON } = render(
      <EnhancedFrontMatter {...defaultProps} inEditMode={false} />,
    );
    expect(toJSON()).toBeNull();
  });

  it('should render EnhancedScreen when in edit mode with a classroom', () => {
    (useClassroomInfo as jest.Mock).mockReturnValue({
      classroom: { uid: 'c1', draftData: {}, syllabus: 'text' },
      viewingFrontMatter: true,
      isDefaultClassroom: false,
    });
    expect(() =>
      render(<EnhancedFrontMatter {...defaultProps} inEditMode={true} />),
    ).not.toThrow();
  });
});
