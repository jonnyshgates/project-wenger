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
        <h1>{{title}}</h1>
        <router-outlet></router-outlet>
      `
    })
    export class AppComponent {
      title = 'The App';
    }
