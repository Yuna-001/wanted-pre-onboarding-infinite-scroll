import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { getMockData } from "./mocks/mockProductData";
import ProductData from "./models/productData";
import ProductList from "./components/ProductList";
import useIntersectionObserver from "./hooks/useIntersectionObserver";

function App() {
  const [page, setPage] = useState<number>(0);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const callback = useCallback(() => setPage((prevPage) => prevPage + 1), []);
  const [observe, unobserve] = useIntersectionObserver(callback);

  const target = useRef(null);

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

    setProducts((prevArr) => [...prevArr, ...datas]);
    setIsLoading(false);

    if (isEnd && target.current) unobserve(target.current);
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [fetchData, page]);

  useEffect(() => {
    return () => {
      setProducts([]);
    };
  }, []);

  useEffect(() => {
    if (target.current) {
      if (isLoading) {
        unobserve(target.current);
      } else {
        observe(target.current);
      }
    }
  }, [isLoading]);

  return (
    <>
      <h2 className="total">Total : ${totalPrice}</h2>
      <main>
        <ProductList products={products} />
        <div ref={target} className="loading">
          {isLoading && "Loading..."}
        </div>
      </main>
    </>
  );
}

export default App;
