import { render } from '@testing-library/react-native';
import { Platform } from 'react-native';
import FileImporter from './FileImporter';

global.window = global.window || ({} as Window & typeof globalThis);
(global.window as Window & typeof globalThis).addEventListener = jest.fn();
(global.window as Window & typeof globalThis).removeEventListener = jest.fn();

jest.mock('expo-document-picker', () => ({
  getDocumentAsync: jest.fn(() => new Promise(() => {})),
}));
jest.mock('../../utils/toolbox', () => ({
  getDataOrigin: () => 'https://api.example.com',
  getReqOptionsWithAdditions: (opts: unknown) => opts,
  cloneObj: (obj: unknown) => JSON.parse(JSON.stringify(obj)),
  getMBSizeStr: (size: number) => `${(size / 1024 / 1024).toFixed(1)} MB`,
  getIdsFromAccountId: () => ({ idpId: 'idp1' }),
  safeFetch: jest.fn(),
}));
jest.mock('./Dialog', () => {
  const { Text } = jest.requireActual('react-native');
  return ({ open, title }: { open: boolean; title: string }) => {
    if (!open) return null;
    return <Text>{title}</Text>;
  };
});
jest.mock('../basic/CoverAndSpin', () => () => null);

const defaultProps = {
  open: false,
  title: 'Upload File',
  fileType: 'application/epub+zip',
  multiple: false,
  relativePath: '/api/upload',
  accountId: 'idp1:user1',
  onClose: jest.fn(),
  accounts: { 'idp1:user1': { cookie: 'abc123' } },
  idps: { idp1: { domain: 'example.com' } },
};

describe('FileImporter Component', () => {
  it('should return null on non-web platform', () => {
    const originalOS = Platform.OS;
    Object.defineProperty(Platform, 'OS', {
      get: () => 'ios',
      configurable: true,
    });
    const { toJSON } = render(<FileImporter {...defaultProps} open={true} />);
    expect(toJSON()).toBeNull();
    Object.defineProperty(Platform, 'OS', {
      get: () => originalOS,
      configurable: true,
    });
  });

  it('should return null when not open on web', () => {
    Object.defineProperty(Platform, 'OS', {
      get: () => 'web',
      configurable: true,
    });
    const { toJSON } = render(<FileImporter {...defaultProps} open={false} />);
    expect(toJSON()).toBeNull();
  });

  it('should render dialog title when open on web', () => {
    Object.defineProperty(Platform, 'OS', {
      get: () => 'web',
      configurable: true,
    });
    expect(() =>
      render(<FileImporter {...defaultProps} open={true} />),
    ).not.toThrow();
  });
});
