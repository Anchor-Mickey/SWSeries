const storage = localStorage;　//storage という定数に localStorage オブジェクトを代入

const todo = document.getElementById('todo');      // TODO
const submit = document.getElementById('submit');  // 登録ボタン

let list = [];  // TODOリストのデータ constからletへ変更

submit.addEventListener('click', () => {
  const item = {}; // 入力値を一時的に格納するオブジェクト
  item.todo = todo.value;
  console.log(item); // 確認してみる
  
  todo.value = '';
  
  list.push(item);
  storage.itemList = JSON.stringify(list);
  
});