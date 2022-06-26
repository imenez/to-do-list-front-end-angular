import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from './task';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})  
export class AppComponent implements OnInit{

  

  public tasks!: Task[];

  public editTask!: Task;
  public deleteTask!: Task;

  constructor(private taskService: TaskService ){}
  


  ngOnInit(){
    this.getTasks();
    
  }




  public getTasks(): void {

    this.taskService.getTasks().subscribe(
      (response: Task[]) => {
        this.tasks = response;
        console.log(this.tasks);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    );

  }

  public onAddTask(addForm: NgForm): void {
    document.getElementById("add-task-form")?.click();
    this.taskService.addTask(addForm.value).subscribe(
      (response: Task) => {
        console.log(response);
        this.getTasks();
        addForm.reset();
        alert('Task is added.');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateTask(taskId: number, task: Task): void {
    this.taskService.updateTask(taskId, task).subscribe(
      (response: Task) => {
        console.log(response);
        this.getTasks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteTask(taskId: any): void {
    this.taskService.deleteTask(taskId).subscribe(
      (response: any) => {
        //console.log(response);
        this.getTasks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    
    
    alert('Task is deleted!');
    

    
    
  }


  

  public searchTasks(key: string): void {
    console.log(key);
    const results: Task[] = [];
    for (const task of this.tasks) {
      if (task.taskName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || task.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || task.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || task.status.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(task);
      }
    }
    this.tasks = results;
    if (results.length === 0 || !key) {
      this.getTasks();
    }
  }


  public onOpenModal(task: any, mode: String): void {

    const container = document.getElementById("main-container");
    const button = document.createElement("button");
    button.type = "button";
    button.style.display = "none";
    button.setAttribute("data-toggle", "modal");

    if(mode === "add"){
      button.setAttribute("data-target", "#addTaskModal");
    }
    else if(mode === "edit"){
      this.editTask = task;
      button.setAttribute("data-target", "#updateTaskModal");
    }
    else if(mode === "delete"){
      this.deleteTask = task;
      button.setAttribute("data-target", "#deleteTaskModal");
    } 

    container?.appendChild(button);
    button.click();

  }





  

}
