import React from 'react';
import { createElement } from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const list = store.getState().list;
  
  function countToStr(count) {
    let txt;
    let value = count % 100;
    (value >= 5 && value <= 20) ? txt = 'раз' : (value = value % 10);
    value == 1 ? txt = 'раз' : (value >= 2 && value <= 4) ? txt = 'раза' : txt = 'раз';

    return count + " " + txt;
  }

  return (
    <div className='App'>
      <div className='App-head'>
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className='App-controls'>
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className='App-center'>
        <div className='List'>{
          list.map(item =>
            <div key={item.code} className='List-item'>
              <div className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={() => store.selectItem(item.code)}>
                <div className='Item-code'>{item.code}</div>
                <div className='Item-content'>
                  <div className='Item-title'>{item.title}</div>
                  {item.selectionCount && item.selectionCount > 0 && <> | Выделяли {countToStr(item.selectionCount)}</>}
                </div>

                <div className='Item-actions'>
                  <button onClick={() => store.deleteItem(item.code)}>
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
