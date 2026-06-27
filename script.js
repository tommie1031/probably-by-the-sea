const panel = document.getElementById("panel");
const panelTitle = document.getElementById("panelTitle");
const panelText = document.getElementById("panelText");
const closeButton = document.getElementById("close");
const soundButton = document.getElementById("sound");

const messages = {
  window: {
    title: "窓の外へ",
    text: "今日はまだ、海を眺めるだけ。\nそのうち、この窓からリスボンやモロッコや、まだ名前のない場所へ出かけられるようになります。"
  },
  book: {
    title: "今日のことば",
    text: todayQuote()
  },
  mug: {
    title: "マグカップ",
    text: "温かい飲み物があります。\n急がなくても大丈夫。少し座っていって。"
  },
  plant: {
    title: "ティネケ",
    text: "窓辺のティネケ。\n白と緑の葉っぱが、部屋に少しだけ余白をつくっています。"
  }
};

function todayQuote() {
  const quotes = [
    "今日は、寄り道が目的地。",
    "旅は急がなくても、ちゃんと進む。",
    "窓を開けるだけでも、旅は始まる。",
    "答えが出ない日は、景色だけ見て帰ってもいい。",
    "イルカは、たぶんそのへんにいます。"
  ];
  return quotes[new Date().getDate() % quotes.length];
}

document.querySelectorAll(".hotspot").forEach((spot) => {
  spot.addEventListener("click", () => {
    const item = messages[spot.dataset.action];
    panelTitle.textContent = item.title;
    panelText.textContent = item.text;
    panel.classList.add("open");
    panel.setAttribute("aria-hidden", "false");
  });
});

closeButton.addEventListener("click", () => {
  panel.classList.remove("open");
  panel.setAttribute("aria-hidden", "true");
});

let soundOn = false;
soundButton.addEventListener("click", () => {
  soundOn = !soundOn;
  soundButton.textContent = soundOn ? "波の音：ON（仮）" : "波の音：OFF";
});
