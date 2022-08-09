import {
  Component,
  VERSION,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, merge, Observable, partition } from 'rxjs';
import { map, share } from 'rxjs/operators';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  public isEven = new FormControl();
  public number$: Observable<Array<number>>;

  ngOnInit() {
    const [even$, odd$] = partition(this.isEven.valueChanges, Boolean);

    const evenNumber$ = even$.pipe(
      map(() => numbers.filter((num) => num % 2 === 0))
    );
    const oddNumber$ = odd$.pipe(
      map(() => numbers.filter((num) => num % 2 !== 0))
    );

    this.number$ = merge(evenNumber$, oddNumber$).pipe(
      share({
        connector: () => new Subject(),
      })
    );
  }
}
