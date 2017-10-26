    import { Component } from '@angular/core';
    import { CanvasComponent } from './canvas.component';
    import { ContributerComponent } from './contributer.component';
    import { RouterModule } from '@angular/router';

    RouterModule.forRoot([
      {
        path: 'canvas/:id',
        component: CanvasComponent
      },
      {
        path: 'contributer/:id',
        component: ContributerComponent
      }
    ]);

     @Component({
      selector: 'app-root',
      template: `
        <div ngClass="container">
          <div ngClass="row">
            <h1>{{title}}</h1>
          </div>
            <router-outlet></router-outlet>
        </div>
      `
    })
    export class AppComponent {
      title = 'Project Planner';
    }
