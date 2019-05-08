import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from '../stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingFinished = new EventEmitter<void>();
  progress = 0;
  timer: number;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.timer = setInterval(() => {
      this.progress = this.progress + 5;
      if (this.progress >= 100) {
        this.stopTimer();
      }
    }, 1000);
  }

  onStop() {
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      width: '300',
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.stopTimer();
      }
    });
  }

  private stopTimer() {
    this.trainingFinished.emit();
    clearInterval(this.timer);
  }
}
