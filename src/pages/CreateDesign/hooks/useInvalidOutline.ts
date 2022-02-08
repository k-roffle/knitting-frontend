import { outlineInputAtom } from 'knitting/pages/CreateDesign/atom';
import { hasEmptyValue, hasNegativeNumber } from 'knitting/utils/validation';

import { useRecoilValue } from 'recoil';

const useInvalidOutline = (): boolean => {
  const { stitches, rows, needle } = useRecoilValue(outlineInputAtom);
  const isInvalidNumberInput = hasNegativeNumber([stitches, rows]);
  const isInvalidRequiredValue = hasEmptyValue([needle]);

  return isInvalidNumberInput || isInvalidRequiredValue;
};

export default useInvalidOutline;
