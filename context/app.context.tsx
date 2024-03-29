import { MenuItem } from '@/interfaces/menu.interface';
import { menuCategory } from '@/interfaces/page.interface';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';

export interface IAppContext {
	menu: MenuItem[],
	firstCategory: menuCategory,
	setMenu?: (newMenu: MenuItem[]) => void
}

export const AppContext = createContext<IAppContext>({ menu: [], firstCategory: menuCategory.Courses });

export const AppContextProvider = ({ menu, firstCategory, children }: PropsWithChildren<IAppContext>): JSX.Element => {
	const [menuState, setMenuState] = useState<MenuItem[]>(menu);
	useEffect(() => {
		setMenuState(menu);
	}, [menu]);

	const setMenu = (newMenu: MenuItem[]) => {
		setMenuState(newMenu);
	};
	return (
		<AppContext.Provider value={{ menu: menuState, firstCategory, setMenu }}>
			{children}
		</AppContext.Provider>
	);
};