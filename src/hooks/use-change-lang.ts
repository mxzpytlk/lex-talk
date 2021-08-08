import { useContext } from 'react';
import { Context } from '../';
import { useTranslation } from 'react-i18next';
import { Language } from '../core/enums/languages';

export function useChangeLang(): (lang: Language) => void {
	const [, i18n] = useTranslation();
	const { store } = useContext(Context);

	return (lang: Language) => {
		i18n.changeLanguage(lang);
		store.configStore.setLang(lang);
	};
}
