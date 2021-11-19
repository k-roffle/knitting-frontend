import { outlineInputAtom } from 'pages/CreateDesign/atom';
import { useRecoilValue } from 'recoil';
import { hasEmptyValue, hasNegativeNumber } from 'utils/validation';

const useInvalidOutline = (): boolean => {
  const { stitches, rows, needle } = useRecoilValue(outlineInputAtom);
  const isInvalidNumberInput = hasNegativeNumber([stitches, rows]);
  const isInvalidRequiredValue = hasEmptyValue([needle]);

  return isInvalidNumberInput || isInvalidRequiredValue;
};

export default useInvalidOutline;
