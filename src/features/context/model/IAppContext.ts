import type IUser from "../../../entities/user/model/IUser";

export default interface IAppContext {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
}
