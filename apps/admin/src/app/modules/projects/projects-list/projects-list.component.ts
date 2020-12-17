import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize, map } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, of } from 'rxjs';

import { Project } from '@lyubimovstudio/api-interfaces';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'ls-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {
  projects$ = new BehaviorSubject<Project[]>([]);
  loading$ = new BehaviorSubject<boolean>(false);
  noProjects$ = combineLatest(this.projects$, this.loading$).pipe(
    map(([projects, loading]) => !loading && projects.length === 0),
  );
  hasProjects$ = combineLatest(this.projects$, this.loading$).pipe(
    map(([projects, loading]) => !loading && projects.length > 0),
  );

  deletedProjects = new Set<number>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  removeProject(id: number) {
    this.deletedProjects.add(id);

    this.projectsService
      .removeProject(id)
      .subscribe(() => {
        const projects = [...this.projects$.getValue()];
        const projectIndex = projects.findIndex(project => (project.id === id));

        projects.splice(projectIndex, 1);

        this.deletedProjects.delete(id);
        this.projects$.next(projects);
      });
  }

  loadProjects() {
    this.loading$.next(true);

    this.projectsService
      .fetchProjects()
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loading$.next(false))
      )
      .subscribe(projects => this.projects$.next(projects));
  }

  onRowClick(project: Project) {
    this.router.navigate([project.id], { relativeTo: this.route });
  }

  onRemoveClick(event: MouseEvent, project: Project) {
    event.stopPropagation();

    if (!confirm(`Вы уверены, что хоите удалить проект "${project.ruTitle}"?`)) {
      return;
    }

    this.removeProject(project.id);
  }
}
