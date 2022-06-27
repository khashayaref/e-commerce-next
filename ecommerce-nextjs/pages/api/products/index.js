import nc from 'next-connect';
import Product from '../../../models/Product';
import db from '../../../utils/db';

// using next-connect instead of express. because it is 5 times faster than express
const handler = nc({});
handler.get(async (req, res) => {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect();
  res.send(products);
});

export default handler;
