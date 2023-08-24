const storage = localStorage;

const volume = document.getElementById('C_volume'); //巻数
const title = document.getElementById('C_title');//タイトル
const release = document.getElementById('C_release');//発売日
const synopsis = document.getElementById('C_synopsis');//あらすじ

let list = []; //内容を配列 listとして宣言

function save() {
  console.log("クリックされました"); 

  const item = {};

  item.volume = volume.value;
  item.title = title.value;
  item.release = release.value;
  item.synopsis = synopsis.value;
  
  console.log(item); 
  
  //フォーム内容をリセット
  volume.value = '';
  title.value = '';
  release.value = '';
  synopsis.value = '';
  
  list.push(item);  //配列リストに「item」をpush(追加)するための部分
  storage.seriesList = JSON.stringify(list);
  
  
  //以下は「保存」button押下でB1000画面へ遷移するためのものですが
  //画面遷移してしまうと複数データを保持できないので
  //一旦コメントアウトします6/8
  // location.href = "https://codepen.io/libdevIKR/full/LYgqmyG";
};

function cancel() {
  location.href = "../html/B01_SeriesTable.html";
};

function back() {
  location.href = "../html/B01_SeriesTable.html";
};
