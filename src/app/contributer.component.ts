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
  selector: 'app-contributer',
  template: `
  <div class="container">

    <input type="text" #newItemTitle placeholder="" >
    <button (click)="addItem(newItemTitle.value)">Add</button>

  </div>
  `
})


export class ContributerComponent implements OnInit {

  items: Observable<any[]>;
  afds: AngularFirestoreCollection<any>;
  list: AngularFirestoreCollection<any>;

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


  // newItemTitle = "";

  addItem(itemTitle: string) {
    this.list.add({title: itemTitle});
  }




}
