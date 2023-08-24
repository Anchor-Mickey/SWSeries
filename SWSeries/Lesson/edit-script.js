document.addEventListener("DOMContentLoaded", function() {
  const editInput = document.getElementById("edit-input");
  const saveButton = document.getElementById("save-btn");

  const urlParams = new URLSearchParams(window.location.search);
  const itemIndex = parseInt(urlParams.get("index"));

  let itemList = JSON.parse(localStorage.getItem("itemList")) || ["Item 1", "Item 2", "Item 3"]; // ローカルストレージからデータを取得


  //ここから下が重要
  editInput.value = itemList[itemIndex]; // 編集画面で選択したデータを表示

  saveButton.addEventListener("click", function() {
    const newItemText = editInput.value;
    itemList[itemIndex] = newItemText; // データを更新
    localStorage.setItem("itemList", JSON.stringify(itemList)); // データを保存
  });

  //ここまで

  // Back to List リンクのリンク先に修正後のデータを反映させる
  const backToListLink = document.querySelector("a[href='index.html']");
  backToListLink.addEventListener("click", function() {
    const listItems = document.querySelectorAll("#item-list li a");
    listItems[itemIndex].textContent = itemList[itemIndex];
  });
});