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

// 波の音：仮実装
let soundOn = false;
let audioContext = null;
let noiseSource = null;
let gainNode = null;
let filterNode = null;
let lfo = null;
let lfoGain = null;

function createNoiseBuffer(context) {
  const bufferSize = context.sampleRate * 3;
  const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  return buffer;
}

function startWaveSound() {
  audioContext = new (window.AudioContext || window.webkitAudioContext)();

  const noiseBuffer = createNoiseBuffer(audioContext);

  noiseSource = audioContext.createBufferSource();
  noiseSource.buffer = noiseBuffer;
  noiseSource.loop = true;

  filterNode = audioContext.createBiquadFilter();
  filterNode.type = "lowpass";
  filterNode.frequency.value = 750;
  filterNode.Q.value = 0.8;

  gainNode = audioContext.createGain();
  gainNode.gain.value = 0.055;

  lfo = audioContext.createOscillator();
  lfo.type = "sine";
  lfo.frequency.value = 0.09;

  lfoGain = audioContext.createGain();
  lfoGain.gain.value = 0.04;

  lfo.connect(lfoGain);
  lfoGain.connect(gainNode.gain);

  noiseSource.connect(filterNode);
  filterNode.connect(gainNode);
  gainNode.connect(audioContext.destination);

  noiseSource.start();
  lfo.start();
}

function stopWaveSound() {
  if (noiseSource) {
    noiseSource.stop();
    noiseSource.disconnect();
  }

  if (lfo) {
    lfo.stop();
    lfo.disconnect();
  }

  if (audioContext) {
    audioContext.close();
  }

  audioContext = null;
  noiseSource = null;
  gainNode = null;
  filterNode = null;
  lfo = null;
  lfoGain = null;
}

soundButton.addEventListener("click", () => {
  soundOn = !soundOn;

  if (soundOn) {
    startWaveSound();
    soundButton.textContent = "波の音：ON";
  } else {
    stopWaveSound();
    soundButton.textContent = "波の音：OFF";
  }
});
