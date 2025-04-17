import { useContext } from "react";
import LanguageContext from "../contexts/LanguageContext";

const useLang = () => useContext(LanguageContext);

export default useLang;
