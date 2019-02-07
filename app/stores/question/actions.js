import { POINTS_CHANGED, CATEGORY_CHANGED, ASK_CHANGED, CATEGORY_ADDED, ANSWERS_CHANGED } from './action-types'

export const categoryChanged = (newCategory) => {
  return {
    type: CATEGORY_CHANGED,
    payload: newCategory,
  }
}

export const askChanged = (newAsk) => {
  return {
    type: ASK_CHANGED,
    payload: newAsk,
  }
}

export const categoryAdded = (newCategory) => {
  return {
    type: CATEGORY_ADDED,
    payload: newCategory,
  }
}

export const pointsChanged = (points) => {
  return {
    type: POINTS_CHANGED,
    payload: points,
  }
}

export const answersChanged = (answers) => {
  return {
    type: ANSWERS_CHANGED,
    payload: answers,
  }
}