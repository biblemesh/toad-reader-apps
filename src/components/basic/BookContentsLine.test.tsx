import React from 'react';
import { render, screen } from '@testing-library/react-native';
import BookContentsLine from './BookContentsLine';

jest.mock('redux', () => ({
  bindActionCreators: () => ({}),
}));

jest.mock('react-redux', () => ({
  connect: () => (Component: React.ComponentType) => Component,
}));

jest.mock('@react-native-community/hooks', () => ({
  useLayout: () => ({ onLayout: jest.fn(), height: 0 }),
}));

jest.mock('../../hooks/useClassroomInfo', () => () => ({
  scheduleDatesToDisplay: null,
}));

jest.mock('../../hooks/useRouterState', () => () => ({
  getRouterState: jest.fn(),
  historyPush: jest.fn(),
  historyReplace: jest.fn(),
}));

jest.mock('../../hooks/useThemedStates', () => () => ({}));
jest.mock('../../hooks/useWideMode', () => () => false);

jest.mock('../../utils/toolbox', () => ({
  getDateLine: () => 'Jan 1',
  getTimeLine: () => '12:00',
}));

jest.mock('../../redux/actions', () => ({
  setSelectedToolUid: jest.fn(),
}));

jest.mock('./ToolChip', () => () => null);
jest.mock('./GroupedToolsChip', () => () => null);

const defaultProps = {
  bookId: 'book-1',
  indentLevel: 0,
  uid: 'uid-1',
  label: 'Chapter 1',
  reportLineHeight: jest.fn(),
  index: 0,
  goTo: jest.fn(),
  books: {},
  userDataByBookId: {},
  setSelectedToolUid: jest.fn(),
};

describe('BookContentsLine Component', () => {
  it('should render label text when no toolType', () => {
    render(<BookContentsLine {...defaultProps} />);
    expect(screen.getByText('Chapter 1')).toBeTruthy();
  });

  it('should not render plain label text when toolType is provided', () => {
    render(<BookContentsLine {...defaultProps} toolType="highlight" />);
    expect(screen.queryByText('Chapter 1')).toBeNull();
  });

  it('should call reportLineHeight on mount', () => {
    const reportLineHeight = jest.fn();
    render(
      <BookContentsLine
        {...defaultProps}
        reportLineHeight={reportLineHeight}
      />,
    );
    expect(reportLineHeight).toHaveBeenCalledWith({ index: 0, height: 0 });
  });
});
