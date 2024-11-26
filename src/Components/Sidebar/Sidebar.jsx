import * as React from 'react';
import PropTypes from 'prop-types';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WidgetsIcon from '@mui/icons-material/Widgets';
import BookIcon from '@mui/icons-material/Book';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import Dashboard from '../Dashboard/Dashboard';
import Debts from '../Debts/Debts';
import FinishProducts from '../FinishProduct/FinishProducts';
import ProductPage from '../Products/ProductPage/ProductPage';
import Product from '../Products/Product';

const NAVIGATION = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'products',
    title: 'Products',
    icon: <WidgetsIcon />,
  },
  {
    segment: 'debts',
    title: 'Debts',
    icon: <BookIcon />,
  },
  {
    segment: 'finish_products',
    title: 'Finish Product',
    icon: <ProductionQuantityLimitsIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});



function DashboardLayoutWithRouting(props) {
  const { window } = props;
  const router = useDemoRouter('/dashboard');
  const demoWindow = window !== undefined ? window() : undefined;

  const pageComponents = {
    '/dashboard': <Dashboard />,
    '/products': <Product />, // <Product />,
    '/debts': <Debts />,
    '/finish_products': <FinishProducts />,
  };

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        title: 'MUI',
      }}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        {pageComponents[router.pathname] || <Dashboard />}
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutWithRouting.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutWithRouting;