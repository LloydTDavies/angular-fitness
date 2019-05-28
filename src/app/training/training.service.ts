import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { Store } from '@ngrx/store';

import * as fromTraining from '../store/reducers/training.reducer';
import * as fromTrainingActions from '../store/actions/training.actions';
import * as fromUi from '../store/actions/ui.actions';
import { UIService } from '../shared/ui.service';

@Injectable()
export class TrainingService {
  private fbSubs: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) {}

  fetchavailableExercises() {
    this.store.dispatch(new fromUi.StartLoading());
    this.fbSubs.push(
      this.db
        .collection<Exercise>('availableExercises')
        .snapshotChanges()
        .pipe(
          map(data => {
            return data.map(doc => {
              return {
                id: doc.payload.doc.id,
                name: doc.payload.doc.data().name,
                duration: doc.payload.doc.data().duration,
                calories: doc.payload.doc.data().calories
              };
            });
          })
        )
        .subscribe(
          exercises => {
            this.store.dispatch(new fromUi.StopLoading());
            this.store.dispatch(
              new fromTrainingActions.SetAvailableTraining(exercises)
            );
          },
          error => {
            this.store.dispatch(new fromUi.StopLoading());
            this.uiService.showSnackbar(
              'Fetching Exercises failed, please try again later',
              null,
              3000
            );
            this.store.dispatch(new fromTrainingActions.StopTraining());
          }
        )
    );
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new fromTrainingActions.StartTraining(selectedId));
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({
        ...ex,
        date: new Date(),
        state: 'completed'
      });
      this.store.dispatch(new fromTrainingActions.StopTraining());
    });
  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({
        ...ex,
        date: new Date(),
        state: 'cancelled',
        calories: ex.duration * (progress / 100),
        duration: ex.duration * (progress / 100)
      });
      this.store.dispatch(new fromTrainingActions.StopTraining());
    });
  }

  fetchPastExercises() {
    this.fbSubs.push(
      this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe(
          (exercises: Exercise[]) => {
            this.store.dispatch(
              new fromTrainingActions.SetFinishedTraining(exercises)
            );
          },
          error => {
            console.log(error);
          }
        )
    );
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
