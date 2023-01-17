import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import ProductCard from "../../components/product-card/product-card.component copy";
import {
  selectCategoriesLoading,
  selectCategoriesMap,
} from "../../store/categories/categories.selector";
import Spinner from "../../components/spinner/spinner.component";
// import { CategoriesContext } from '../../contexts (no longer in use)/categories.context';

import "./category.style.scss";

const Category = () => {
  const { category } = useParams();
  console.log("re-rendering");
  // const { categoriesMap } = useContext(CategoriesContext);
  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState(categoriesMap[category]);
  const isLoading = useSelector(selectCategoriesLoading);

  useEffect(() => {
    console.log("useEffect");
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="category-container">
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )}
    </>
  );
};

export default Category;
