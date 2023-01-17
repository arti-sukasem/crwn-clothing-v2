// create a memorized selector - cache a previous value of something
import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

// cache a category array
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

// cache a category map (if no new category array, don't run a category map)
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);

export const selectCategoriesLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
)