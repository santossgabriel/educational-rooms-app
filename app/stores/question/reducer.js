import {
  POINTS_CHANGED,
  CATEGORY_ADDED,
  ASK_CHANGED,
  CATEGORY_CHANGED,
  ANSWERS_CHANGED
} from './action-types'

const INITIAL_STATE = {
  selected: '',
  custom: false,
  ask: '',
  category: { custom: false, selected: 'Matemática' },
  categories: ['Química', 'Inglês', 'Matemática', 'Informática', 'Outra ...'],
  points: 5,
  answers: [
    { classification: 'A', description: 'resposta a' },
    { classification: 'B', description: 'resposta b', correct: true },
    { classification: 'C', description: 'resposta c' },
    { classification: 'D', description: 'resposta d' }
  ]
}

export default (state = INITIAL_STATE, action) => {
  let category = null
  switch (action.type) {
    case CATEGORY_CHANGED:
      category = state.category
      category.selected = action.payload
      category.custom = category.selected === state.categories[state.categories.length - 1]
      return { ...state, category: category }
    case ASK_CHANGED:
      return { ...state, ask: action.payload }
    case POINTS_CHANGED:
      return { ...state, points: action.payload }
    case ANSWERS_CHANGED:
      return { ...state, answers: action.payload }
    case CATEGORY_ADDED:
      category = state.category
      category.selected = action.payload
      category.custom = false
      state.categories.unshift(action.payload)
      return { ...state, category: category }
      break
    default:
      return state
  }
}