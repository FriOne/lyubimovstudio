import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BeforeAndAfter } from '@lyubimovstudio/api-interfaces';
import { BehaviorSubject, combineLatest, of, Subscription } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ToastsService } from '../../shared/services/toasts.service';
import { BeforeAndAfterService } from '../before-and-after.service';

@Component({
  selector: 'ls-before-and-after-list',
  templateUrl: './before-and-after-list.component.html',
  styleUrls: ['./before-and-after-list.component.scss']
})
export class BeforeAndAfterListComponent implements OnInit, OnDestroy {
  params$ = this.route.queryParams.pipe(
    map(params => ({ page: 1, pageSize: 10, ...params })),
  );
  page$ = this.params$.pipe(map(params => params.page));
  pageSize$ = this.params$.pipe(map(params => params.pageSize));
  total$ = new BehaviorSubject<number>(0);
  hasMoreThanOnePage$ = combineLatest(this.total$, this.params$).pipe(
    map(([total, { pageSize }]) => (total > pageSize)),
  );

  beforeAndAfter$ = new BehaviorSubject<BeforeAndAfter[]>([]);
  loading$ = new BehaviorSubject<boolean>(false);
  noBeforeAndAfter$ = combineLatest(this.beforeAndAfter$, this.loading$).pipe(
    map(([beforeAndAfter, loading]) => !loading && beforeAndAfter.length === 0),
  );
  hasBeforeAndAfter$ = combineLatest(this.beforeAndAfter$, this.loading$).pipe(
    map(([beforeAndAfter, loading]) => !loading && beforeAndAfter.length > 0),
  );

  pageSizeOptions = [10, 20, 50];
  deletedBeforeAndAfter = new Set<number>();

  private paramsSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private beforeAndAfterService: BeforeAndAfterService,
    private toastsService: ToastsService,
  ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.params$
      .pipe(
        switchMap(({ page, pageSize }) => {
          this.loading$.next(true);

          return this.beforeAndAfterService.fetchAllBeforeAndAfter(page - 1, pageSize);
        }),
        catchError(() => of({ rows: [], total: 0 })),
      )
      .subscribe(response => {
        const { rows: beforeAndAfter, total } = response;

        this.loading$.next(false);
        this.total$.next(total);
        this.beforeAndAfter$.next(beforeAndAfter);
      });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  removeBeforeAndAfter(id: number) {
    this.deletedBeforeAndAfter.add(id);

    this.beforeAndAfterService
      .removeBeforeAndAfter(id)
      .subscribe(() => {
        const beforeAndAfter = [...this.beforeAndAfter$.getValue()];
        const beforeAndAfterIndex = beforeAndAfter.findIndex(singleBeforeAndAfter => (singleBeforeAndAfter.id === id));
        const singleBeforeAndAfter = beforeAndAfter[beforeAndAfterIndex];

        beforeAndAfter.splice(beforeAndAfterIndex, 1);

        this.deletedBeforeAndAfter.delete(id);
        this.beforeAndAfter$.next(beforeAndAfter);

        this.toastsService.showSuccess(`Проект "${singleBeforeAndAfter.ruTitle}" удален`);
      });
  }

  updateUrlParams(params: Params) {
    return this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }

  onPageChange(page: number) {
    this.updateUrlParams({ page });
  }

  onPageSizeChange(pageSize: number) {
    this.updateUrlParams({ page: 1, pageSize });
  }

  onRowClick(beforeAndAfter: BeforeAndAfter) {
    this.router.navigate([beforeAndAfter.id], { relativeTo: this.route });
  }

  onRemoveClick(event: MouseEvent, beforeAndAfter: BeforeAndAfter) {
    event.stopPropagation();

    if (!confirm(`Вы уверены, что хоите удалить "${beforeAndAfter.ruTitle}"?`)) {
      return;
    }

    this.removeBeforeAndAfter(beforeAndAfter.id);
  }
}
