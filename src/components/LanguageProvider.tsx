"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type Language = "bn" | "en";

const LANGUAGE_STORAGE_KEY = "milanmela-language";
const LANGUAGE_CHANGE_EVENT = "milanmela-language-change";

const LanguageContext = createContext<Language>("bn");

function getLanguageSnapshot(): Language {
  return window.localStorage.getItem(LANGUAGE_STORAGE_KEY) === "en" ? "en" : "bn";
}

function getServerLanguageSnapshot(): Language {
  return "bn";
}

function subscribeToLanguageChanges(onChange: () => void): () => void {
  window.addEventListener("storage", onChange);
  window.addEventListener(LANGUAGE_CHANGE_EVENT, onChange);

  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(LANGUAGE_CHANGE_EVENT, onChange);
  };
}

export function setLanguage(language: Language): void {
  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  window.dispatchEvent(new Event(LANGUAGE_CHANGE_EVENT));
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(
    subscribeToLanguageChanges,
    getLanguageSnapshot,
    getServerLanguageSnapshot,
  );

  return (
    <LanguageContext.Provider value={language}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): Language {
  return useContext(LanguageContext);
}
