import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  pastExercises = new MatTableDataSource<Exercise>();
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  finishedSubscription: Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.finishedSubscription = this.trainingService.finishedExercisesChanged.subscribe(
      data => {
        this.pastExercises.data = data;
      }
    );
    this.trainingService.fetchPastExercises();
  }

  ngAfterViewInit() {
    this.pastExercises.sort = this.sort;
    this.pastExercises.paginator = this.paginator;
  }

  doFilter(searchTerm: string) {
    this.pastExercises.filter = searchTerm.trim().toLowerCase();
  }

  ngOnDestroy() {
    if (this.finishedSubscription) {
      this.finishedSubscription.unsubscribe();
    }
  }
}
