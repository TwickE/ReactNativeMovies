import { images } from '@/constants/images'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Link } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const MovieCard = ({ id, poster_path, title, vote_average, release_date }: Movie) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className='w-[30%]'>
        <Image
          source={
            poster_path
              ? { uri: `https://image.tmdb.org/t/p/w500${poster_path}` }
              : images.noPoster
          }
          className='w-full h-52 rounded-lg'
          resizeMode='cover'
        />
        <Text className='text-sm font-bold text-black dark:text-white mt-2' numberOfLines={1}>{title}</Text>
        <View className='flex-row items-center justify-start gap-x-1'>
          <FontAwesome name="star" size={16} color="#f7d638" />
          <Text className='text-xs text-black dark:text-white font-bold uppercase'>{vote_average?.toFixed(1)}</Text>
        </View>
        <View className='flex-row items-center justify-between'>
          <Text className='text-xs text-dark-100 dark:text-light-300 font-medium mt-1'>{release_date?.split('-')[0]}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  )
}

export default MovieCard