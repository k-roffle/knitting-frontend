import { DESIGN_MENU_TYPE } from '../InformationTabs';

interface Props {
  children?: React.ReactNode;
  selectedValue: DESIGN_MENU_TYPE;
  value: DESIGN_MENU_TYPE;
}

const InformationTabPanel = (props: Props): React.ReactElement => {
  const { children, value, selectedValue } = props;

  return (
    <div role="tabpanel" hidden={value !== selectedValue}>
      {value === selectedValue && <section>{children}</section>}
    </div>
  );
};

export default InformationTabPanel;
