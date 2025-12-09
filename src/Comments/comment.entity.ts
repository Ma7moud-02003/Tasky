import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { current_stamp } from 'src/ulites/constants';
import { Task } from 'src/Tasks/Task.entity';
import { User } from 'src/user/user.entity';

@Entity({ name: 'comments' })
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', unique: true, length: '100' })
  comment: string;
  @ManyToOne(() => Task, (task) => task.assignedComments)
  assignedTo: Task;
  @ManyToOne(() => User, (user) => user.createdComments)
  createdby: User;
  @Column({ type: 'timestamp', default: () => current_stamp })
  createdAt: Date;
  @Column({
    type: 'timestamp',
    default: () => current_stamp,
    onUpdate: current_stamp,
  })
  updatedAt: Date;
}
