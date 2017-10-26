import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgClass } from '@angular/common';


export interface Item {
  title: string;
  childList: string;
}

@Component({
  selector: 'app-canvas',
  template: `
    <div [ngClass]="'container'">
      <div [ngClass]="'row'">
        <span> Contributer link: https://project-giroud.firebaseapp.com/canvas/{{this.id}}</span>
        <ul [ngClass]="'canvas-list'">
          <li *ngFor="let item of items | async">
            <div [ngClass]="'square'">
              {{item.title}}
            </div>
          </li>
        </ul>
      </div>
    </div>

  <div class="container">
    <div class="row">
      <div class="md-col-6">
        <input type="text" #newItemTitle placeholder="{{newItemPlaceholder}}" >
        <button (click)="addItem(newItemTitle.value)">Add</button>
      </div>
    </div>
  </div>
  `
})


export class CanvasComponent implements OnInit {

  items: Observable<any[]>;
  afds: AngularFirestoreCollection<any>;
  list: AngularFirestoreCollection<any>;

  newItemPlaceholder = 'Add new item';
  newItemTitle : string;

  id: string;
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    // private router: Router,
    db: AngularFirestore
    ) {
    this.afds = db.collection('squares');
    console.log(this.afds);
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id'];
    });
    this.items = this.afds.doc(this.id).collection('list').valueChanges();
    this.list = this.afds.doc(this.id).collection('list');
    console.log(this.id);
  }


  addItem(itemTitle: string) {
    this.list.add({title: itemTitle});

  }




}
