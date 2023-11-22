export function createModal(modal, listener) {
  modal.innerHTML = template();
  const form = document.querySelector(".js-create-form");
  form.addEventListener("submit", listener);
}

function template() {
  return `<form class="create-form js-create-form">
<input type="number" placeholder="idx" name="idx" required min="0" />
<input type="text" placeholder="name" name="name" required />
<input type="text" placeholder="title" name="title" required />
<input type="text" placeholder="author" name="author" />
<input
  type="number"
  placeholder="tune"
  min="-12"
  max="12"
  name="tune"
  required
  value="0"
/>
<textarea placeholder="lyrics" name="lyrics"></textarea>
<textarea placeholder="desc" name="desc"></textarea>
<button class="btn btn-primary">Save Data</button>
</form>`;
}
