import { render } from '@testing-library/react-native';
import { BackHandler } from 'react-native';
import BackFunction from './BackFunction';

describe('BackFunction Component', () => {
  let addEventListenerSpy: jest.SpyInstance;
  const mockRemove = jest.fn();

  beforeEach(() => {
    mockRemove.mockClear();
    addEventListenerSpy = jest
      .spyOn(BackHandler, 'addEventListener')
      .mockReturnValue({ remove: mockRemove } as unknown as ReturnType<
        typeof BackHandler.addEventListener
      >);
  });

  afterEach(() => {
    addEventListenerSpy.mockRestore();
  });

  it('should render nothing (returns null)', () => {
    const { toJSON } = render(<BackFunction func={jest.fn()} />);
    expect(toJSON()).toBeNull();
  });

  it('should register a hardware back press listener on mount', () => {
    render(<BackFunction func={jest.fn()} />);
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'hardwareBackPress',
      expect.any(Function),
    );
  });

  it('should call func when hardware back is pressed', () => {
    const mockFunc = jest.fn();
    let capturedHandler: (() => boolean) | undefined;

    addEventListenerSpy.mockImplementation(
      (_event: string, handler: () => boolean) => {
        capturedHandler = handler;
        return { remove: mockRemove };
      },
    );

    render(<BackFunction func={mockFunc} />);

    capturedHandler!();

    expect(mockFunc).toHaveBeenCalledTimes(1);
  });

  it('should remove the listener on unmount', () => {
    const { unmount } = render(<BackFunction func={jest.fn()} />);
    unmount();
    expect(mockRemove).toHaveBeenCalled();
  });
});
