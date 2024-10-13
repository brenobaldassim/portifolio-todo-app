import { User } from '@src/entities/User';
import { CrudService } from '@src/services/CrudService';
export interface UserService extends CrudService<number, User> {}
