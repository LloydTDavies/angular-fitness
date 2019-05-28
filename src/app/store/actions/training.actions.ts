import { Action } from '@ngrx/store';
import { Exercise } from 'src/app/training/exercise.model';

export enum TrainingActionTypes {
    SetAvailableTraining = '[Training] Set Available Training',
    SetFinishedTraining = '[Training] Set Finished Training',
    StartTraining = '[Training] Start Training',
    StopTraining = '[Training] Stop Training'
}

export class SetAvailableTraining implements Action {
    readonly type = TrainingActionTypes.SetAvailableTraining;

    constructor(public payload: Exercise[]) {}
}

export class SetFinishedTraining implements Action {
    readonly type = TrainingActionTypes.SetFinishedTraining;

    constructor(public payload: Exercise[]) {}
}

export class StartTraining implements Action {
    readonly type = TrainingActionTypes.StartTraining;

    constructor(public payload: string) {}
}

export class StopTraining implements Action {
    readonly type = TrainingActionTypes.StopTraining;
}

export type TrainingActions = SetAvailableTraining | SetFinishedTraining | StartTraining | StopTraining;
