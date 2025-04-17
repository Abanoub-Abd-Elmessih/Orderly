import { useState } from "react";
import LanguageContext from "./LanguageContext";
import en from "../locales/en.json";
import ar from "../locales/ar.json";

const translations = { en, ar };

const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("en");

  const t = (key) => translations[lang][key] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <div dir={lang === "ar" ? "rtl" : "ltr"}>{children}</div>
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
