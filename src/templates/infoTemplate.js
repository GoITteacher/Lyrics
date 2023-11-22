export function infoTemplate({
  desc,
  author = "NoName",
  idx,
  lyrics,
  name,
  title,
  tune,
  id,
}) {
  "".padStart();
  return `<div class="base-info__data">
    <div class="item-info">
      <p class="h5">Index: ${idx.padStart(3, "0")}</p>
      <hr />
    </div>
    <div class="item-info">
      <p class="h5">Tone: ${tune}</p>
      <hr />
    </div>
    <div class="item-info">
      <p class="h5">Filename:</p>
      <p>${name}</p>
      <hr />
    </div>

    <div class="item-info">
      <p class="h5">Description:</p>
      <p>${desc.replace("\n", "</br>")}</p>
      <hr />
    </div>
    <div>
    <button class="btn" data-action="update" data-id="${id}">Update</button>
    <button class="btn" data-action="delete" data-id="${id}">Delete</button>
    <hr />
    </div>
  </div>
  <div class="base-info__text">
    <p class="h2">${title} - ${author}</p>
    <p class="h5">${lyrics.replaceAll("\n", "</br>")}</p>
  </div>`;
}
