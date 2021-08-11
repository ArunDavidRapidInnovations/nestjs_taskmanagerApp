import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { get } from 'http';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query('id') id) {
    if (id) {
      return this.tasksService.getTaskById(id);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  //   @Get()
  //   getTaskById(@Query('id') id): Task {
  //     return this.tasksService.getTaskById(id);
  //   }
}
