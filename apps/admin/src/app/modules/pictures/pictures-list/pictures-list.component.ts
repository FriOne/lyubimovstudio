import { Component, OnInit } from '@angular/core';
import { catchError, finalize, map } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, of } from 'rxjs';

import type { Picture } from '@lyubimovstudio/api-interfaces';

import { PicturesService } from '../../shared/services/pictures.service';

@Component({
  selector: 'ls-pictures-list',
  templateUrl: './pictures-list.component.html',
  styleUrls: ['./pictures-list.component.scss']
})
export class PicturesListComponent implements OnInit {
  pictures$ = new BehaviorSubject<Picture[]>([]);
  loading$ = new BehaviorSubject<boolean>(false);
  noPictures$ = combineLatest(this.pictures$, this.loading$).pipe(
    map(([pictures, loading]) => !loading && pictures.length === 0),
  );

  constructor(private pictureService: PicturesService) { }

  ngOnInit(): void {
    this.loadPictures();
  }

  loadPictures() {
    this.loading$.next(true);

    this.pictureService
      .fetchPictures()
      .pipe(
        catchError(() => of({ rows: [], total: 0 })),
        finalize(() => this.loading$.next(false))
      )
      .subscribe(({ rows: pictures }) => this.pictures$.next(pictures));
  }
}
