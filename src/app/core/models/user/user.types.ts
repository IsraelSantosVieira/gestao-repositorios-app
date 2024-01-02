import { ViewModel } from 'app/core/models/base/view-model.types';

export interface User extends ViewModel
{
  email: string;
  fullName: string;
  firstName: string;
  lastName: string;
  phone: string;
  active: boolean;
  avatar?: string;
  pendingRegisterInformation: boolean;
  acceptedTerm: boolean;
  master: boolean;

  birthDate: Date;
  createdAt: Date;
}
