import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from "nativewind";
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Settings = () => {
  const { setColorScheme, colorScheme } = useColorScheme();
  const [selectedTheme, setSelectedTheme] = useState("");

  useEffect(() => {
    setSelectedTheme(colorScheme!);
  }, []);

  const { t, i18n } = useTranslation("global");

  useEffect(() => {
    const loadSavedLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('language');
        if (savedLanguage) {
          i18n.changeLanguage(savedLanguage);
        }
      } catch (error) {
        console.error('Failed to load language preference:', error);
      }
    };

    loadSavedLanguage();
  }, [i18n]);

  const handleChangeLanguage = async (lang: string) => {
    try {
      await AsyncStorage.setItem('language', lang);
      i18n.changeLanguage(lang);
    } catch (error) {
      console.error('Failed to save language preference:', error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-light-200 dark:bg-primary">
      <View className='px-5 pt-10'>
        <Text className='text-black dark:text-white text-lg font-bold'>{t("settings.languageTitle")}</Text>
        <SettingsButton
          title='Português'
          onPress={() => handleChangeLanguage("pt")}
          isActive={i18n.language === "pt"}
          theme={colorScheme}
        />
        <SettingsButton
          title='English'
          onPress={() => handleChangeLanguage("en")}
          isActive={i18n.language === "en"}
          theme={colorScheme}
        />
        <Text className='text-black dark:text-white text-lg font-bold mt-8'>{t("settings.themeTitle")}</Text>
        <SettingsButton
          title={t("settings.lightMode")}
          icon="lightbulb-on"
          onPress={() => {
            setColorScheme("light");
            setSelectedTheme("light");
          }}
          isActive={selectedTheme === "light"}
          theme={colorScheme}
        />
        <SettingsButton
          title={t("settings.darkMode")}
          icon="weather-night"
          onPress={() => {
            setColorScheme("dark");
            setSelectedTheme("dark");
          }}
          isActive={selectedTheme === "dark"}
          theme={colorScheme}
        />
        <SettingsButton
          title={t("settings.systemMode")}
          icon="theme-light-dark"
          onPress={() => {
            setColorScheme("system");
            setSelectedTheme("system");
          }}
          isActive={selectedTheme === "system"}
          theme={colorScheme}
        />
      </View>
    </SafeAreaView>
  )
}

export default Settings

type SettingsButtonProps = {
  title: string;
  icon?: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  onPress: () => void;
  isActive: boolean;
  theme?: string;
}

const SettingsButton = ({ title, icon, onPress, isActive, theme }: SettingsButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} className='flex-row justify-between items-center bg-light-100 dark:bg-dark-200 p-5 rounded-[10px] mt-4'>
      <View className='flex-row items-center gap-3'>
        {icon && (
          <MaterialCommunityIcons name={icon} size={20} color={theme === "dark" ? "white" : "black"} />
        )}
        <Text className='text-black dark:text-white text-sm font-medium'>{title}</Text>
      </View>
      <MaterialCommunityIcons
        name={isActive ? "check-circle" : "checkbox-blank-circle-outline"}
        size={20}
        color={
          isActive ? ("#0000ff")
            : theme === 'dark' ? ("white")
              : "black"
        }
      />
    </TouchableOpacity>
  )
}