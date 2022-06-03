import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {

  public progress = 0;

  public timer?: number;

  @Output() trainingExit = new EventEmitter<boolean>()

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  private startOrResumeTimer(): void{
    this.timer = setInterval(()=>{
      this.progress = this.progress + 5;
      if (this.progress >= 100){
        clearInterval(this.timer)
      }
      
    }, 1000)
  }

  public onStop(): void{
    clearInterval(this.timer)
    const dialogRef = this.dialog.open(StopTrainingComponent, {data: {
      progress: this.progress
    }})

    dialogRef.afterClosed().subscribe(res => {
      if (res){
        this.trainingExit.emit(true);
      }
      else{
        this.startOrResumeTimer();
      }
    })
  }

}
