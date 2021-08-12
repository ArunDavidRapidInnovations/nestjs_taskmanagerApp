import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilleterDto as GetTaskFilleterDto } from './dto/get-tasks-filter.dto';
import { UpdateStatusDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController');
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query() filterDto: GetTaskFilleterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(
      `user "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.tasksService.getTasks(filterDto, user);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(
      `user "${user.username}" Creating new task with data : ${JSON.stringify(
        createTaskDto,
      )}`,
    );
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Get(':id')
  getTaskById(@Param('id') id, @GetUser() user: User): Promise<Task> {
    this.logger.verbose(`user "${user.username}" Getting task with ID : ${id}`);
    return this.tasksService.getTaskById(id, user);
  }

  @Patch(':id/status')
  updateTaskStatusById(
    @Param('id') id,
    @Body() updateStatusDto: UpdateStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    const { status } = updateStatusDto;
    this.logger.verbose(
      `user "${user.username}" Updating the status of task with id : ${id} : to ${updateStatusDto.status}`,
    );
    return this.tasksService.updateTaskStatusById(id, status, user);
  }

  @Delete(':id')
  deleteTaskById(@Param('id') id, @GetUser() user: User): Promise<string> {
    this.logger.verbose(
      `user "${user.username}" Deleting task with ID : ${id}`,
    );
    return this.tasksService.deleteTaskById(id, user);
  }
}
