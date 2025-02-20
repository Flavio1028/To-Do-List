import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { first } from 'rxjs';

import { AppComponent } from './app.component';
import { Todo } from './models/model/todo.model';
import { TodoSignalsService } from './services/todo-signals.service';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let todoSignalsService: TodoSignalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent, BrowserAnimationsModule, NoopAnimationsModule],
      providers: [TodoSignalsService]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    todoSignalsService = TestBed.inject(TodoSignalsService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // Teste de @Input()
  it('should set @Input property correctly', () => {
    component.projectName = "Testing Anglular With Jest";
    fixture.detectChanges();
    expect(component.projectName).toEqual('Testing Anglular With Jest');
  });

  // Teste de @Output() e @Input
  it('should emit event with @Output() docorator correctly', () => {
    component.projectName = "Testing my Anglular application";
    component.outputEvent
      .pipe(
        first()
      )
      .subscribe({
        next: (event) => {
          expect(event).toEqual('Testing my Anglular application');
          component.handleEmmitEvent();
        }
      });
    fixture.detectChanges();
  });

  // Teste de um acionamento de serviço e de um signal
  it('should create new todo correctly and set and call service method', () => {
    jest.spyOn(todoSignalsService, 'updateTodos');

    const newTodo: Todo = {
      id: 1,
      title: 'Testing creating Todo',
      description: 'Test new Todo',
      done: true
    }

    component.handleCreateTodo(newTodo);

    fixture.detectChanges();

    expect(todoSignalsService.updateTodos).toHaveBeenCalledWith(newTodo);
    expect(component.todoSignal()).toEqual([newTodo]);
  });

  // Testes de elementos do DOM

  it('should not render paragraph in the DOM', () => {
    const componentDebugElement: DebugElement = fixture.debugElement;
    const element: HTMLElement = componentDebugElement.nativeElement;
    const paragraph = element.querySelector('p');

    expect(paragraph).toBeNull();
  });

  it('should render paragraph correctly', () => {
    component.renderTestMessage = true;
    fixture.detectChanges();


    const componentDebugElement: DebugElement = fixture.debugElement;
    const paragraphDebugElement = componentDebugElement.query(By.css('p'));
    const paragraph: HTMLElement = paragraphDebugElement.nativeElement;

    expect(paragraph.textContent).toEqual('Test your angular application');
  });

  // Teste de setTimeOut()

  it('should isDone property to be false', () => {
    component.handleCheckIsDone();
    expect(component.isDoned).toBe(false);
  });

  it('should isDone property to be true', fakeAsync(() => {
    component.handleCheckIsDone();
    tick(200);
    expect(component.isDoned).toBe(true);
  }));

});
