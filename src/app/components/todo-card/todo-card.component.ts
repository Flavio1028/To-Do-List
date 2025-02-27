import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { TodoKeyLocalStorage } from 'src/app/models/enum/todoKeyLocalStorage';
import { Todo } from 'src/app/models/model/todo.model';
import { TodoSignalsService } from 'src/app/services/todo-signals.service';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTabsModule],
  templateUrl: './todo-card.component.html',
  styleUrls: []
})
export class TodoCardComponent implements OnInit {

  private todoSignalsService = inject(TodoSignalsService);
  private todosSignal = this.todoSignalsService.todosState;
  public todosList = computed(() => this.todosSignal());

  ngOnInit(): void {
    this.getTodosInLocalStorage();
  }

  private getTodosInLocalStorage(): void {
    const todosDatas = localStorage.getItem(TodoKeyLocalStorage.TODO_LIST) as string;
    todosDatas && (this.todosSignal.set(JSON.parse(todosDatas)));
  }

  private saveTodosInLocalStorage(): void {
    this.todoSignalsService.saveTodosInLocalStorage();
  }

  public handleDoneTodo(todoId: number): void {
    if (todoId) {
      this.todosSignal.mutate((todos) => {
        const todoSelected = todos.find((todo) => todo?.id === todoId) as Todo
        todoSelected && (todoSelected.done = !todoSelected.done);
        // Salvar os dados
        this.saveTodosInLocalStorage();
      });
    }
  }

  public handleDeleteTodo(todo: Todo): void {
    if (todo) {
      const index = this.todosList().indexOf(todo);

      if (index != -1) {
        this.todosSignal.mutate((todos) => {
          todos.splice(index, 1);
          // Salvar os dados
          this.saveTodosInLocalStorage();
        });
      }

    }
  }

}
