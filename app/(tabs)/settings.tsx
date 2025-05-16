import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from "nativewind";
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Settings = () => {
  const { setColorScheme, colorScheme } = useColorScheme();

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className='px-5 pt-10'>
        <Text className='text-white text-lg font-bold'>Language Settings</Text>
        <SettingsButton
          title='Português'
          onPress={() => { }}
          isActive={false}
        />
        <SettingsButton
          title='English'
          onPress={() => { }}
          isActive={false}
        />
        <Text className='text-white text-lg font-bold mt-8'>Theme Settings</Text>
        <SettingsButton
          title='Light'
          icon="lightbulb-on"
          onPress={() => setColorScheme("light")}
          isActive={colorScheme === "light"}
        />
        <SettingsButton
          title='Dark'
          icon="weather-night"
          onPress={() => setColorScheme("dark")}
          isActive={colorScheme === "dark"}
        />
        <SettingsButton
          title='System'
          icon="theme-light-dark"
          onPress={() => {
            setColorScheme("system");
            console.log(colorScheme);
          }}
          isActive={colorScheme !== "dark" && colorScheme !== "light"}
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
}

const SettingsButton = ({ title, icon, onPress, isActive }: SettingsButtonProps) => {

  return (
    <TouchableOpacity onPress={onPress} className='flex-row justify-between items-center bg-red-500 dark:bg-dark-200 p-5 rounded-[10px] mt-4'>
      <View className='flex-row items-center gap-3'>
        {icon && (
          <MaterialCommunityIcons name={icon} size={20} color="white" />
        )}
        <Text className='text-white text-sm font-medium'>{title}</Text>
      </View>
      <MaterialCommunityIcons
        name={isActive ? "check-circle" : "checkbox-blank-circle-outline"}
        size={20}
        color={isActive ? "#A8B5DB" : "white"}
      />
    </TouchableOpacity>
  )
}