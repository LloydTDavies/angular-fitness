import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy
} from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  @Output() trainingStart = new EventEmitter<void>();
  exercises: Exercise[] = [];
  isLoading = false;

  private trainingSubscritpion: Subscription;
  private loadingSubscritpion: Subscription;

  constructor(
    private trainingService: TrainingService,
    private uiService: UIService
  ) {}

  ngOnInit() {
    this.loadingSubscritpion = this.uiService.loadingStateChanged.subscribe(
      loading => (this.isLoading = loading)
    );
    this.trainingSubscritpion = this.trainingService.exercisesChanged.subscribe(
      data => {
        this.exercises = data;
      }
    );
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchavailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
    if (this.trainingSubscritpion) {
      this.trainingSubscritpion.unsubscribe();
    }
    if (this.loadingSubscritpion) {
      this.loadingSubscritpion.unsubscribe();
    }
  }
}
