import {
  ModalBox,
  ModalContents,
  ModalButton,
  ModalContainer,
} from './Modal.css';

type Props = {
  isShow: boolean;
  title: string;
  description: string;
  closeButtonText?: string;
  confirmButtonText?: string;
  handleClose: () => void;
  handleConfirm: () => void;
};

const Modal = ({
  isShow,
  title,
  description,
  closeButtonText,
  confirmButtonText,
  handleClose,
  handleConfirm,
}: Props) => {
  return (
    <ModalContainer open={isShow} onClose={handleClose}>
      <ModalBox sx={{ width: 400 }}>
        <ModalContents>
          <h2>{title}</h2>
          <p dangerouslySetInnerHTML={{ __html: description }} />
          <ModalButton
            label={closeButtonText || '취소'}
            variant="outlined"
            onClick={handleClose}
          />
          <ModalButton
            label={confirmButtonText || '확인'}
            onClick={handleConfirm}
          />
        </ModalContents>
      </ModalBox>
    </ModalContainer>
  );
};

export default Modal;
