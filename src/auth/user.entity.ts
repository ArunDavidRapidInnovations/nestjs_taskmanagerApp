import { Task } from '../tasks/task.entity';
import { Column, Entity, ObjectID, ObjectIdColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn('uuid')
  id: ObjectID;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
