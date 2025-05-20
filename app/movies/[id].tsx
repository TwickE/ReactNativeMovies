import { images } from '@/constants/images';
import { useLanguage } from '@/context/LanguageContext';
import { fetchMovieDetails } from '@/services/tmdb';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useQuery } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => {
  return (
    <View className='flex-col items-start justify-center mt-5'>
      <Text className='text-dark-200 dark:text-light-200 font-normal text-sm'>{label}</Text>
      <Text className='text-dark-100 dark:text-light-100 font-bold text-sm mt-2'>{value || 'N/A'}</Text>
    </View>
  )
}

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const { t } = useTranslation("global");
  const { currentLanguage } = useLanguage();

  const {
    data: movie,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['movie', currentLanguage, id],
    queryFn: () => fetchMovieDetails(id as string, currentLanguage)
  });

  return (
    <View className='bg-light-200 dark:bg-primary flex-1'>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : isError ? (
          <Text className="text-red-500 mx-auto my-3">{t("movieDetails.error")}</Text>
        ) : (
          <>
            <View className='flex-1 items-center justify-center'>
              <Image
                source={
                  movie?.poster_path
                    ? { uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }
                    : images.noPoster
                }
                className="w-full h-[550PX]" resizeMode="cover"
              />
            </View>
            <View className='flex-col items-start justify-center mt-5 px-5'>
              <Text className="text-black dark:text-white font-bold tet-xl">{movie?.title}</Text>
              <View className='flex-row items-center gap-x-1 mt-2'>
                <Text className='text-dark-200 dark:text-light-200 text-sm'>{movie?.release_date?.split('-')[0]}</Text>
                <Text className='text-dark-200 dark:text-light-200 text-sm'>{movie?.runtime}min</Text>
              </View>
              <View className='flex-row items-center bg-light-100 dark:bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2'>
                <FontAwesome name="star" size={20} color="#f7d638" />
                <Text className='text-black dark:text-white font-bold text-sm'>{movie?.vote_average?.toFixed(1)}/10</Text>
                <Text className='text-dark-200 dark:text-light-200 text-sm'>({movie?.vote_count} votes)</Text>
              </View>
              <MovieInfo label={t("movieDetails.overview")} value={movie?.overview} />
              <MovieInfo label={t("movieDetails.genres")} value={movie?.genres?.map((genre: { name: string }) => genre.name).join(' · ') || 'N/A'} />
              <View className='flex flex-row justify-between w-1/2'>
                <MovieInfo label={t("movieDetails.budget")} value={`$${(movie?.budget ?? 0) / 1_000_000} million` || 'N/A'} />
                <MovieInfo label={t("movieDetails.revenue")} value={`$${Math.round((movie?.revenue ?? 0) / 1_000_000)} million` || 'N/A'} />
              </View>
              <MovieInfo label={t("movieDetails.prodCompany's")} value={movie?.production_companies?.map((company: { name: string }) => company.name).join(' · ') || 'N/A'} />
            </View>
          </>
        )}
      </ScrollView>
      <TouchableOpacity
        className='absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50'
        onPress={() => router.back()}
      >
        <FontAwesome5 name="arrow-left" size={20} color="white" />
        <Text className='text-white font-bold text-base ml-1'>Go Back</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MovieDetails