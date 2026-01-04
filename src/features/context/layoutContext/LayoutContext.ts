import { createContext } from "react";
import type ILayoutContext from "./model/ILayoutContext";

const LayoutContext = createContext<ILayoutContext | undefined>(undefined);
export default LayoutContext;