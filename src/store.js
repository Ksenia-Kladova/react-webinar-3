import { getNewId } from './utils.js';
/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.listLength = initState.list.length + 1;
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    const newItem = {
      code: this.listLength++,
      title: 'Новая запись'
    };

    this.setState({
      ...this.state,
      list: [...this.state.list, newItem]
    });
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Выделение записи по коду
   * @param code
   */

  
  selectItem(code) {
    const updatedList = this.state.list.map(item => {
      if (item.code === code) {
        item.selected = !item.selected;
        item.selectionCount = item.selected ? (item.selectionCount ? item.selectionCount + 1 : 1):(item.selectionCount ? item.selectionCount:0);
      } else {
        item.selected = false;
      }
      return item;
    });

    this.setState({
      ...this.state,
      list: updatedList
    });
  }
}

export default Store;
