import React from 'react'
import {Modal, Typography, Button} from '@mui/material'
import PropTypes from 'prop-types'
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

/* import useStyles from './GenericModal.styles' */

const isJsxElement = (element: any, fallback = (arg: any) => null) => {
  
  if (React.isValidElement(element)) return element
  
  return fallback(element)
}

const titleElement = (el: any) => (
  <Typography variant="h6">{el}</Typography>
);

const subtitleElement = (el: any) => (
  <Typography align="center" variant="h3">{el}</Typography>
);

const GenericModal: React.FC<any> = ({
  title,
  subtitle,
  description,
  icon = null,
  okText,
  cancelText,
  onClickOk,
  onClickCancel,
  customActions,
  children,
  size,
  ...ModalProps
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Modal {...ModalProps} sx={{height:'100%'}}>
      <div style={{
        background: theme.palette.background.default,
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: theme.shadows[5],
        top: '50%',
        left: '50%',
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        minHeight: '10rem',
        borderRadius: '0.6875rem',
        padding: '15px',
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        width: isSmallScreen ? '90%' : size||'70%',
      }} >
        <div style={{
          textAlign: 'center',
          //display: 'grid',
          //gridRowGap: '1.25rem',
          justifyItems: 'center',
          width: '100%',
          overflowY: 'auto',
          alignContent: 'start',
          //minHeight: '50vh',
          maxHeight: '92vh',
        }}>
          {icon && <div>{icon}</div>}
          {title && <div>
            {isJsxElement(titleElement(title))}
          </div>}
          {subtitle && (
            <div>
              {isJsxElement(subtitleElement(subtitle))}
            </div>
          )}
          {description && (
            <div>
              {isJsxElement((description: any, el: any) => (
                <Typography align="left" >{el}</Typography>
              ))}
            </div>
          )}
          {children}
          {(okText || cancelText) && (
            <div style={{
              marginTop: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                display: 'grid',
                gridAutoFlow: 'column',
                gridGap: '1.75rem',
                width: '100%',
                justifyContent: 'center',
              }}>
                {cancelText && (
                  <Button
                    fullWidth
                    onClick={onClickCancel}
                    variant="outlined"
                    color='secondary'
                    size="small"
                    data-testid="backo-modal-cancelButton"
                    sx={{
                      fontSize: 16,
                      width: 187,
                      height:50,
                    }}
                  >
                    {cancelText}
                  </Button>
                )}
                {okText && (
                  <Button
                    fullWidth
                    onClick={onClickOk}
                    variant="contained"
                    size="small"
                    data-testid="backo-modal-okButton"
                    sx={
                      {
                        backgroundColor: 'primary.main',
                        color: '#fff',
                        
                        fontSize: 16,
                        width: 187,
                        height:50,
                      }
                    }
                  >
                    {okText}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}

GenericModal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  subtitle2: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  icon: PropTypes.element,
  onClickOk: PropTypes.func,
  onClickCancel: PropTypes.func,
  ModalProps: PropTypes.shape({}),
  children: PropTypes.node,
}

export default GenericModal
