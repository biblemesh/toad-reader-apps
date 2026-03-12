import { render, fireEvent, screen } from '@testing-library/react-native';
import { Alert, TouchableOpacity } from 'react-native';
import CapturingThumbnailsInfoIcon from './CapturingThumbnailsInfoIcon';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
}));

describe('CapturingThumbnailsInfoIcon Component', () => {
  it('should render without crashing', () => {
    const { toJSON } = render(
      <CapturingThumbnailsInfoIcon inEditMode={false} />,
    );
    expect(toJSON()).not.toBeNull();
  });

  it('should show edit mode alert when inEditMode is true', () => {
    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});

    render(<CapturingThumbnailsInfoIcon inEditMode={true} />);
    fireEvent.press(screen.UNSAFE_getByType(TouchableOpacity));

    expect(alertSpy).toHaveBeenCalledWith(
      'Note',
      'Thumbnails are not created when a classroom is in edit mode.',
    );
    alertSpy.mockRestore();
  });

  it('should show reading mode alert when inEditMode is false', () => {
    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});

    render(<CapturingThumbnailsInfoIcon inEditMode={false} />);
    fireEvent.press(screen.UNSAFE_getByType(TouchableOpacity));

    expect(alertSpy).toHaveBeenCalledWith(
      'Note',
      'We will create thumbnail images in the background when you are reading.',
    );
    alertSpy.mockRestore();
  });
});
