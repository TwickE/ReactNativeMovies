import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type LanguageContextType = {
  currentLanguage: string;
  changeLanguage: (lang: string) => Promise<void>;
};

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: 'en',
  changeLanguage: async () => { },
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  useEffect(() => {
    const loadSavedLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('language');
        if (savedLanguage) {
          setCurrentLanguage(savedLanguage);
          i18n.changeLanguage(savedLanguage);
        }
      } catch (error) {
        console.error('Failed to load language preference:', error);
      }
    };

    loadSavedLanguage();
  }, []);

  const changeLanguage = async (lang: string) => {
    try {
      await AsyncStorage.setItem('language', lang);
      setCurrentLanguage(lang);
      i18n.changeLanguage(lang);

      // Invalidate queries that depend on language
      queryClient.invalidateQueries({ queryKey: ['movies'] });

      console.log("Language changed to:", lang);
    } catch (error) {
      console.error('Failed to save language preference:', error);
    }
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);