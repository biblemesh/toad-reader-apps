import { render } from '@testing-library/react-native';
import Document from './Document';

jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({
  connect: () => (Component: unknown) => Component,
}));
jest.mock('../../hooks/useWideMode', () => () => false);
jest.mock('../../hooks/useNetwork', () => () => ({ online: true }));
jest.mock('../../utils/toolbox', () => ({
  getReqOptionsWithAdditions: (opts: unknown) => opts,
}));
jest.mock('./WebView', () => () => null);
jest.mock('../basic/FAB', () => () => null);

const defaultProps = {
  name: 'Test Document',
  filename: 'test.pdf',
  uri: 'https://test.example.com/test.pdf',
  uriWithCookieInPath: 'https://test.example.com/test.pdf',
  accountId: 'idp1:user1',
  accounts: { 'idp1:user1': { cookie: 'test-cookie' } },
};

describe('Document Component', () => {
  it('should return null when filename is not provided', () => {
    const { toJSON } = render(
      <Document {...defaultProps} filename={undefined} />,
    );
    expect(toJSON()).toBeNull();
  });

  it('should render without crashing with a pdf filename', () => {
    expect(() => render(<Document {...defaultProps} />)).not.toThrow();
  });

  it('should render without crashing with a non-pdf file', () => {
    expect(() =>
      render(<Document {...defaultProps} filename="document.docx" />),
    ).not.toThrow();
  });

  it('should render without crashing when offline', () => {
    jest.resetModules();
    expect(() => render(<Document {...defaultProps} />)).not.toThrow();
  });
});
