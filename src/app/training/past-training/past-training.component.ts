import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import * as fromTraining from '../../store/reducers/training.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  pastExercises = new MatTableDataSource<Exercise>();
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService: TrainingService, private store: Store<fromTraining.State>) {}

  ngOnInit() {
    this.store.select(fromTraining.getFinishedExercises).subscribe(ex => {
      this.pastExercises.data = ex;
    });
    this.trainingService.fetchPastExercises();
  }

  ngAfterViewInit() {
    this.pastExercises.sort = this.sort;
    this.pastExercises.paginator = this.paginator;
  }

  doFilter(searchTerm: string) {
    this.pastExercises.filter = searchTerm.trim().toLowerCase();
  }

}
