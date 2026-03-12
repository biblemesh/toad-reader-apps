import {
  render,
  fireEvent,
  screen,
  waitFor,
} from '@testing-library/react-native';
import { TouchableOpacity } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import Toast from '../../utils/Toast';
import HighlighterEmbedIcon from './HighlighterEmbedIcon';

jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({ connect: () => (Component) => Component }));
jest.mock('@expo/vector-icons', () => ({ Ionicons: () => null }));
jest.mock('expo-clipboard', () => ({
  setStringAsync: jest.fn().mockResolvedValue(undefined),
}));
jest.mock('../../utils/Toast', () => ({ show: jest.fn() }));
jest.mock('../../utils/toolbox', () => ({
  getIdsFromAccountId: () => ({ idpId: '1' }),
  isStaging: () => false,
}));
jest.mock('../../redux/actions', () => ({}));

const defaultProps = {
  bookId: 'book-1',
  selectionInfo: { spineIdRef: 'spine-1', cfi: '/4/2/1' },
  books: { 'book-1': { accounts: { '1:user1': {} } } },
  idps: { '1': { domain: 'example.com' } },
};

describe('HighlighterEmbedIcon Component', () => {
  it('should render without crashing', () => {
    const { toJSON } = render(<HighlighterEmbedIcon {...defaultProps} />);
    expect(toJSON()).not.toBeNull();
  });

  it('should call Clipboard.setStringAsync when pressed', async () => {
    render(<HighlighterEmbedIcon {...defaultProps} />);
    fireEvent.press(screen.UNSAFE_getByType(TouchableOpacity));

    await waitFor(() => {
      expect(jest.mocked(Clipboard.setStringAsync)).toHaveBeenCalledTimes(1);
    });
  });

  it('should call Toast.show after copying the embed code', async () => {
    render(<HighlighterEmbedIcon {...defaultProps} />);
    fireEvent.press(screen.UNSAFE_getByType(TouchableOpacity));

    await waitFor(() => {
      expect(Toast.show).toHaveBeenCalledWith(
        expect.objectContaining({ text: 'Embed code copied' }),
      );
    });
  });
});
