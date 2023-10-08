import React, { Component } from "react";
import { randomWord } from "./RandomWord";
//import images
import state1 from "./images/state1.GIF";
import state2 from "./images/state2.GIF";
import state3 from "./images/state3.GIF";
import state4 from "./images/state4.GIF";
import state5 from "./images/state5.GIF";
import state6 from "./images/state6.GIF";
import state7 from "./images/state7.GIF";
import state8 from "./images/state8.GIF";
import state9 from "./images/state9.GIF";
import state10 from "./images/state10.GIF";
import state11 from "./images/state11.GIF";

//initiate help variable
const Help = () => (
  <div className="help">
    You pick a letter to guess if its in the word. If it is it will appear in
    the word, if not a piece of "hangman" is drawn. You can have up to 10 wrong
    guesses. Good luck!
  </div>
);

class Hangman extends Component {
  static defaultProps = {
    maxWrong: 10, //no of wrong attempts allowed
    images: [
      state1,
      state2,
      state3,
      state4,
      state5,
      state6,
      state7,
      state8,
      state9,
      state10,
      state11,
    ],
  };

  constructor(props) {
    super(props);
    this.state = {
      noOfWrong: 0, //set no of wrong to zero
      guessed: new Set(),
      answer: randomWord(), //get random word
      isHidden: true, //hide help
    };
    this.handleGuess = this.handleGuess.bind(this);
    this.reset = this.reset.bind(this);
  }
  //toggle help
  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden,
    });
  }
  //resets to zero wrong and new word
  reset() {
    this.setState({
      noOfWrong: 0,
      guessed: new Set(),
      answer: randomWord(),
    });
  }
  //split word into letters and display with _
  guessedWord() {
    return this.state.answer
      .split("")
      .map((letter) => (this.state.guessed.has(letter) ? letter : "_"));
  }
  //if letter in word add to guessed otherwise add to no of wrong
  handleGuess(event) {
    let letter = event.target.value;
    this.setState((st) => ({
      guessed: st.guessed.add(letter),
      noOfWrong: st.noOfWrong + (st.answer.includes(letter) ? 0 : 1),
    }));
  }
  //keypad for guessing
  generateKeypad() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
      <button
        key={letter}
        value={letter}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(letter)}
      >
        {letter}
      </button>
    ));
  }

  render() {
    const gameOver = this.state.noOfWrong >= this.props.maxWrong; //game over when guesses exceeded
    const isWinner = this.guessedWord().join("") === this.state.answer; //is winner when word guessed
    let gameState = this.generateKeypad(); //when game active generate keypad
    if (isWinner) gameState = "You have won, Woo Hoo"; //output
    if (gameOver) gameState = "Better luck next time"; //output
    let restart = gameOver || isWinner;
    return (
      <div className="hangman">
        <h2>Hangman</h2>
        {/*change image with no of wrong guesses*/}
        <img src={this.props.images[this.state.noOfWrong]} alt="Hangman"></img>
        <p>
          {/*display guesses left*/}
          Guesses left: {this.props.maxWrong - this.state.noOfWrong} / {""}
          {this.props.maxWrong}
        </p>
        <p>Guess the movie:</p>
        <p className="Hangman-word">
          {!gameOver ? this.guessedWord() : this.state.answer}
        </p>
        {/*reset button when game finished*/}
        <p className="Hangman-btns">{gameState}</p>
        {restart && (
          <button id="reset" onClick={this.reset}>
            Restart
          </button>
        )}
        {/*help button - toggle*/}
        <div>
          <button id="help-btn" onClick={this.toggleHidden.bind(this)}>
            Help
          </button>
          {!this.state.isHidden && <Help />}
        </div>
      </div>
    );
  }
}

export default Hangman;
