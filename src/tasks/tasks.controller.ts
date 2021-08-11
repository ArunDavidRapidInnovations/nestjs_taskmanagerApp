import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { get } from 'http';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilleterDto as GetTaskFilleterDto } from './dto/get-tasks-filter.dto';
import { UpdateStatusDto } from './dto/update-task.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTaskFilleterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get(':id')
  getTaskById(@Param('id') id): Task {
    return this.tasksService.getTaskById(id);
  }

  @Patch(':id/status')
  updateTaskStatusById(
    @Param('id') id,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    const { status } = updateStatusDto;
    return this.tasksService.updateTaskStatusById(id, status);
  }

  @Delete(':id')
  deleteTaskById(@Param('id') id): void {
    return this.tasksService.deleteTaskById(id);
  }
}
