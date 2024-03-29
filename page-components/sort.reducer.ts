import { SortEnum } from '@/components/Sort/Sort.props';
import { ProductsModel } from '@/interfaces/products.interface';

export type SortActions = { type: SortEnum.Price } | { type: SortEnum.Rating } | { type: string, products: ProductsModel[] };

export interface SortReducerState {
	sort: SortEnum,
	products: ProductsModel[]
}

export const sortReducer = (state: SortReducerState, action: SortActions): SortReducerState => {
	switch (action.type) {
		case SortEnum.Rating:
			return {
				sort: SortEnum.Rating,
				products: state.products.sort((a, b) => a.initialRating > b.initialRating ? -1 : 1)
			};
		case SortEnum.Price:
			return {
				sort: SortEnum.Price,
				products: state.products.sort((a, b) => a.price > b.price ? 1 : -1)
			};
		case "reset":
			return {
				sort: SortEnum.Rating,
				products: action.products.sort((a, b) => a.initialRating > b.initialRating ? -1 : 1)
			};
		default: throw new Error('Не верный тип сортировки');
	}
};