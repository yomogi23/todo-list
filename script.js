// HTMLの要素を取得
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// 「追加」ボタンが押されたときの処理
addBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (text === '') return; // 空欄なら何もしない

  // 1. リスト項目（li）を作成
  const li = document.createElement('li');

  // 2. タスクの文字部分（span）を作成
  const span = document.createElement('span');
  span.textContent = text;
  // 文字をクリックしたら完了状態（.completed）を切り替え
  span.addEventListener('click', () => {
    span.classList.toggle('completed');
  });

  // 3. 削除ボタンを作成
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '削除';
  deleteBtn.className = 'delete-btn';
  // 削除ボタンを押したらliごと消す
  deleteBtn.addEventListener('click', () => {
    li.remove();
  });

  // 4. liの中に文字と削除ボタンを入れて、ulに追加
  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  // 5. 入力欄を空に戻す
  taskInput.value = '';
});
