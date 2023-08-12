//6/9金

let data = localStorage.getItem('seriesList');
data = JSON.parse(data);
console.log(data);


const table = document.querySelector('table');
const tr = document.createElement('tr');
// const header = ['巻数', 'タイトル', '発売日', 'あらすじ'];

// for (const h of header) {
//   const th = document.createElement('th');
//   th.textContent = h;
//   tr.appendChild(th);
// }

// table.appendChild(tr);


const hpList = data ;


for (const hp of hpList) {
  const tr = document.createElement('tr');
  for (const prop in hp) {
    const td = document.createElement('td');
    td.textContent = hp[prop];
    tr.appendChild(td);
  }
  table.appendChild(tr);
}


function logOff() {
  console.log('ログアウトしました')
  location.href = "../html/A01_LogIn.html";
}

function newCreate() {
  console.log('新規作成ボタンが押されました')
  location.href = "../html/C01_New.html"
}


// function getStorage() {
//   let volume = localStorage.getItem("volume");
//   if (volume === null) {
//     return [];
//   } else {
//     return JSON.parse(volume);
//   }
//   console.log(volume);
// };

// function list() {
//   let div = document.getElementsByClassName("volume");
//   console.log(div);
// };

// let list = [];

// window.addEventListener('DOMContentLoaded', function() {
//   const json = storage.seriesList;　//ストレージデータの読み込み
//   list = JSON.parse(json);//JSONをオブジェクトの配列にして配列リストに代入
//   const item = {}; // 入力値を一時的に格納するオブジェクト
//   item.volume = volume.value;
//   item.title = title.value;
//   item.title = release.value;
//   item.title = synopsis.value;
  
//   console.log(item);
//   if (json == undefined) {
//     return; //ストレージに何もない場合の事を考慮
//   }
 
// });

//6/8(木)AM
//ローカルストレージへ保存していた
//「seriesList」のJSONデータを取得して
//配列・オブジェクト型のデータに戻す


function getStorage() {
//getDATEにローカルストレージの「seriesList」を取得し代入
let getDATA = localStorage.getItem("seriesList");
//代入した「seriesList」を配列・オブジェクト型データに戻す
getDATA = JSON.parse(getDATA);
//console.logに出力
console.log(getDATA);
//成功しました！！！！！！！！
  
};


//ここで、複数のデータが保存できるか確認しに戻ります。

//・・・新規作成画面から「保存」ボタン押下でこの画面へ遷移してしまうと
//複数データの保存ができないので
//いったん解除して、複数データを保存した状態で戻ってきました。
//結果、console.logには保存した複数データが出力されておりましたので
//この状態でHTMLへの出力を試みます。



// const contents = document.createElement("contents");

// for (const prop in getDATE) {
//   const td = document.createElement("td");
//   td.textContent = getDATE[prop];
//   p.appendchild(td);
// }

// table.append(contents);

// let contents = document.getElementById("contents_row");
// contents.innerHTML = "";
// contents_row = getStorage();
// for (let i = 0; i < contents.length; i++) {
//   let row = contents[i];
//   let div = document.createElement("div");
//   div.textContent = row;
//   div.dateset.index = i;
//   contents.appendChild(div);
// }


//6/12月：なんとかstyleが見られるものになった(？）
//thはtext-align：left;で左寄せに成功
//tr垂直方向がcenterになるのはvertical-align: top;で上に詰めるのに成功
//trの間のスペースはborder-spacing:  0 1rem;で上下のスペースをけることに成功
//相変わらず境界線がうまくいっていませんが、
//tableのままだとおそらくできない気がするのでこのまま進むことに

//6/12月：続いて「検索」ができるように記述したい
//一覧の内容はローカルストレージにあるので
//検索ボタン押下で一覧表示を一致するもののみに変更、ということにできないだろうか・・・



//6/14水：タイトルで検索の実装

let sarch = document.querySelectorAll("tr")
console.log(sarch);
//


//タイトルで検索
//inputでEnterが押されたら、filterRows()が呼ばれるようにしておく。
const input = document.querySelector('input');
input.addEventListener('keypress', () => {
  if (event.key === 'Enter') filterRows();
});

//buttonが押された時も、filterRows()が呼ばれるようにしておく。
const button = document.querySelector('.searchBtn');
button.onclick = filterRows;

//filterRows()の中では、まずinputタグの入力を取り出して、正規表現オブジェクトを作成する。第2引数の’i’は、大文字と小文字を区別しない設定。

function filterRows() {
  const keyword = document.querySelector('input').value;
  const regex = new RegExp(keyword, 'i');
  
  //tableの各行を取り出し、いったん非表示にする。
  for (let i = 1; i < table.rows.length; i++) {
    const row = table.rows[i];
    row.style.display = 'none';
    
    //その行の各列の値を正規表現と比較し、1つでもマッチしたら、その行が表示されるようにする。
    for (let j = 0; j < row.cells.length; j++) {
      if (row.cells[j].textContent.match(regex)) {
        row.style.display = 'table-row';
        break;
      }
    }
  }
}


//6/20火ソート機能
document.querySelectorAll('th').forEach(th => th.onclick = sortRows);
                          
function sortRows() {
  const table = document.querySelector("table");
  const records = [];
  for (let i = 1; i < table.rows.length; i++) {
    const record = {};
    record.row = table.rows[i];
    record.key = table.rows[i].cells[this.cellIndex].textContent;
    records.push(record);
  }
  records.sort(compareKeys);
  for (let i = 0; i < records.length; i++) {
    table.appendChild(records[i].row);
  }
}

function compareKeys(a, b) {
  if (a.key < b.key) return -1;
  if (a.key > b.key) return 1;
  return 0;
}

const title = document.getElementById('title');
title.addEventListener("click", () => {
  console.log('クリックされました！');
});



