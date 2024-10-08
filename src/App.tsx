import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { getMockData } from "./mocks/mockProductData";
import ProductData from "./models/productData";
import ProductList from "./components/ProductList";

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
      <h2 className="total">Total : ${totalPrice}</h2>
      <ProductList products={products} />
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <button onClick={handleClick} className="loading">
          더 불러오기
        </button>
      )}
    </>
  );
}

export default App;
