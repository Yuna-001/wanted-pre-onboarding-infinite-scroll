import { FC } from "react";
import classes from "./ProductList.module.css";
import Product from "./Product";
import ProductData from "../models/productData";

const ProductList: FC<{ products: ProductData[] }> = ({ products }) => {
  return (
    <ul className={classes.products}>
      {products.map(({ productId, productName, price, boughtDate }) => (
        <Product
          key={productId}
          productName={productName}
          price={price}
          boughtDate={boughtDate}
        />
      ))}
    </ul>
  );
};

export default ProductList;
