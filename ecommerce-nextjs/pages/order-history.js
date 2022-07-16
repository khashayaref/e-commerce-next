import {
  Button,
  Card,
  CircularProgress,
  Grid,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext, useReducer } from 'react';
import { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import { getError } from '../utils/error';
import { Store } from '../utils/Store';
import styles from './orderHistory.module.css';
import NextLink from 'next/link';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, orders: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const OrderHistory = () => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [isSSR, setIsSSR] = useState(true);
  const router = useRouter();

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    orders: [],
  });

  useEffect(() => {
    setIsSSR(false);
  }, []);
  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    }
    const fetchOrders = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/history`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchOrders();
  }, []);
  return (
    !isSSR && (
      <Layout title="Order History">
        <Grid container spacing={1}>
          <Grid item md={3} xs={12}>
            <Card className={styles.section}>
              <List>
                <NextLink href="/profile" passHref>
                  <ListItemButton component="a">
                    <ListItemText primary="User Profile"></ListItemText>
                  </ListItemButton>
                </NextLink>
                <NextLink href="/order-history" passHref>
                  <ListItemButton selected={true} component="a">
                    <ListItemText primary="Order History"></ListItemText>
                  </ListItemButton>
                </NextLink>
              </List>
            </Card>
          </Grid>
          <Grid item md={9} xs={12}>
            <Card className={styles.section}>
              <List>
                <ListItem>
                  <Typography component="h1" variant="h1">
                    Order History
                  </Typography>
                </ListItem>
                <ListItem>
                  {loading ? (
                    <CircularProgress />
                  ) : error ? (
                    <Typography className={styles.error}>{error}</Typography>
                  ) : (
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>DATE</TableCell>
                            <TableCell>TOTAL</TableCell>
                            <TableCell>PAID</TableCell>
                            <TableCell>DELIVERED</TableCell>
                            <TableCell>ACTION</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {orders.map((order) => (
                            <TableRow key={order._id}>
                              <TableCell>
                                {order._id.substring(20, 24)}
                              </TableCell>
                              <TableCell>{order.createdAt}</TableCell>
                              <TableCell>{order.totalPrice}</TableCell>
                              <TableCell>
                                {order.isPaid
                                  ? `paid at ${order.paidAt}`
                                  : 'not paid '}
                              </TableCell>
                              <TableCell>
                                {order.isDeliverde
                                  ? `delivered at ${order.deliveredAt}`
                                  : 'not delivered'}
                              </TableCell>
                              <TableCell>
                                <NextLink href={`/order/${order._id}`} passHref>
                                  <Link>
                                    <Button variant="contained">Details</Button>
                                  </Link>
                                </NextLink>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      </Layout>
    )
  );
};

export default OrderHistory;
