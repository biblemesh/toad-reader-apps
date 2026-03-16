import { render } from '@testing-library/react-native';
import EditToolData from './EditToolData';

jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({
  connect: () => (Component: unknown) => Component,
}));
jest.mock('../../hooks/useWideMode', () => () => false);
jest.mock(
  '../../hooks/useInstanceValue',
  () => (value: unknown) => () => value,
);
jest.mock('../../hooks/useSetTimeout', () => () => [jest.fn()]);
jest.mock('../../hooks/useChangeIndex', () => () => 0);
jest.mock('../../utils/toolbox', () => ({
  cloneObj: (obj: unknown) => JSON.parse(JSON.stringify(obj)),
  getMBSizeStr: () => '1 MB',
  nonEmpty: (val: string) => !!val,
}));
jest.mock('../basic/Icon', () => () => null);
jest.mock('../basic/Radio', () => () => null);
jest.mock('../basic/Button', () => () => null);
jest.mock('../basic/Input', () => () => null);
jest.mock('../basic/CheckBox', () => () => null);
jest.mock('./FileImporter', () => () => null);
jest.mock('../basic/FlipEditor', () => () => null);

const defaultProps = {
  classroomUid: 'classroom1',
  classroom: {},
  isDefaultClassroom: true,
  toolUid: 'tool1',
  isDraft: true,
  accountId: 'idp1:user1',
  dataStructure: [{ name: 'question', type: 'string', label: 'Question' }],
  transformData: null,
  data: { question: 'What is 2+2?' },
  goUpdateTool: jest.fn(),
  accounts: {},
  idps: {},
};

describe('EditToolData Component', () => {
  it('should return null when dataStructure is null', () => {
    const { toJSON } = render(
      <EditToolData {...defaultProps} dataStructure={null} />,
    );
    expect(toJSON()).toBeNull();
  });

  it('should return null when data is null', () => {
    const { toJSON } = render(<EditToolData {...defaultProps} data={null} />);
    expect(toJSON()).toBeNull();
  });

  it('should render without crashing with a string field', () => {
    expect(() => render(<EditToolData {...defaultProps} />)).not.toThrow();
  });

  it('should render without crashing with empty data', () => {
    expect(() =>
      render(<EditToolData {...defaultProps} data={{}} />),
    ).not.toThrow();
  });
});
