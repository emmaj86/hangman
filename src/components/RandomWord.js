let randomFilm = [
  "jaws",
  "titanic",
  "predator",
  "beetlejuice",
  "platoon",
  "fargo",
  "goodfellas",
  "zoolander",
];

function randomWord() {
  return randomFilm[Math.floor(Math.random() * randomFilm.length)];
}

export { randomWord };
