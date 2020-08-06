const $siteList = $(".siteList");
const $last = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  { logo: "B", url: "https://www.baidu.com" },
  { logo: "Y", url: "https://www.youku.com/" },
];
const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, "");
};

const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
    <div class = 'siteContent'>
      <div class = 'siteLogo'>${node.logo}</div>
      <div class = 'siteLink'>${simplifyUrl(node.url)}</div>
      <div class = 'close'>
      <svg class="icon">
      <use xlink:href="#iconclose"></use>
    </svg>
  </div>
</div>
</li>`).insertBefore($last);

    $li.on("click", () => {
      window.open(node.url);
    });

    $li.on("click", ".close", (e) => {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
};

render();

$(".addButton").on("click", () => {
  let url = window.prompt("添加的网站");

  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
    console.log(url);
  }
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url,
  });
  render();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};

$(document).on("keypress", (e) => {
  const { key } = e;
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
