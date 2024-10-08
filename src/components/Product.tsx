import { FC } from "react";

interface DataProps {
  productName: string;
  price: number;
  boughtDate: string;
}

const Product: FC<DataProps> = ({ productName, price, boughtDate }) => {
  const date = new Date(boughtDate).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <li className="product">
      <h3>
        {productName} (${price})
      </h3>
      <div>{date}</div>
    </li>
  );
};

export default Product;
