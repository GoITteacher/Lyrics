export function updateModal(modal, listener) {
  const item = JSON.parse(localStorage.getItem("item"));
  modal.innerHTML = template(item);
  const form = document.querySelector(".js-update-form");
  form.addEventListener("submit", listener);
}

function template(item) {
  const { desc, author = "NoName", idx, lyrics, name, title, tune, id } = item;
  return `<form class="create-form js-update-form" data-id="${id}">
<input type="number" placeholder="idx" name="idx" required min="0" value="${idx}"/>
<input type="text" placeholder="name" name="name" required value="${name}"/>
<input type="text" placeholder="title" name="title" required value="${title}"/>
<input type="text" placeholder="author" name="author" value="${author}"/>
<input type="number" placeholder="tempo" name="tempo"/>
<input
  type="number"
  placeholder="tune"
  min="-12"
  max="12"
  name="tune"
  required
  value="${tune}"
/>
<textarea placeholder="lyrics" name="lyrics">${lyrics}</textarea>
<textarea placeholder="desc" name="desc">${desc}</textarea>
<button class="btn btn-primary">Update Data</button>
</form>`;
}
