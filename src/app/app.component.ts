import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, WritableSignal } from '@angular/core';

import { HeaderComponent } from './components/header/header.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { Todo } from './models/model/todo.model';
import { TodoSignalsService } from './services/todo-signals.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TodoCardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Input() public projectName!: string;
  @Output() public outputEvent = new EventEmitter<string>();

  title = 'todo-list';
  public todoSignal!: WritableSignal<Array<Todo>>;
  public renderTestMessage = false;
  public isDoned = false;

  constructor(private todoSignalsService: TodoSignalsService) { }

  public handleEmmitEvent(): void {
    this.outputEvent.emit(this.projectName);
  }

  public handleCreateTodo(todo: Todo): void {
    if (todo) {
      this.todoSignalsService.updateTodos(todo);
      this.todoSignal = this.todoSignalsService.todosState;
    }
  }

  public handleCheckIsDone(): void {
    setTimeout(() => {
      this.isDoned = true;
    }, 200);
  }

}
