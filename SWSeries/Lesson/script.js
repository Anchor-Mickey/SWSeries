document.addEventListener("DOMContentLoaded", function() {
  const itemList = JSON.parse(localStorage.getItem("itemList")) || ["tesuto 1", "Item 2", "Item 3"]; // ローカルストレージからデータを取得
  const itemListElement = document.getElementById("item-list");


  // リストアイテムを生成する関数
  //この部分を応用させればいいかな。
  function createListItem(index) {
    const listItem = document.createElement("li");
    console.log(listItem);
    const editLink = document.createElement("a");
    console.log(editLink);
    editLink.href = `edit.html?index=${index}`;
    editLink.textContent = itemList[index];
    listItem.appendChild(editLink);
    return listItem;
  }

  // リストアイテムを描画
  //ここから下の部分はこの内容ではこれがないとリストが出てこないけど、
  //私の内容では他の方法で表示させている
  for (let i = 0; i < itemList.length; i++) {
    const listItem = createListItem(i);
    itemListElement.appendChild(listItem);

  }
});