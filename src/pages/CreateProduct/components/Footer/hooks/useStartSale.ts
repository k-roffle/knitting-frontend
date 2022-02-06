import { MY_INFORMATION_ROUTER_ROOT } from 'knitting/constants/path';
import { usePost } from 'knitting/hooks/usePost';
import { currentProductIdAtom } from 'knitting/pages/CreateProduct/recoils';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

type StartSale = {
  startSale: () => void;
};

export const useStartSale = (): StartSale => {
  const currentProductId = useRecoilValue(currentProductIdAtom);
  const navigate = useNavigate();

  const { mutate } = usePost({
    pathname: '/product',
  });

  const startSale = () => {
    mutate({ id: currentProductId });
    navigate(MY_INFORMATION_ROUTER_ROOT);
  };

  return { startSale };
};
