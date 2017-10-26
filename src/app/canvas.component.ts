import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgClass } from '@angular/common';
import { NgModel } from '@angular/forms';
import {forEach} from "@angular/router/src/utils/collection";


export interface Item {
  title: string;
  childList: string;
}

@Component({
  selector: 'app-canvas',
  template: `
    <div [ngClass]="'container'">
      <div [ngClass]="'row'">
        <span> Send this link to contributers: https://project-giroud.firebaseapp.com/canvas/{{this.id}}</span>
        <ul [ngClass]="'canvas-list'">
          <li *ngFor="let item of items | async">
            <div [ngClass]="'square'">
              {{item.title}} - {{item.id}}
              <button (click)="deleteItem(item.id)">Delete</button>
              <button (click)="logItem(item)">Log item</button>
            </div>
          </li>
        </ul>
      </div>
    </div>

  <div class="container">
    <div class="row">
      <div class="md-col-6">
        <input type="text" NgModel="this.newItemTitle" placeholder="{{newItemPlaceholder}}" >
        <button (click)="addItem(this.newItemTitle)">Add</button>
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
  newItemTitle = 'test';

  id: string;
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    // private router: Router,
    db: AngularFirestore
    ) {
    this.afds = db.collection('squares');
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id'];
    });
    this.items = this.afds.doc(this.id).collection('list').valueChanges();
    this.list = this.afds.doc(this.id).collection('list');
    console.log(this.items);
    
  }


  addItem(itemTitle: string) {
    this.list.add({title: itemTitle});
    alert(itemTitle + ' was added')
    this.newItemTitle = '';
  }

  deleteItem(id: string) {
    this.list.doc(id).delete();
    console.log(id);
  }

  logItem(item: object) {
    console.log(item);
  }




}
