import { MY_INFORMATION_ROUTER_ROOT } from 'constants/path';

import { usePost } from 'hooks/usePost';
import { currentProductIdAtom } from 'pages/CreateProduct/recoils';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

type StartSale = {
  startSale: () => void;
};

export const useStartSale = (): StartSale => {
  const currentProductId = useRecoilValue(currentProductIdAtom);
  const history = useHistory();

  const { mutate } = usePost({
    pathname: '/product',
  });

  const startSale = () => {
    mutate({ id: currentProductId });
    history.push(MY_INFORMATION_ROUTER_ROOT);
  };

  return { startSale };
};
