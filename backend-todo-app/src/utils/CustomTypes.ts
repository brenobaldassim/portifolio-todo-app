import { UserServiceImpl } from '@src/services/impl/UserServiceImpl';
import { AuthenticationUserService } from '@src/services/AuthenticationUserService';

export type GenericService = UserServiceImpl | AuthenticationUserService;

export type Status = 'in_progress' | 'done' | 'pending';
