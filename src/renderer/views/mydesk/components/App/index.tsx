import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { Button } from '~/renderer/components/Button';
import { Container, Content, LeftContent } from '~/renderer/components/Pages';
import { WebUIStyle } from '~/renderer/mixins/default-styles';
import store from '../../store';
import { ProfileNavigationDrawer } from '../profile-drawer';

export const NormalButton = ({
  children,
  onClick,
}: {
  children?: any;
  onClick?: any;
}) => {
  return (
    <Button
      background={
        store.theme['dialog.lightForeground']
          ? 'rgba(255, 255, 255, 0.08)'
          : 'rgba(0, 0, 0, 0.08)'
      }
      onClick={onClick}
      foreground={store.theme['dialog.lightForeground'] ? 'white' : 'black'}
    >
      {children}
    </Button>
  );
};

const onBlur = () => {
  store.menuVisible = false;
};

const onMakeDefaultClick = () => {
  store.settings.searchEngine = store.settings.searchEngines.findIndex(
    (x) => x.keyword === store.editedSearchEngine.keyword,
  );
  store.menuVisible = false;
};

const onRemoveClick = () => {
  store.settings.searchEngines = store.settings.searchEngines.filter(
    (x) => x.keyword !== store.editedSearchEngine.keyword,
  );
  store.save();
  store.menuVisible = false;
};

const onEditClick = () => {
  store.menuVisible = false;
  store.dialogVisible = true;
  store.dialogContent = 'edit-search-engine';
  store.searchEngineInputRef.current.value = store.editedSearchEngine.name;
  store.searchEngineKeywordInputRef.current.value =
    store.editedSearchEngine.keyword;
  store.searchEngineUrlInputRef.current.value = store.editedSearchEngine.url;
};

const onSaveClick = () => {
  const name = store.searchEngineInputRef.current.value.trim();
  const keyword = store.searchEngineKeywordInputRef.current.value.trim();
  const url = store.searchEngineUrlInputRef.current.value.trim();

  const item = store.settings.searchEngines.find((x) => x.keyword === keyword);

  if (keyword !== '' && name !== '' && url !== '') {
    if (store.dialogContent === 'edit-search-engine') {
      item.name = name;
      item.keyword = keyword;
      item.url = url;
      store.dialogVisible = false;
    } else if (store.dialogContent === 'add-search-engine') {
      if (!item) {
        store.settings.searchEngines.push({
          name,
          keyword,
          url,
        });
        store.dialogVisible = false;
      }
    }
    store.save();
  }
};

export default observer(() => {
  const { selectedSection } = store;

  let dialogTitle = '';

  if (store.dialogContent === 'edit-search-engine') {
    dialogTitle = 'Edit search engine';
  } else if (store.dialogContent === 'add-search-engine') {
    dialogTitle = 'Add search engine';
  }

  return (
    <ThemeProvider
      theme={{ ...store.theme, dark: store.theme['pages.lightForeground'] }}
    >
      <Container
        onMouseDown={(e) => (store.dialogVisible = false)}
        darken={store.dialogVisible}
      >
        <WebUIStyle />
        <ProfileNavigationDrawer></ProfileNavigationDrawer>
        <Content>
          <LeftContent style={{ marginLeft: 18, marginTop: 18 }}>
            <h1>Hello</h1>
          </LeftContent>
        </Content>
      </Container>
    </ThemeProvider>
  );
});
