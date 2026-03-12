import { render, screen } from '@testing-library/react-native';
import MetadataFilterChips from './MetadataFilterChips';

jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({ connect: () => (Component) => Component }));
jest.mock('inline-i18n', () => ({ i18n: (str: string) => str }));
jest.mock('./MetadataFilterChip', () => jest.fn(() => null));

const defaultProps = {
  requestClose: jest.fn(),
  metadataKeys: [
    { id: 'genre', name: 'Genre', options: ['Fiction', 'Non-Fiction'] },
    { id: 'lang', name: 'Language', options: ['English', 'Spanish'] },
  ],
};

describe('MetadataFilterChips Component', () => {
  it('should render the filter explanation text', () => {
    render(<MetadataFilterChips {...defaultProps} />);
    expect(
      screen.getByText('Or filter which books are displayed...'),
    ).toBeTruthy();
  });

  it('should render the metadata key names', () => {
    render(<MetadataFilterChips {...defaultProps} />);
    expect(screen.getByText('Genre')).toBeTruthy();
    expect(screen.getByText('Language')).toBeTruthy();
  });

  it('should not render keys that have no options', () => {
    render(
      <MetadataFilterChips
        {...defaultProps}
        metadataKeys={[
          { id: 'genre', name: 'Genre', options: ['Fiction'] },
          { id: 'empty', name: 'Empty Key' },
        ]}
      />,
    );
    expect(screen.getByText('Genre')).toBeTruthy();
    expect(screen.queryByText('Empty Key')).toBeNull();
  });
});
