import { Fragment } from "react";
import { useSelector } from "react-redux";

// import { CategoriesContext } from "../../contexts (no longer in use)/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component"; 
import { selectCategoriesMap } from "../../store/categories/categories.selector";

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap)
    // const { categoriesMap } = useContext(CategoriesContext)

    return (
        <Fragment>
            {Object.keys(categoriesMap).map((title) => {
                const products = categoriesMap[title];

                return <CategoryPreview key={title} title={title} products={products} />
            })};
        </Fragment>
    );
};

export default CategoriesPreview;