function check(){ //ボタンが押されたときに以下のようにしてほしいです
    if (document.A01_form.A01_LogIN.value=="admin" && document.A01_form.A01_PassWord.value=="PassWord"){ //条件1：LogINにadmin・条件2：PassWordにPassWordとそれぞれ入力された場合
      console.log('認証成功')//コンソールログに「認証成功」と表示して下さい
      location.href = "../html/B01_SeriesTable.html";//このページに飛んでください
    } else {
        console.log('認証失敗')//コンソールログに「認証失敗」と表示して下さい
        alert("ログインIDまたはパスワードが間違っています")}//そうじゃなかったらアラートを出してください。
  };
