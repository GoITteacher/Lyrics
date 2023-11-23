import { LyricsDB } from "./database";
import { templateListEl } from "../templates/listTemplate.js";
import { createModal } from "../templates/createModal.js";
import { infoTemplate } from "../templates/infoTemplate.js";
import { updateModal } from "../templates/updateModal.js";

const refs = {
  lyricList: document.querySelector(".js-lyric-list"),
  lyricSearchForm: document.querySelector(".js-lyric-filter"),
  infoElem: document.querySelector(".js-info"),
  modalElem: document.querySelector(".js-modalka"),
  backdropElem: document.querySelector(".js-backdrop"),
  newBtnElem: document.querySelector(".js-new-item"),
};

refs.lyricList.addEventListener("click", onListClick);
refs.newBtnElem.addEventListener("click", onNewBtnClick);
refs.backdropElem.addEventListener("click", onBackdropClick);

function onNewBtnClick() {
  createModal(refs.modalElem, onCreateFormSubmit);
  showModal();
}
async function onListClick(e) {
  if (e.target === e.currentTarget) return;
  const id = e.target.dataset.id;
  const obj = await LyricsDB.getRecord(id);
  const markup = infoTemplate(obj);
  refs.infoElem.innerHTML = markup;
  updateListeners();
}
function onCreateFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const obj = {};
  const formData = new FormData(form);
  formData.forEach((value, key) => {
    if (value.toString() != "") {
      obj[key] = value;
    }
  });
  obj.name = `${obj.idx}_${obj.title}`;

  LyricsDB.saveLyrics({
    tempo: 130,
    tune: 0,
    ...obj,
  });
  form.reset();
}
function onBackdropClick(e) {
  if (e.target === e.currentTarget) hideModal();
}
function onDeleteClick(e) {
  const id = e.target.dataset.id;
  LyricsDB.deleteRecord(id);
  refs.infoElem.innerHTML = "";
  refs.lyricList.innerHTML = templateListEl(LyricsDB.list);
}
function onUpdateClick(e) {
  updateModal(refs.modalElem, onSaveUpdateInfo);
  showModal();
}

function onSaveUpdateInfo(e) {
  e.preventDefault();
  const id = e.target.dataset.id;
  console.log(id);
  const form = e.target;
  const obj = {};
  const formData = new FormData(form);
  formData.forEach((value, key) => {
    obj[key] = value;
  });

  obj.name = `${obj.idx}_${obj.title}`;
  LyricsDB.updateItem({ id, ...obj });
  hideModal();
}
// =============================
function showModal() {
  console.log("test");
  document.body.classList.remove("hide-modal");
}

function hideModal() {
  document.body.classList.add("hide-modal");
}

async function loadData() {
  const data = await LyricsDB.getList();
  const template = templateListEl(data.lyrics);
  refs.lyricList.innerHTML = template;
}

function updateListeners() {
  const deleteBtn = document.querySelector('[data-action="delete"]');
  const updateBtn = document.querySelector('[data-action="update"]');
  deleteBtn.addEventListener("click", onDeleteClick);
  updateBtn.addEventListener("click", onUpdateClick);
}

loadData();
