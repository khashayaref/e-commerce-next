import nc from 'next-connect';
import Product from '../../../models/Product';
import db from '../../../utils/db';

// using next-connect instead of express. because it is 5 times faster than express
const handler = nc({});
handler.get(async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  await db.disconnect();
  res.send(product);
});

export default handler;
