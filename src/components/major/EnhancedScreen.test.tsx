import { render, screen } from '@testing-library/react-native';
import EnhancedScreen from './EnhancedScreen';

jest.mock('../../utils/toolbox', () => ({ getToolbarHeight: () => 44 }));
jest.mock('../../hooks/useWideMode', () => () => false);
jest.mock('../../hooks/useInstanceValue', () => (val: unknown) => () => val);
jest.mock('@ui-kitten/components', () => ({
  ...jest.requireActual('@ui-kitten/components'),
  ViewPager: ({ children }: { children: unknown }) => children,
}));
jest.mock('./StatusAndActions', () => () => null);
jest.mock('../basic/HeaderIcon', () => () => null);
jest.mock('../basic/SaveStateHeaderIcon', () => () => null);

const defaultProps = {
  bookId: 'book1',
  inEditMode: false,
  closeToolAndExitReading: jest.fn(),
  heading: 'Front Matter',
  tabs: [],
  viewingPreview: false,
  setViewingPreview: jest.fn(),
};

describe('EnhancedScreen Component', () => {
  it('should return null when tabs are empty and not in preview', () => {
    const { toJSON } = render(<EnhancedScreen {...defaultProps} />);
    expect(toJSON()).toBeNull();
  });

  it('should render heading when tabs are provided', () => {
    render(
      <EnhancedScreen
        {...defaultProps}
        tabs={[{ title: 'Syllabus', content: null }]}
      />,
    );
    expect(screen.getByText('Front Matter')).toBeTruthy();
  });

  it('should render tab title in menu', () => {
    render(
      <EnhancedScreen
        {...defaultProps}
        tabs={[
          { title: 'Syllabus', content: null },
          { title: 'Schedule', content: null },
        ]}
      />,
    );
    expect(screen.getByText('Syllabus')).toBeTruthy();
    expect(screen.getByText('Schedule')).toBeTruthy();
  });
});
