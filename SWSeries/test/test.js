const storage = localStorage;　//storage という定数に localStorage オブジェクトを代入5/11

const table = document.querySelector('table');     // 表
const todo = document.getElementById('todo');      // TODO
const priority = document.querySelector('select'); // 優先度
const deadline = document.querySelector('input[type="date"]');  // 締切
const submit = document.getElementById('submit');  // 登録ボタン

let list = [];  // TODOリストのデータ constからletへ変更


document.addEventListener('DOMContentLoaded', () => {
  // 1. ストレージデータ（JSON）の読み込み
  const json = storage.todoList;
  if (json == undefined) {
    return;  // ストレージデータがない場合は何もしない
  }
  // 2. JSONをオブジェクトの配列に変換して配列listに代入
  list = JSON.parse(json);
  console.log(list);
  // 3. 配列listのデータを元にテーブルに要素を追加
  for (const item of list) {
    console.log(item);　//配列 list から一つずつ要素を取り出してみる
    addItem(item);
  }
});

const addItem = (item) => {
  const tr = document.createElement('tr');   // tr要素を生成
  
  // オブジェクトの繰り返しはfor-in文
  for (const prop in item) {
    const td = document.createElement('td'); // td要素を生成
    if (prop == 'done') { // 完了欄の場合
      const checkbox = document.createElement('input');  // 要素生成
      checkbox.type = 'checkbox';    // type属性をcheckboxに
      checkbox.checked = item[prop]; // checked属性を設定
      td.appendChild(checkbox);      // チェックボックスは HTML 要素なので td 要素の子要素として追加する必要
      checkbox.addEventListener('change', checkBoxListener);//5/16
    } else {
      td.textContent = item[prop];  // ブラケット記法
    }
    tr.appendChild(td);
  }
   
  table.append(tr);  // trエレメントをtable要素に追加
};

//以下5/16
const checkBoxListener = (ev) => {
  // 1-1. テーブルの全tr要素のリストを取得（＆配列に変換）
  const trList = Array.from(document.getElementsByTagName('tr'));
  // 1-2. チェックボックスの親（td）の親（tr）を取得
  //※イベントリスナーを関数定義して登録する場合には、別の関数（addItem）の中で定義された定数 checkbox が使えないので「ev.curentTarget 」を使用
  const currentTr = ev.currentTarget.parentElement.parentElement;
  // 1-3. 配列.indexOfメソッドで何番目（インデックス）かを取得
  //「indexOf メソッド」引数で与えられた配列要素のインデックスを取得するメソッド
  const idx = trList.indexOf(currentTr) - 1;
  // 2. 配列listにそのインデックスでアクセスしてdoneを更新
  list[idx].done = ev.currentTarget.checked;
  // 3. ストレージデータを更新
  storage.todoList = JSON.stringify(list);
};
//以上5/16


// ↓TODO登録ボタン
submit.addEventListener('click', () => {
  // ここに処理を書いていく
  const item = {}; // 入力値を一時的に格納するオブジェクト
  
  if (todo.value != '') {　//空欄で登録されたとき
    item.todo = todo.value;
  } else {
    window.alert('TODOを入力してください');
    return;
  }
  
  item.priority = priority.value; //初期値があるのでこのまま
  
  if (deadline.value != '') { //空欄で登録されたとき
    item.deadline = deadline.value;
  } else {
    const date = new Date(); // 本日の日付情報を取得
    item.deadline = date.toLocaleDateString(); // 日付の体裁を変更
  }
  
  item.done = false; // 完了はひとまずBoolean値で設定(チェックボックスがまだなので)
  
  console.log(item); // 確認してみる
  
  // 登録ボタンを押してデータをオブジェクトに代入したら、入力フォームを未入力の状態にリセットするように
  todo.value = '';
  priority.value = '普';
  deadline.value = '';
  
  
  
  //以下5/11
  //storage.todoList = JSON.stringify(item); // これだと一つしか記録できない
  //storage.todoList += JSON.stringify(item);  // += ではオブジェクトが文字列として連結されてしまうので読み込めない
  list.push(item);
  storage.todoList = JSON.stringify(list);
  
  addItem(item);
});

function GoList() {
    location.href = "t_table.html";
  };
  


//チェックボックスはできましたが、まだ連動していない

