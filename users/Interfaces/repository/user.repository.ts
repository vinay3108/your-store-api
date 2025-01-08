export interface IUserRequestModel{
    name: string;
    email: string;
    password:string,
    role?:string
}

export interface IUserResponseModel{
    id: number;
    name: string;
    email: string;
    role: string;
}
export interface IUserRepository{

    createUser(user:IUserRequestModel):void;
    updateUser(id:String,user:IUserRequestModel):void;
    getUsers():Promise<IUserResponseModel[]>;
    getUser(id:String):Promise<IUserResponseModel[]>;
}


