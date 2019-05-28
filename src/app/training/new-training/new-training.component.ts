import {
  Component,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subscription, Observable } from 'rxjs';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

import { Store, select } from '@ngrx/store';
import * as fromApp from '../../store/reducers/app.reducer';
import * as fromTraining from '../../store/reducers/training.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  @Output() trainingStart = new EventEmitter<void>();
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.pipe(select(fromApp.getIsLoading));
    this.exercises$ = this.store.pipe(select(fromTraining.getAvailableExercises));
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchavailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

}
