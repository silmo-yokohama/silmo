import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import MainLayout from '../../../component/layouts/MainLayout';

const mockStore = configureStore([]);

describe('MainLayoutコンポーネント', () => {
  // モックストアの作成
  const createStore = (initialState = { theme: { activeTheme: 'light' } }) => {
    return mockStore(initialState);
  };

  it('子要素が正しくレンダリングされること', () => {
    const store = createStore();

    const { getByText } = render(
      <Provider store={store}>
        <MainLayout>
          <div>テストコンテンツ</div>
        </MainLayout>
      </Provider>
    );

    // 子要素のテキストが存在することを確認
    expect(getByText('テストコンテンツ')).toBeInTheDocument();
  });

  it('マウント時にsetThemeアクションがディスパッチされること', () => {
    const store = createStore();

    render(
      <Provider store={store}>
        <MainLayout>
          <div>テストコンテンツ</div>
        </MainLayout>
      </Provider>
    );

    // ディスパッチされたアクションを確認
    const actions = store.getActions();
    expect(actions[0].type).toBe('theme/setTheme');
  });
});
