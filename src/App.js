import { useState } from 'react';
import {
  useGetProductsQuery,
  useAddProductMutation,
  useRemoveProductMutation,
} from './redux';

function App() {
  const [newProduct, setNewProduct] = useState('');
  const [limit, setLimit] = useState('');
  const { data = [], isLoading } = useGetProductsQuery(limit);
  const [addProduct] = useAddProductMutation();
  const [removeProduct] = useRemoveProductMutation();

  const handlerAddProduct = async () => {
    if (newProduct) {
      await addProduct({ name: newProduct }).unwrap();
      setNewProduct('');
    }
  };

  const handlerClickOnProduct = async (id) => {
    await removeProduct(id);
  };

  const productList = data.map((product) => (
    <li
      style={{ cursor: 'pointer' }}
      key={product.id}
      onClick={() => {
        handlerClickOnProduct(product.id);
      }}
    >
      {product.name}
    </li>
  ));

  return (
    <div>
      <input
        type="text"
        value={newProduct}
        onChange={(e) => setNewProduct(e.target.value)}
      />
      <button onClick={handlerAddProduct}>Add new product</button>

      <h3>Product list:</h3>
      {isLoading && <h4>Product list is loading...</h4>}
      <select
        name="limit"
        defaultValue={limit}
        onChange={(e) => setLimit(e.target.value)}
      >
        <option value="">all</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>

      <ul>{productList}</ul>
    </div>
  );
}

export default App;
