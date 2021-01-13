import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ProjectPicture, Tag } from '@lyubimovstudio/api-interfaces';

import { TagsService } from '../../tags/tags.service';

@Component({
  selector: 'ls-project-picture-modal-form',
  templateUrl: './project-picture-modal-form.component.html',
  styleUrls: ['./project-picture-modal-form.component.scss']
})
export class ProjectPictureModalFormComponent implements OnInit {
  @Input() projectPicture: ProjectPicture;

  projectPictureForm = this.fb.group({
    ruTitle: [''],
    enTitle: [''],
    ruDescription: [''],
    enDescription: [''],
    tags: [[]],
  });

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private tagsService: TagsService,
  ) {}

  ngOnInit() {
    const newValue = Object.keys(this.projectPictureForm.value).reduce((acc, key) => {
      acc[key] = this.projectPicture[key];

      return acc;
    }, {} as Partial<ProjectPicture>);

    newValue.tags = newValue.tags || [];

    this.projectPictureForm.patchValue(newValue);
  }

  fetchTagsByName = (name: string) => {
    return this.tagsService.fetchTags(name);
  }

  matchingFn = (value: string, autocompleteTag: Tag) => {
    const tagAlreadyAdded = this.projectPictureForm.value.tags.some(tag => (tag.name === autocompleteTag.name));

    return !tagAlreadyAdded;
  }

  onSubmit() {
    this.projectPictureForm.markAllAsTouched();

    if (this.projectPictureForm.invalid) {
      return;
    }

    this.activeModal.close(this.projectPictureForm.value);
  }
}
