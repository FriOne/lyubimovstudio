import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';

import { ProjectsService } from './projects.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private projectService: ProjectsService) {}

  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async cleanUpPictures() {
    this.logger.log('Cleaning up useless pictures');

    await this.projectService.deletePicturesWithoutProject();
  }
}
