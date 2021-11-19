import { selectedTabAtom } from 'pages/MyInformation/atom';
import { DESIGN_MENU_TYPE } from 'pages/MyInformation/types';
import { useRecoilValue } from 'recoil';

interface Props {
  children?: React.ReactNode;
  value: DESIGN_MENU_TYPE;
}

const InformationTabPanel = ({
  children,
  value,
}: Props): React.ReactElement => {
  const selectedTab = useRecoilValue(selectedTabAtom);

  return (
    <div role="tabpanel" hidden={value !== selectedTab}>
      {value === selectedTab && <section>{children}</section>}
    </div>
  );
};

export default InformationTabPanel;
