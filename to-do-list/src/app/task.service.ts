import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Task } from './task';
import { environment } from 'src/environments/environment';



@Injectable({providedIn: 'root'})


export class TaskService{
    private apiServerUrl = environment.apiBaseUrl;


    constructor(private http: HttpClient){}

    public getTasks(): Observable<Task[]>{
        return this.http.get<any>(`${this.apiServerUrl}/tasks/find-all`);
    }


    public addTask(task: Task): Observable<Task>{
        return this.http.post<Task>(`${this.apiServerUrl}/tasks/add`, task);
    }

    public getTask(taskId: number): Observable<Task>{
        return this.http.get<Task>(`${this.apiServerUrl}/tasks/find/${taskId}`);
    }

    public deleteTask(taskId: number): Observable<String>{
        return this.http.delete(`${this.apiServerUrl}/tasks/delete/${taskId}`, {responseType: 'text'});
    }
    public updateTask(taskId: number, task: Task): Observable<Task>{
        return this.http.put<Task>(`${this.apiServerUrl}/tasks/update/${taskId}`, task);
    }

}