import type ICategory from "../../../../entities/category/model/ICategory";

export default interface IAppContext {
    categories: Array<ICategory> | null;
    setCategories: (categories: Array<ICategory> | null) => void
}