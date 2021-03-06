import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductsResponse } from "core/types/Product";
import ProductCard from "./components/ProductCard";
import { makeRequest } from "core/utils/request";
import ProductCardLoader from "./components/Loaders/ProductCardLoader";
import "./styles.scss";
import Pagination from "core/components/Pagination";

const Catalog = () => {
  const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
  const [isLoading, setIsLoading] = useState(false);

  console.log(productsResponse);

  useEffect(() => {
    const params = {
      page: 0,
      linesPerPage: 12,
    };
    // iniciar o loader
    setIsLoading(true);
    makeRequest({ url: "/products", params })
      .then((response) => setProductsResponse(response.data))
      .finally(() => {
        //finalizar o loader
        setIsLoading(false);
      })
  }, []);

  return (
    <div className="catalog-container">
      <h1 className="catalog-title">Catálogo de produtos</h1>
      <div className="catalog-products">
        {isLoading ? <ProductCardLoader /> : (
          productsResponse?.content.map((product) => (
            <Link to={`/products/${product.id} `} key={product.id}>
              <ProductCard product={product} />
            </Link>
          ))
        )}
      </div>
      <Pagination />
    </div>
  );
};

export default Catalog;
