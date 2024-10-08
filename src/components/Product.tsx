import { FC } from "react";

interface DataProps {
  productName: string;
  price: number;
  boughtDate: string;
}

const Product: FC<DataProps> = ({ productName, price, boughtDate }) => {
  return (
    <li className="product">
      <div>
        <div>{productName}</div>
        <div>{price}</div>
        <div>{boughtDate}</div>
      </div>
    </li>
  );
};

export default Product;
