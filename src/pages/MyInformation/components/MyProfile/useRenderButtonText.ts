import { selectedTabAtom } from 'knitting/pages/MyInformation/atom';
import { DESIGN_MENU } from 'knitting/pages/MyInformation/types';

import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

export const useRenderButtonText = (): [
  text: string | null,
  clickAction: (() => void) | null,
] => {
  const selectedTab = useRecoilValue(selectedTabAtom);
  const navigate = useNavigate();

  const getButtonText = (): [
    text: string | null,
    clickAction: (() => void) | null,
  ] => {
    switch (selectedTab) {
      case DESIGN_MENU.CREATED_DESIGN:
        return ['새로운 도안 만들기', () => navigate('/my/designs/create')];
      case DESIGN_MENU.DESIGN_ON_SALE:
        // TODO: 상품 등록하기 페이지 추가되면 url 변경하기
        return ['판매 상품 등록하기', () => navigate('/my/designs/create')];
      default:
        return [null, null];
    }
  };

  return getButtonText();
};
