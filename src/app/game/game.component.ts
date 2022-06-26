import { Component, inject, OnInit } from '@angular/core';
import { ActorsData } from '../actors';
import { ActorsService } from '../actors.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  public actors: ActorsData[];

  constructor(private _actorsService: ActorsService) {}

  ngOnInit() {
    this._actorsService.getActors().subscribe((data) => {
      this.actors = data;
      console.log('arrow', this.actors);
      //this.onGoClick();
      this.createQuestion();
    });
    console.log('ngOnInit', this.actors);
  }

  count: number = 0;
  score: number = 0;

  public correctIndex: number;
  public options: number[];
  public selectedIndex: number;

  createQuestion() {
    let triplet = [];

    while (triplet.length < 3) {
      let r = this.randomActorIndex();

      if (triplet.indexOf(r) === -1) {
        triplet.push(r);
      }
    }

    this.options = triplet;

    this.correctIndex = triplet[this.random(3)];

    this.selectedIndex = null;
  }

  private randomActorIndex() {
    return this.random(this.actors.length);
  }

  /**
   * Generate number from 0 to size - 1.
   */
  private random(size: number) {
    return Math.floor(Math.random() * size - 1) + 1;
  }

  public onOptionSelected(index: number) {
    console.log('Selected ' + index + ', correct ' + this.correctIndex);
    this.selectedIndex = index;
    if (index === this.correctIndex) {
      console.log('Dobre');
      this.score = this.score + 1; //this.score += 1;
    }
  }

  // public getCorrectWrongClasses(index: number) {
  //   return {
  //     correct: index === this.correctIndex && this.selectedIndex,
  //     wrong: index !== this.correctIndex && index === this.selectedIndex,
  //   };
  // }

  // arr: Array<number> = [0, 0, 0];
  // a: number = 0;
  // b: number = 0;
  // c: number = 0;
  // d: number = 0;
  // e: number = 0;
  // f: number = 0;

  status: string = 'is-link';
  status2: string = 'is-link';

  clickEvent() {
    this.status = 'is-danger';
  }

  clickEvent2() {
    this.status2 = 'is-danger';
  }

  onGoClick() {
    /*
    let arr = [];
    while (arr.length < 3) {
      let r = Math.floor(Math.random() * this.actors.length - 1) + 1;
      if (arr.indexOf(r) === -1) arr.push(r);
    }

    let place = [];
    while (place.length < 3) {
      let r = Math.floor(Math.random() * 3) + 1;
      if (place.indexOf(r) === -1) place.push(r);
    }

    this.a = arr[0];
    this.b = arr[1];
    this.c = arr[2];
    this.d = place[0];
    this.e = place[1];
    this.f = place[2];

    console.log(this.a, this.b, this.c);
    console.log(this.d, this.e, this.f);

    this.count = this.count + 1;
    console.log(this.count);

    this.status = 'is-link';
    this.status2 = 'is-link';
    */
  }
}
