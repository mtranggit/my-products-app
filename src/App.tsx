import {PRODUCTS} from "../data";

function App() {
  return (
    <>
      {PRODUCTS.map((product) => (
        <div key={product.index}>
          <img alt={product.productName} src={`assets/${product.productImage}`} className="" />
          <p>Name: {product.productName}</p>
          <p>Price: {product.price}</p>
        </div>
      ))}
    </>
  );
}

export default App;
