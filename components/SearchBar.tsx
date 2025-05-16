import { icons } from "@/constants/icons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useRef } from "react";
import { Image, TextInput, View } from "react-native";

interface Props {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({ placeholder, value, onChangeText }: Props) => {
  const inputRef = useRef<TextInput>(null);

  useFocusEffect(
    useCallback(() => {
      const timeout = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);

      return () => clearTimeout(timeout);
    }, [])
  );

  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="w-5 h-5"
        resizeMode="contain"
        tintColor="#AB8BFF"
      />
      <TextInput
        ref={inputRef}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        className="flex-1 ml-2 text-white"
        placeholderTextColor="#A8B5DB"
        autoFocus={true}
      />
    </View>
  );
};

export default SearchBar;