import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  @Output() trainingStart = new EventEmitter<void>();
  exercises: Exercise[] = [];

  trainingSubscritpion: Subscription;

  constructor(
    private trainingService: TrainingService,
  ) {}

  ngOnInit() {
    this.trainingSubscritpion = this.trainingService.exercisesChanged.subscribe(data => {
      this.exercises = data;
    });
    this.trainingService.fetchavailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
    this.trainingSubscritpion.unsubscribe();
  }
}
