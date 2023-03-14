import { createSlice } from '@reduxjs/toolkit';
import wordList from '~/utils/words.json';

let randomNum = Math.floor(Math.random() * wordList.words.length);

const initialState: {
  board: string[];
  cursorPosition: number;
  currentRow: number;
  correctWord: string;
  correctLetters: string[];
  almostLetters: string[];
  wrongLetters: string[];
  showHelpModal: boolean;
  showWinModal: boolean;
  showLoseModal: boolean;
  isAnswerValid: boolean;
  isFinishGame: boolean;
} = {
  board: [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ],
  cursorPosition: 0,
  currentRow: 0,
  correctWord: wordList.words[randomNum],
  correctLetters: [],
  almostLetters: [],
  wrongLetters: [],
  showHelpModal: false,
  showWinModal: false,
  showLoseModal: false,
  isAnswerValid: true,
  isFinishGame: false,
};

export const wordleSlice = createSlice({
  name: 'wordle',
  initialState,
  reducers: {
    setBoard: (state, { payload }: { payload: string[] }) => ({
      ...state,
      board: payload,
      isAnswerValid: true,
    }),
    changeCursorPosition: (
      state,
      { payload }: { payload: 'increase' | 'decrease' }
    ) => {
      const newCursorPosition: number =
        payload === 'increase'
          ? state.cursorPosition + 1
          : state.cursorPosition - 1;
      return {
        ...state,
        cursorPosition: newCursorPosition,
      };
    },
    setNextRow: state => ({
      ...state,
      currentRow: state.currentRow + 1,
    }),
    checkWord: (state, { payload }: { payload: string }) => {
      let newCorrectLetters: string[] = [...state.correctLetters];
      let newAlmostLetters: string[] = [...state.almostLetters];
      let newWrongLetters: string[] = [...state.wrongLetters];

      if (wordList.words.includes(payload.toLowerCase())) {
        const currentAnswerArr = payload.split('');
        let isCorrect: boolean = false;
        let isEndGame: boolean = state.currentRow === 5;

        currentAnswerArr.forEach((letter, index) => {
          if (state.correctWord[index].toUpperCase() === letter) {
            if (newCorrectLetters.indexOf(letter) === -1) {
              newCorrectLetters.push(letter);
            }
          } else if (state.correctWord.toUpperCase().includes(letter)) {
            if (newAlmostLetters.indexOf(letter) === -1) {
              newAlmostLetters.push(letter);
            }
          } else {
            if (newWrongLetters.indexOf(letter) === -1) {
              newWrongLetters.push(letter);
            }
          }
        });

        if (state.correctWord === payload.toLowerCase()) {
          isCorrect = true;
        }

        return {
          ...state,
          correctLetters: newCorrectLetters,
          almostLetters: newAlmostLetters,
          wrongLetters: newWrongLetters,
          isAnswerValid: true,
          currentRow: state.currentRow + 1,
          showWinModal: isCorrect ? true : false,
          showLoseModal: isEndGame && !isCorrect ? true : false,
          isFinishGame: isCorrect || isEndGame ? true : false,
        };
      } else {
        return {
          ...state,
          isAnswerValid: false,
        };
      }
    },
    resetValid: state => ({
      ...state,
      isAnswerValid: true,
    }),
    showWordleModal: (
      state,
      { payload }: { payload: 'help' | 'win' | 'lose' }
    ) => ({
      ...state,
      showHelpModal: payload === 'help',
      showWinModal: payload === 'win',
      showLoseModal: payload === 'lose',
    }),
    hideWordleModal: state => ({
      ...state,
      showHelpModal: false,
      showWinModal: false,
      showLoseModal: false,
    }),
    resetWordle: state => {
      let newRandomNum = Math.floor(Math.random() * wordList.words.length);
      return { ...initialState, correctWord: wordList.words[newRandomNum] };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setBoard,
  changeCursorPosition,
  setNextRow,
  checkWord,
  resetValid,
  showWordleModal,
  hideWordleModal,
  resetWordle,
} = wordleSlice.actions;

export default wordleSlice.reducer;
