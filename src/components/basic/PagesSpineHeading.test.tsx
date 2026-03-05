import { render, screen } from '@testing-library/react-native';
import PagesSpineHeading from './PagesSpineHeading';

jest.mock('expo-constants', () => ({
  __esModule: true,
  default: {
    expoConfig: {
      extra: { PAGE_LIST_HEADER_ROW_HEIGHT: 20, PAGES_HORIZONTAL_MARGIN: 20 },
    },
  },
}));

describe('PagesSpineHeading Component', () => {
  it('should render without crashing', () => {
    const { toJSON } = render(<PagesSpineHeading />);
    expect(toJSON()).not.toBeNull();
  });

  it('should render the heading text', () => {
    render(<PagesSpineHeading>Chapter One</PagesSpineHeading>);
    expect(screen.getByText('Chapter One')).toBeTruthy();
  });

  it('should render different heading text', () => {
    render(<PagesSpineHeading>Introduction</PagesSpineHeading>);
    expect(screen.getByText('Introduction')).toBeTruthy();
  });
});
