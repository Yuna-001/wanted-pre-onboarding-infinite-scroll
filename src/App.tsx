import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { getMockData } from "./mocks/mockProductData";
import classes from "./App.module.css";
import ProductData from "./models/productData";
import Product from "./components/Product";

function App() {
  const [page, setPage] = useState<number>(0);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isLastPage = useRef<boolean>(false);

  const totalPrice = useMemo(
    () => products.reduce((total, current) => total + current.price, 0),
    [products]
  );

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const { datas, isEnd } = (await getMockData(page)) as {
      datas: Array<ProductData>;
      isEnd: boolean;
    };

    isLastPage.current = isEnd;
    setProducts((prevArr) => [...prevArr, ...datas]);
    setIsLoading(false);
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [fetchData, page]);

  useEffect(() => {
    return () => {
      setProducts([]);
    };
  }, []);

  const handleClick = () => {
    if (!isLastPage.current) setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <h2 className={classes.total}>Total : ${totalPrice}</h2>
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
      {isLoading ? (
        <div className={classes.loading}>Loading...</div>
      ) : (
        <button onClick={handleClick} className={classes.loading}>
          더 불러오기
        </button>
      )}
    </>
  );
}

export default App;
