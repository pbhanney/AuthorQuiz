import React from "react";
import ReactDOM from "react-dom";
import { shuffle, sample } from "underscore";

import "./styles.css";

import AuthorQuiz from "./AuthorQuiz";
//import registerServiceWorker from "registerServiceWorker";

const authors = [
  {
    name: "Mark Twain",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/ee/Mark_Twain_photo_portrait%2C_Feb_7%2C_1871%2C_cropped_Repair.jpg",
    imageSource: "Wikimedia Commons",
    books: [
      "The Adventures of Huckleberry Finn",
      "Life on the Mississippi",
      "Roughing It"
    ]
  },
  {
    name: "J.K. Rowling",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/J._K._Rowling_2010.jpg/1280px-J._K._Rowling_2010.jpg",
    imageSource: "Wikimedia Commons",
    imageAttribution: "Daniel Ogren",
    books: ["Harry Potter and the Sorcerer's Stone"]
  },
  {
    name: "Stephen King",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/e3/Stephen_King%2C_Comicon.jpg",
    imageSource: "Wikimedia Commons",
    imageAttribution: "Pinguino",
    books: ["The Shining", "IT"]
  },
  {
    name: "Charles Dickens",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Charles_Dickens._From_a_portrait_by_Francis_Alexander.jpg/1024px-Charles_Dickens._From_a_portrait_by_Francis_Alexander.jpg",
    imageSource: "Wikimedia Commons",
    books: ["David Copperfield", "A Tale of Two Cities"]
  },
  {
    name: "William Shakespeare",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Shakespeare.jpg/1024px-Shakespeare.jpg",
    imageSource: "Wikimedia Commons",
    books: ["Hamlet", "Macbeth", "Romeo and Juliet"]
  },
  {
    name: "Joseph Conrad",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/07/Joseph_Conrad.PNG",
    imageSource: "Wikimedia Commons",
    books: ["Heart of Darkness"]
  }
];

function getTurnData(authors) {
  const allBooks = authors.reduce(function(p, c, i) {
    return p.concat(c.books);
  }, []);
  const fourRandomBooks = shuffle(allBooks).slice(0, 4);
  const answer = sample(fourRandomBooks);

  return {
    books: fourRandomBooks,
    author: authors.find(author => author.books.some(title => title === answer))
  };
}

function resetState() {
  return {
    turnData: getTurnData(authors),
    highlight: ""
  };
}
//need to add the highlight later in the instructions
let state = resetState();

function onAnswerSelected(answer) {
  const isCorrect = state.turnData.author.books.some(book => book === answer);
  state.highlight = isCorrect ? "correct" : "wrong";
  render();
}

const rootElement = document.getElementById("root");
function render() {
  ReactDOM.render(
    <AuthorQuiz
      {...state}
      onAnswerSelected={onAnswerSelected}
      onContinue={() => {
        state = resetState();
        render();
      }}
    />,
    rootElement
  );
}
render();
//registerServiceWorker();
