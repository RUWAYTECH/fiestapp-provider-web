import React from 'react';
import { Grid, Typography, Breadcrumbs, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface BreadCrumbProps {
  pageTitle: string;
  pageSubtitle: string;
  pageUrl: string;
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({ pageTitle, pageSubtitle, pageUrl }) => {
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate(pageUrl);
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={3} lg={4} marginY={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" onClick={handleClick} href={pageUrl}>
            {pageTitle}
          </Link>
          <Typography color="textPrimary">{pageSubtitle}</Typography>
        </Breadcrumbs>
      </Grid>
    </Grid>
  );
};

export default BreadCrumb;