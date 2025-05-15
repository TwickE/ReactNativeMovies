import MovieCard from "@/components/MovieCard";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import { useQueries } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const [
    {
      data: trendingMovies,
      isLoading: trendingLoading,
      isError: trendingError
    },
    {
      data: movies,
      isLoading: moviesLoading,
      isError: moviesError
    }
  ] = useQueries({
    queries: [
      {
        queryKey: ['trendingMovies'],
        queryFn: () => getTrendingMovies()
      },
      {
        queryKey: ['movies'],
        queryFn: () => fetchMovies({ query: '' }),
      }
    ]
  });

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10
        }}
      >
        <Image source={icons.logo} className="size-12 mt-20 mb-5 mx-auto" />
        {moviesLoading || trendingLoading ? (
          <ActivityIndicator
            size="large"
            color="#000ff"
            className="mt-10 self-center"
          />
        ) : moviesError || trendingError ? (
          <Text className="text-red-500 mx-auto my-3">Error fetching movies</Text>
        ) : (
          <View className="flex-1 mt-5">
            <TouchableWithoutFeedback onPress={() => router.push("/search")}>
              <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
                <Image
                  source={icons.search}
                  className="w-5 h-5"
                  resizeMode="contain"
                  tintColor="#AB8BFF"
                />
                <Text className="flex-1 ml-2 text-light-200">Search for a movie</Text>
              </View>
            </TouchableWithoutFeedback>
            {trendingMovies && (
              <View className="mt-10">
                <Text className="text-lg text-white font-bold mb-3">Trending Movies</Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                  data={trendingMovies}
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                  keyExtractor={(item) => item.movie_id.toString()}
                  className="mb-4 mt-3"
                />
              </View>
            )}
            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>
              <FlatList
                data={movies}
                renderItem={({ item }) => (
                  <MovieCard {...item} />
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
