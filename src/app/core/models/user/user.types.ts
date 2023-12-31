import { ViewModel } from 'app/core/models/base/view-model.types';

export interface User extends ViewModel
{
  name: string;
  email: string;
  avatar?: string;
  status?: string;
  pendingRegisterInformation: boolean;
}
