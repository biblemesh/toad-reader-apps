import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import MenuErrorBoundary from './MenuErrorBoundary';

describe('MenuErrorBoundary Component', () => {
  it('should render children normally when there is no error', () => {
    render(
      <MenuErrorBoundary>
        <Text>Normal content</Text>
      </MenuErrorBoundary>,
    );
    expect(screen.getByText('Normal content')).toBeTruthy();
  });

  it('should not throw when rendered without children', () => {
    expect(() => render(<MenuErrorBoundary />)).not.toThrow();
  });

  it('getDerivedStateFromError should return hasError: true', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const state = MenuErrorBoundary.getDerivedStateFromError(
      new Error('test error'),
    );
    expect(state).toEqual({ hasError: true });

    consoleSpy.mockRestore();
  });
});
