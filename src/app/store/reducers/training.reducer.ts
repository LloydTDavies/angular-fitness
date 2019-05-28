import { Exercise } from 'src/app/training/exercise.model';

import * as fromApp from './app.reducer';
import * as fromTraining from '../actions/training.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface TrainingState {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  activeTraining: Exercise;
}

export interface State extends fromApp.State {
  training: TrainingState;
}

const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null
};

export function trainingReducer(
  state = initialState,
  action: fromTraining.TrainingActions
) {
  switch (action.type) {
    case fromTraining.TrainingActionTypes.SetAvailableTraining:
      return {
        ...state,
        availableExercises: action.payload
      };

    case fromTraining.TrainingActionTypes.SetFinishedTraining:
      return {
        ...state,
        finishedExercises: action.payload
      };

    case fromTraining.TrainingActionTypes.StartTraining:
      return {
        ...state,
        activeTraining: state.availableExercises.find(x => x.id === action.payload)
      };

    case fromTraining.TrainingActionTypes.StopTraining:
      return {
        ...state,
        activeTraining: null
      };
    default:
      return state;
  }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises);
export const getFinishedExercises = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises);
export const getActiveTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining);
export const getIsTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining !== null);
