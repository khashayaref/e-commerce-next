import styles from './payment.module.css';
import {
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import CheckoutWizard from '../components/checkoutWizard/CheckoutWizard';
import Layout from '../components/layout/Layout';
import { Store } from '../utils/Store';
import { useSnackbar } from 'notistack';

const Payment = () => {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('');
  const { state, dispatch } = useContext(Store);
  const {
    cart: { shippingAddress },
  } = state;
  useEffect(() => {
    if (!shippingAddress.address) {
      router.push('/shipping');
    } else {
      setPaymentMethod(JSON.parse(Cookies.get('paymentMethod')) || '');
    }
  }, []);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const onSubmitHandler = (e) => {
    closeSnackbar();
    e.preventDefault();
    if (!paymentMethod) {
      enqueueSnackbar('Payment Method Is Required!', { variant: 'error' });
    } else {
      dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod });
      Cookies.set('paymentMethod', JSON.stringify(paymentMethod));
      router.push('/placeorder');
      console.log(Cookies.get('paymentMethod'));
    }
  };
  return (
    <Layout title="Payment Mehtod">
      <CheckoutWizard activeStep={2}></CheckoutWizard>
      <form onSubmit={onSubmitHandler} className={styles.form}>
        <Typography component="h1" variant="h1">
          Payment Method
        </Typography>
        <List>
          <ListItem>
            <FormControl component="fieldset">
              <RadioGroup
                aria-labelledby="Payment Method"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  label="PayPal"
                  value="PayPal"
                  control={<Radio color="success" />}
                />
                <FormControlLabel
                  value="Stripe"
                  label="Stripe"
                  control={<Radio color="success" />}
                />
                <FormControlLabel
                  value="Cash"
                  label="Cash"
                  control={<Radio color="success" />}
                />
              </RadioGroup>
            </FormControl>
          </ListItem>
          <ListItem>
            <Button color="primary" type="submit" fullWidth variant="contained">
              Continue
            </Button>
          </ListItem>
          <ListItem>
            <Button
              fullWidth
              type="button"
              variant="contained"
              onClick={() => router.push('/shipping')}
            >
              Back
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
};

export default Payment;
