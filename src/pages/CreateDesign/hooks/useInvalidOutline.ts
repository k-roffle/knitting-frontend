import { currentOutlineInputAtom } from 'pages/CreateDesign/recoils';
import { useRecoilValue } from 'recoil';
import { hasEmptyValue, hasNegativeNumber } from 'utils/validation';

const useInvalidOutline = (): boolean => {
  const { stitches, rows, needle } = useRecoilValue(currentOutlineInputAtom);
  const isInvalidNumberInput = hasNegativeNumber([stitches, rows]);
  const isInvalidRequiredValue = hasEmptyValue([needle]);

  return isInvalidNumberInput || isInvalidRequiredValue;
};

export default useInvalidOutline;
