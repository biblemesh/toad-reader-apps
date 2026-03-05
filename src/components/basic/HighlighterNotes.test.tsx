import { render, fireEvent, screen } from '@testing-library/react-native';
import { TextInput } from 'react-native';
import HighlighterNotes from './HighlighterNotes';

jest.mock('inline-i18n', () => ({ i18n: (str: string) => str }));

const defaultProps = {
  note: '',
  updateNoteInEdit: jest.fn(),
  setEditingNote: jest.fn(),
  isEditingNote: false,
};

describe('HighlighterNotes Component', () => {
  it('should render without crashing', () => {
    const { toJSON } = render(<HighlighterNotes {...defaultProps} />);
    expect(toJSON()).not.toBeNull();
  });

  it('should render with the provided note value', () => {
    render(<HighlighterNotes {...defaultProps} note="My note text" />);
    expect(screen.UNSAFE_getByType(TextInput).props.value).toBe('My note text');
  });

  it('should call updateNoteInEdit when text changes', () => {
    const mockUpdate = jest.fn();
    render(
      <HighlighterNotes {...defaultProps} updateNoteInEdit={mockUpdate} />,
    );
    fireEvent.changeText(screen.UNSAFE_getByType(TextInput), 'New note');
    expect(mockUpdate).toHaveBeenCalledWith('New note');
  });
});
