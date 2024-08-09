const coolAdjectives = [
  "Awesome",
  "Epic",
  "Legendary",
  "Savage",
  "Lit",
  "Fire",
  "Dope",
  "Sick",
  "Rad",
  "Tubular",
  "Bodacious",
  "Fearless",
  "Fierce",
  "Majestic",
  "Nimble",
  "Quirky",
  "Rugged",
  "Sleek",
  "Sophisticated",
  "Vibrant",
  "Wicked",
  "Zany",
  "Bold",
  "Bright",
  "Captivating",
  "Dazzling",
  "Elegant",
  "Exquisite",
  "Flamboyant",
  "Glamorous",
  "Innovative",
  "Jaw-dropping",
  "Kaleidoscopic",
  "Luminous",
  "Mesmerizing",
  "Nostalgic",
  "Opulent",
  "Pioneering",
  "Resplendent",
  "Spectacular",
  "Thrilling",
  "Unforgettable",
];


const betaalphas = [
  "Alpha",
  "Beta",
  "Gamma",
  "Delta",
  "Epsilon",
  "Zeta",
  "Eta",
  "Theta",
  "Iota",
  "Kappa",
  "Lambda",
  "Mu",
  "Nu",
  "Xi",
  "Omicron",
  "Pi",
  "Rho",
  "Sigma",
  "Tau",
  "Upsilon",
  "Phi",
  "Chi",
  "Psi",
  "Omega",
];

function randInt(max) {
  return Math.floor(Math.random() * max);
}

//steps: 5, 7
let counters = [randInt(coolAdjectives.length), randInt(betaalphas.length)];

export function randomName() {
  const adjective = coolAdjectives[counters[0]];
  const betaalpha = betaalphas[counters[1]];
  counters[0] = (counters[0] + 5) % coolAdjectives.length;
  counters[1] = (counters[1] + 7) % betaalphas.length;
  return `${adjective}-${betaalpha}`;
}
