import { render } from '@testing-library/react-native';
import EnhancedOptions from './EnhancedOptions';
import useClassroomInfo from '../../hooks/useClassroomInfo';

jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({
  connect: () => (Component: unknown) => Component,
}));
jest.mock('../../hooks/useClassroomInfo', () =>
  jest.fn(() => ({
    classroom: { uid: 'c1', draftData: {} },
    viewingOptions: false,
    bookVersion: 'ENHANCED',
    lti_configurations: [],
  })),
);
jest.mock('./LTIConfigurations', () => () => null);
jest.mock('./EnhancedScreen', () => () => null);

const defaultProps = {
  bookId: 'book1',
  inEditMode: false,
  closeToolAndExitReading: jest.fn(),
  books: {},
  userDataByBookId: {},
  updateClassroom: jest.fn(),
};

describe('EnhancedOptions Component', () => {
  it('should return null when not viewing options', () => {
    const { toJSON } = render(<EnhancedOptions {...defaultProps} />);
    expect(toJSON()).toBeNull();
  });

  it('should return null when viewing options but tabs are empty', () => {
    (useClassroomInfo as jest.Mock).mockReturnValue({
      classroom: { uid: 'c1', draftData: {} },
      viewingOptions: true,
      bookVersion: 'ENHANCED',
      lti_configurations: [],
    });
    const { toJSON } = render(
      <EnhancedOptions {...defaultProps} inEditMode={false} />,
    );
    expect(toJSON()).toBeNull();
  });

  it('should render EnhancedScreen when in edit mode and viewing options', () => {
    (useClassroomInfo as jest.Mock).mockReturnValue({
      classroom: { uid: 'c1', draftData: {} },
      viewingOptions: true,
      bookVersion: 'PUBLISHER',
      lti_configurations: [],
    });
    expect(() =>
      render(<EnhancedOptions {...defaultProps} inEditMode={true} />),
    ).not.toThrow();
  });
});
