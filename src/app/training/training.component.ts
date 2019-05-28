import { Component, OnInit } from '@angular/core';
import { TrainingService } from './training.service';
import { Subscription, Observable } from 'rxjs';

import {Store, select} from '@ngrx/store';

import * as fromTraining from '../store/reducers/training.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  ongoingTraining$: Observable<boolean>;
  trainingSubscription: Subscription;

  constructor(private trainingService: TrainingService, private store: Store<fromTraining.State>) {}

  ngOnInit() {
    this.ongoingTraining$ = this.store.pipe(select(fromTraining.getIsTraining));
  }

}
