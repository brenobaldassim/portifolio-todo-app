import { UserServiceImpl } from '@src/services/impl/UserServiceImpl';
import { AuthenticationUserService } from '@src/services/AuthenticationUserService';
import { STATUS } from '@src/utils/constants';

export type GenericService = UserServiceImpl | AuthenticationUserService;

export type Status = STATUS.DONE | STATUS.IN_PROGRESS;
