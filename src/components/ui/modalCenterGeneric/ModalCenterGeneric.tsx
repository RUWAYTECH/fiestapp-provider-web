import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Modal, Typography, Box } from '@mui/material';

interface ModalPrincipalProps {
  open: boolean;
  title?: string | ReactNode;
  subTitle?: string | ReactNode;
  icon?: ReactNode;
  children?: ReactNode;
  ModalProps?: any;
}

const ModalCenterGeneric: React.FC<ModalPrincipalProps> = ({
  open,
  title,
  subTitle,
  icon,
  children,
  ...ModalProps
}) => {
  return (
    <Modal
      open={open}
      {...ModalProps}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: '96%',
          overflow: 'auto',
          maxWidth: '400px',
          bgcolor: 'background.default',
          boxShadow: 3,
          p: 2,
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          height: 'auto',
          maxHeight: '98vh',
        }}
      >
        <Box textAlign="center" mb={2}>
          {icon && <Box mb={2}>{icon}</Box>}
          {title && (
            <>
              <Typography variant="h6" style={{fontWeight: 'bold' }}>
                {title}
              </Typography>
            </>
          )}
          {subTitle && (
            <>
              <Typography variant="body1" style={{ marginTop: '30px',fontWeight: 'bold' }}>
                {subTitle}
              </Typography>
            </>
          )}
        </Box>
        <Box
          sx={{
            flex: '1 1 auto',
            overflow: 'auto',
            marginRight: '-10px',
            marginLeft: '-10px',
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#888',
              borderRadius: '9px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#555',
            },
          }}
        >
          {children}
        </Box>
      </Box>
    </Modal>
  );
};

ModalCenterGeneric.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  icon: PropTypes.element,
  ModalProps: PropTypes.object,
  children: PropTypes.node,
};

export default ModalCenterGeneric;