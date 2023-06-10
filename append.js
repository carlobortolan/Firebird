browser.topSites.get().then((sites) => {
  let div = document.getElementById("site-list");

  if (!sites.length) {
    div.innerText = "No sites returned from the topSites API.";
    return;
  }

  let ul = document.createElement("ul");
  ul.className = "list-group";
  for (let site of sites) {
    let li = document.createElement("li");
    li.className = "list-group-item";
    let a = document.createElement("a");
    a.href = site.url;
    a.innerText = site.title || site.url;
    a.style = "color: var(--text-color)";
    li.appendChild(a);
    li.style = "background: var(--bg-color); color: var(--text-color);";
    ul.appendChild(li);
  }

  div.appendChild(ul);
});
