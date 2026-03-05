import { render, screen } from '@testing-library/react-native';
import InstructorsHighlightLabel from './InstructorsHighlightLabel';

jest.mock('inline-i18n', () => ({ i18n: (str: string) => str }));
jest.mock('../../hooks/useThemedStyleSets', () => () => ({
  baseThemedStyle: {},
  iconThemedStyle: {},
}));
jest.mock('./Icon', () => () => null);

describe('InstructorsHighlightLabel Component', () => {
  it('should render without crashing', () => {
    const { toJSON } = render(<InstructorsHighlightLabel />);
    expect(toJSON()).not.toBeNull();
  });

  it('should render the instructor highlight label text', () => {
    render(<InstructorsHighlightLabel />);
    expect(screen.getByText('Highlighted by your instructor.')).toBeTruthy();
  });

  it('should render without crashing when style is provided', () => {
    const { toJSON } = render(
      <InstructorsHighlightLabel style={{ color: 'red' }} />,
    );
    expect(toJSON()).not.toBeNull();
  });
});