//絞り込み機能の追加
//優先度（高）で絞り込み
const filterButton_h = document.createElement('button'); // ボタン要素を生成
filterButton_h.textContent = '優先度（高）で絞り込み';//ボタンの中の文言
filterButton_h.id = 'priority_h';  // CSSでの装飾用
const div = document.querySelector('div');//mainを取得
div.appendChild(filterButton_h);//その子要素として追加

filterButton_h.addEventListener('click', () => {
  //table.textContent = '';  // table要素の子孫要素を空にする・・・これだとヘッダーも消してしまう
  //テーブルに含まれる tr 要素の NodeList を取得、同時に Array.from メソッドで配列に変換
  //※以下「TODO リストをヘッダー以外削除するコード」はのちに複数回使用するので関数化
  // const trList = Array.from(document.getElementsByTagName('tr'));
  // trList.shift();　//配列の shift メソッドで先頭の tr 要素（ヘッダー）を取り除いて
  // for (const tr of trList) {
  //   tr.remove();　//残った tr 要素を削除
  // }
  clearTable();//関数化した「TODO リストをヘッダー以外削除するコード」
  for (const item of list) { 
    if (item.priority == '高') {
      addItem(item);
    }
  }
});

//ページにはありませんが、ほかの絞りボタンも追加
//まず、「TODO リストをヘッダー以外削除するコード」を関数化

const clearTable = () => {
  const trList = Array.from(document.getElementsByTagName('tr'));
  trList.shift();　//配列の shift メソッドで先頭の tr 要素（ヘッダー）を取り除いて
  for (const tr of trList) {
    tr.remove();　//残った tr 要素を削除
  }
};

//優先度（普）で絞り込み
const filterButton_m = document.createElement('button'); // ボタン要素を生成
filterButton_m.textContent = '優先度（普）で絞り込み';//ボタンの中の文言
filterButton_m.id = 'priority_m';  // CSSでの装飾用
div.appendChild(filterButton_m);//その子要素として追加

filterButton_m.addEventListener('click', () => {
  clearTable();//関数化した「TODO リストをヘッダー以外削除するコード」
  for (const item of list) { 
    if (item.priority == '普') {
      addItem(item);
    }
  }
});

//優先度（低）で絞り込み
const filterButton_l = document.createElement('button'); // ボタン要素を生成
filterButton_l.textContent = '優先度（低）で絞り込み';//ボタンの中の文言
filterButton_l.id = 'priority_l';  // CSSでの装飾用
div.appendChild(filterButton_l);//その子要素として追加

filterButton_l.addEventListener('click', () => {
  clearTable();//関数化した「TODO リストをヘッダー以外削除するコード」
  for (const item of list) { 
    if (item.priority == '低') {
      addItem(item);
    }
  }
});

//完了チェックボックスを機能させる
//ボタンを追加
const remove = document.createElement('button');
remove.textContent = '完了したTODOを削除＆絞り込み解除';
remove.id = 'remove';  // CSS装飾用
const br = document.createElement('br'); // 改行
div.appendChild(br);
div.appendChild(remove);

//今回は配列 list の中身を直接更新
remove.addEventListener('click', () => {
  clearTable();  // TODOデータを一旦削除
  
  // 1. 未完了のTODOを抽出して定数listを置き換え
  //done が false のものを選ぶ、つまり「未完了の TODO を残す」
  list = list.filter((item) => item.done == false);
  // 2. 未完了のTODOデータをテーブルに追加
  for (const item of list) {
    addItem(item);
  }
  // 3. ストレージデータを更新
  storage.todoList = JSON.stringify(list);
});



//チェックボックスとの連動buttonは完成しましたが、、まだ連動していない
//5/12の部分までだと実質リストをすべて表示させるbuttonになっている・・・何かに応用できる？
//5/16・・・チェックを入れたToDoの削除は無事にできました・・・お手本があったので。
//5/16更新ボタンの設定を画面更新としてできないかを挑戦しています。うまくいくかどうか・・・、

//絞り込み解除用
const reload = document.createElement('button'); // ボタン要素を生成
reload.textContent = '絞り込み解除（画面の更新）';//ボタンの中の文言
reload.id = 'reload';  // CSSでの装飾用
div.appendChild(reload);//その子要素として追加

let btnReload = document.getElementById('reload');
btnReload.addEventListener('click', function() {
  window.location.reload();
});

//できたかなと思ったのですが、絞り込み解除ボタンを押したところでエラーになってしまってできず・・・

function back() {
    location.href = "t_touroku.html";
  };