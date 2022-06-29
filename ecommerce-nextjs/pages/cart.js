import {
  Grid,
  TableContainer,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link,
  Select,
  MenuItem,
  Button,
  Card,
  List,
  ListItem,
} from '@mui/material';
import dynamic from 'next/dynamic';
import { useContext } from 'react';
import Layout from '../components/layout/Layout';
import { Store } from '../utils/Store';
import NextLink from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useEffect } from 'react';

const CartScreen = ({}) => {
  const [isSSR, setIsSSR] = useState(true);
  const { state } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  useEffect(() => {
    setIsSSR(false);
  }, []);
  return (
    !isSSR && (
      <Layout title="Shopping Cart">
        <Typography component="h1" variant="h1">
          Shopping Cart
        </Typography>
        {cartItems.length === 0 ? (
          <div>
            Cart Is Empty<NextLink href="/">Go To Home</NextLink>
          </div>
        ) : (
          <Grid container spacing={1}>
            <Grid item md={9} xs={12}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell>
                          <NextLink href={`/product/${item.slug}`} passHref>
                            <Link>
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={50}
                                height={50}
                              ></Image>
                            </Link>
                          </NextLink>
                        </TableCell>

                        <TableCell>
                          <NextLink href={`/product/${item.slug}`} passHref>
                            <Link>
                              <Typography>{item.name}</Typography>
                            </Link>
                          </NextLink>
                        </TableCell>

                        <TableCell align="right">
                          <Select value={item.quantity}>
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <MenuItem key={x + 1} value={x + 1}>
                                {x + 1}
                              </MenuItem>
                            ))}
                          </Select>
                        </TableCell>

                        <TableCell align="right">${item.price}</TableCell>

                        <TableCell align="right">
                          <Button color="secondary" variant="contained">
                            x
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item md={3} xs={12}>
              <Card>
                <List>
                  <ListItem>
                    <Typography variant="h2">
                      SubTotal (
                      {cartItems.reduce(
                        (prev, next) => prev + next.quantity,
                        0
                      )}{' '}
                      items) : ${' '}
                      {cartItems.reduce(
                        (prev, next) => prev + next.quantity * next.price,
                        0
                      )}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Button color="primary" variant="contained" fullWidth>
                      Check Out
                    </Button>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        )}
      </Layout>
    )
  );
};

export default CartScreen;
