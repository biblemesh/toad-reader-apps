import { render, screen } from '@testing-library/react-native';
import BookInfoMetadata from './BookInfoMetadata';

jest.mock('redux', () => ({
  bindActionCreators: () => ({}),
}));

jest.mock('react-redux', () => ({
  connect: () => (Component) => Component,
}));

jest.mock(
  '../../hooks/useMetadataValuesByKeyId',
  () => (metadataValues) =>
    (metadataValues || []).reduce(
      (acc, { metadata_key_id, value }) => ({
        ...acc,
        [metadata_key_id]: value,
      }),
      {},
    ),
);

jest.mock('../../utils/toolbox', () => ({
  textToReactNative: (text) => text,
}));

jest.mock('./LinkLikeText', () => () => null);
jest.mock('../../redux/actions', () => ({
  changeLibraryFilter: jest.fn(),
}));

const defaultProps = {
  metadataValues: [],
  metadataKeys: [],
  changeLibraryFilter: jest.fn(),
};

describe('BookInfoMetadata Component', () => {
  it('should return null when metadataValues is empty', () => {
    const { toJSON } = render(<BookInfoMetadata {...defaultProps} />);
    expect(toJSON()).toBeNull();
  });

  it('should return null when metadataValues is null', () => {
    const { toJSON } = render(
      <BookInfoMetadata {...defaultProps} metadataValues={null} />,
    );
    expect(toJSON()).toBeNull();
  });

  it('should render metadata category name when values are present', () => {
    render(
      <BookInfoMetadata
        {...defaultProps}
        metadataValues={[{ metadata_key_id: 'genre', value: 'Fiction' }]}
        metadataKeys={[{ id: 'genre', name: 'Genre', options: null }]}
      />,
    );
    expect(screen.getByText('Genre: ')).toBeTruthy();
  });
});
