import { useDispatch, useSelector } from 'react-redux'


import { closeInstanceModal, modalSelector } from '../../../stateManagement/slices/instanceModalSlice'
import GenericModalAlert from '../../ui/genericModalAlert/GenericModalAlert'
import GenericModal from '@/components/ui/genericModal/GenericModal'

const InstanceModal: React.FC = () => {
  const dispatch = useDispatch()
  const {
    isOpen,
    meta: {
      onClickOk,
      type,
      onClickCancel,
      content,
      title,
      icon,
      description,
      okText,
      cancelText,
      subtitle,
      isLoading = false,
    },
  } = useSelector(modalSelector)

  return (
    <>
      {type == 'form' ? (
        <GenericModal
          open={isOpen}
          title={title}
          subtitle={subtitle}
          icon={icon}
          description={description}
          okText={okText}
          cancelText={cancelText}
          onClickOk={onClickOk}
          onClickCancel={(e: any) => {
            onClickCancel(e)
            dispatch(closeInstanceModal())
          }}
        >
          {content}
        </GenericModal>
      ) : (
        <GenericModalAlert
          open={isOpen}
          title={title}
          subtitle={subtitle}
          icon={icon}
          description={description}
          okText={okText}
          cancelText={cancelText}
          onClickOk={onClickOk}
          isLoading= {isLoading}
          onClickCancel={(e: any) => {
            onClickCancel(e)
            dispatch(closeInstanceModal())
          }}
        >
          {content}
        </GenericModalAlert>
      )}
    </>
  )
}

export default InstanceModal;
