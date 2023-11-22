export function templateListEl(arr) {
  console.log(arr);
  const markup = arr.map((el) => {
    return `<li class="list-group-item list-group-item-action" data-id="${el.id}">
${el.name}
<li>`;
  });
  return markup.join("");
}
