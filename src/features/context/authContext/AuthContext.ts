import { createContext } from "react";
import type IAuthContext from "./model/IAuthContext";

const AuthContext = createContext<IAuthContext | undefined>(undefined);
export default AuthContext;
