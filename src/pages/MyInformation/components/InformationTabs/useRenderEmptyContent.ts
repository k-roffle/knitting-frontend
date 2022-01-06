import { EmptyContentProps } from 'knitting/dumbs/EmptyContent';
import { selectedTabAtom } from 'knitting/pages/MyInformation/atom';
import { DESIGN_MENU } from 'knitting/pages/MyInformation/types';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

export const useRenderEmptyContent = (): EmptyContentProps | null => {
  const selectedTab = useRecoilValue(selectedTabAtom);
  const history = useHistory();

  const getEmptyContent = (): EmptyContentProps | null => {
    switch (selectedTab) {
      case DESIGN_MENU.CREATED_DESIGN:
        return {
          title: '아직 만든 도안이 없어요! 😢',
          buttonText: '지금 도안 만들기',
          onClick: () => history.push('/my/designs/create'),
        };
      case DESIGN_MENU.DESIGN_ON_SALE:
        // TODO: 상품 등록하기 페이지 추가되면 url 변경하기
        return {
          title: '아직 판매 중인 상품이 없어요! 😢',
          description:
            '다른 사람이 도안을 구매하기 위해서는 판매 상품으로 등록해야 해요!',
          buttonText: '지금 상품 판매하기',
          onClick: () => history.push('/my/designs/create'),
        };
      default:
        return null;
    }
  };

  return getEmptyContent();
};
