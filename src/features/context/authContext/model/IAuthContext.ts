import type IUser from "../../../../entities/user/model/IUser";

export default interface IAuthContext {
    user: IUser | null;
    setUser: (user: IUser | null) => void;

    isAuthLoading: boolean,
    setIsAuthLoading: (loading: boolean) => void;
}
