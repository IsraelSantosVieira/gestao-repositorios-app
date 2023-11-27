import {User} from "./user.types";

export interface AuthenticateResult
{
    user: User,
    notBefore: Date;
    expiresIn: Date;
    accessToken: string;
    refreshToken: string;
    requiresTwoFactorAuthentication?: boolean;
}
