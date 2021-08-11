import { TaskStatus } from '../task.model';

export class GetTaskFilleterDto {
  status?: TaskStatus;
  search?: string;
}
