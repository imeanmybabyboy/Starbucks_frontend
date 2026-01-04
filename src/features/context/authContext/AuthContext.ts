import { createContext } from "react";
import type IAppContext from "./model/IAuthContext";

const AuthContext = createContext<IAppContext | undefined>(undefined);
export default AuthContext;