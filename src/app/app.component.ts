import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Inject,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, merge, Observable, partition, startWith } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { NUMBERS_PROVIDER, NUMBERS_TOKEN } from './numbers.provider';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NUMBERS_PROVIDER],
})
export class AppComponent implements OnInit {
  public isEven = new FormControl();
  public number$: Observable<Array<number>>;

  constructor(@Inject(NUMBERS_TOKEN) private numbers: number[]) {}

  ngOnInit() {
    const [even$, odd$] = partition(
      this.isEven.valueChanges.pipe(startWith(false)),
      Boolean
    );

    const evenNumber$ = even$.pipe(
      map(() => this.numbers.filter((num) => num % 2 === 0))
    );
    const oddNumber$ = odd$.pipe(
      map(() => this.numbers.filter((num) => num % 2 !== 0))
    );

    this.number$ = merge(evenNumber$, oddNumber$).pipe(
      share({
        connector: () => new Subject(),
      })
    );
  }
}
