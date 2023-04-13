import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import type { ProjectPicture, Tag } from '@lyubimovstudio/api-interfaces';

type DialogData = {
  projectPicture: ProjectPicture;
};

@Component({
  selector: 'ls-project-picture-modal-form',
  templateUrl: './project-picture-modal-form.component.html',
  styleUrls: ['./project-picture-modal-form.component.scss']
})
export class ProjectPictureModalFormComponent implements OnInit {

  projectPictureForm = new FormGroup({
    ruTitle: new FormControl('', { validators: [Validators.required] }),
    enTitle: new FormControl(''),
    ruDescription: new FormControl(''),
    enDescription: new FormControl(''),
    tags: new FormControl<Tag[]>([]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<ProjectPictureModalFormComponent>,
  ) {}

  ngOnInit() {
    const newValue = Object.keys(this.projectPictureForm.getRawValue()).reduce((acc, key) => {
      acc[key] = this.data.projectPicture[key];

      return acc;
    }, {} as Partial<ProjectPicture>);

    newValue.tags = newValue.tags || [];

    this.projectPictureForm.patchValue(newValue);
  }

  onSubmit() {
    this.projectPictureForm.markAllAsTouched();

    if (this.projectPictureForm.invalid) {
      return;
    }

    this.dialogRef.close(this.projectPictureForm.value);
  }
}
