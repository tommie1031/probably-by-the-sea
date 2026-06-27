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

// 波の音：アップロードした音源を再生
const waveAudio = new Audio("waves.mp3");
waveAudio.loop = true;
waveAudio.volume = 0.45;

let soundOn = false;

soundButton.addEventListener("click", async () => {
  if (!soundOn) {
    try {
      await waveAudio.play();
      soundOn = true;
      soundButton.textContent = "波の音：ON";
    } catch (error) {
      console.error(error);
      alert("音声を再生できませんでした。音源ファイル waves.mp3 がアップロードされているか確認してください。");
    }
  } else {
    waveAudio.pause();
    soundOn = false;
    soundButton.textContent = "波の音：OFF";
  }
});
