import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const TabIcon = ({ focused, icon, title }: any) => {
  if (focused) {
    return (
      <View className='flex flex-row flex-1 min-w-[140px] w-full min-h-16 mt-4 justify-center items-center rounded-full bg-light-100'>
        <FontAwesome name={icon} size={24} color="#151312" />
        <Text className='text-secondary text-base font-semibold ml-2'>{title}</Text>
      </View>
    )
  }

  return (
    <View className='size-full justify-center items-center mt-4 rounded-full'>
      <FontAwesome name={icon} size={24} color="#A8B5DB" />
    </View>
  )
}

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarStyle: {
          backgroundColor: '#0F0D23',
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: 'absolute',
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: '#0F0D23',
        }
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (<TabIcon focused={focused} icon="home" title='Home' />)
        }}
      />
      <Tabs.Screen
        name='search'
        options={{
          title: 'Search',
          headerShown: false,
          tabBarIcon: ({ focused }) => (<TabIcon focused={focused} icon="search" title='Search' />)
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: 'Settings',
          headerShown: false,
          tabBarIcon: ({ focused }) => (<TabIcon focused={focused} icon="gear" title='Settings' />)
        }}
      />
    </Tabs>
  )
}

export default _layout