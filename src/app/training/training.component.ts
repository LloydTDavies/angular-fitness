import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from './training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining = false;
  trainingSubscription: Subscription;

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.trainingService.exerciseChanged.subscribe(data => {
      this.ongoingTraining = data !== null;
    });
  }

  ngOnDestroy(): void {
    this.trainingSubscription.unsubscribe();
  }
}
