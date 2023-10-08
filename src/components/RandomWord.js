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

//generates word from list at random
function randomWord() {
  return randomFilm[Math.floor(Math.random() * randomFilm.length)];
}

export { randomWord };
