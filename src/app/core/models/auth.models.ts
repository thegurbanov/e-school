export class User {
    id?: number;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    accessToken?: string;
    refreshToken?: string;
    email?: string;
}



export interface IReturn<T> {
    createResponse(): T;
}

// @Route("/login")
export class AdminLoginRequest implements IReturn<AdminLoginResponse>
{
    public Username!: string;
    public Password!: string;

    public constructor(init?: Partial<AdminLoginRequest>) { (Object as any).assign(this, init); }
    public createResponse() { return new AdminLoginResponse(); }
    public getTypeName() { return 'AdminLoginRequest'; }
}

export class AdminLoginResponse {
    public Lang!: string;
    public UserId!: number;
    public Username!: string;
    public LastLogin!: string;
    public SessionKey!: string;
    public constructor(init?: Partial<AdminLoginResponse>) { (Object as any).assign(this, init); }
}
// @Route("/userlogin")
export class UserLoginRequest implements IReturn<AdminLoginResponse>
{
    public username!: string;
    public password!: string;

    public constructor(init?: Partial<UserLoginRequest>) { (Object as any).assign(this, init); }
    public createResponse() { return new AdminLoginResponse(); }
    public getTypeName() { return 'UserLoginRequest'; }
}