import { loader } from 'graphql.macro';
import { makeAutoObservable } from 'mobx';
import { client } from '../../graphql/';
import { Language } from '../../core/enums/languages';
import { ILexTalkConfig } from '../../core/data/lex-talk-config';
import { DEFAULT_LANG } from '../../i18n';
import { LocalStorageKey } from '../../core/enums/local-storage-key';
import { setInLocalStorage } from '../../core/utils/local-storage.utils';

const UPDATE_CONFIG_MUTATION = loader('../../graphql/mutations/update-config.graphql');
const CONFIG_QUERY = loader('../../graphql/queries/config.graphql');

interface IUpdateConfigMutation {
  updateConfig: ILexTalkConfig;
}

interface IConfigQuery {
  getConfig: ILexTalkConfig;
}

export class LexTalkConfigStore implements ILexTalkConfig {
  public lang = DEFAULT_LANG;
  public darkMode = false;

  constructor() {
    makeAutoObservable(this);
  }

  public setLang(lang: Language): void {
    setInLocalStorage(LocalStorageKey.LANG, lang);
    this.lang = lang;
  }

  public setDakMode(darkMode: boolean) {
    this.darkMode = darkMode;
  }

  public async updateConfig(config: Partial<ILexTalkConfig>): Promise<void> {
    try {
      const newConfig = await client.mutate<IUpdateConfigMutation>({
        mutation: UPDATE_CONFIG_MUTATION,
        variables: { ...config }
      });
      const { lang, darkMode } = newConfig.data?.updateConfig as ILexTalkConfig;
      this.setLang(lang);
      this.setDakMode(darkMode);
    } catch(e) {}
  }

  public async loadConfig(): Promise<void> {
    const config = await client.query<IConfigQuery>({
      query: CONFIG_QUERY
    });
    if (!config.data) {
      return;
    }
    const { lang, darkMode } = config.data?.getConfig;
    this.lang = lang || this.lang;
    this.darkMode = darkMode === null ? this.darkMode : darkMode;
  }
}