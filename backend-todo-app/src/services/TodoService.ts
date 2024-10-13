import { Todo } from '@src/entities/Todo';
import { CrudService } from '@src/services/CrudService';
export interface TodoService extends CrudService<number, Todo> {}
