import MovieCard from "@/components/MovieCard";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { getTrendingMovies } from "@/services/appwrite";
import { fetchMovies } from "@/services/tmdb";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, Text, TouchableWithoutFeedback, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    isLoading: trendingLoading,
    isError: trendingError
  } = useQuery({
    queryKey: ['trendingMovies'],
    queryFn: getTrendingMovies
  });

  const {
    data: moviesData,
    isLoading: moviesLoading,
    isError: moviesError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['movies'],
    queryFn: ({ pageParam }) => fetchMovies({ query: '', pageNumber: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
    }
  })
  const allMovies = moviesData?.pages.flatMap((page) => page.results || []);

  const renderHeader = () => (
    <>
      <Image source={images.bg} className="absolute w-full z-0" />
      <View className="px-5 pt-20">
        <Image source={icons.logo} className="size-12 mb-5 mx-auto" />
        <TouchableWithoutFeedback onPress={() => router.push("/search")}>
          <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
            <Image source={icons.search} className="w-5 h-5" resizeMode="contain" tintColor="#AB8BFF" />
            <Text className="flex-1 ml-2 text-light-200">Search for a movie</Text>
          </View>
        </TouchableWithoutFeedback>
        <View className="mt-10">
          <Text className="text-lg text-white font-bold mb-3">Trending Movies</Text>
          {trendingLoading ? (
            <ActivityIndicator size="large" color="#0000ff" className="py-5" />
          ) : trendingError ? (
            <Text className="text-red-500 mx-auto my-3">Error fetching trending movies</Text>
          ) : (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View className="w-5" />}
              data={trendingMovies}
              renderItem={({ item, index }) =>
                item ? <TrendingCard movie={item} index={index} /> : null
              }
              keyExtractor={(item) => item?.movie_id?.toString() || Math.random().toString()}
              className="mb-4 mt-3"
            />
          )}
        </View>
        <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>
      </View>
    </>
  );

  return (
    moviesLoading ? (
      <View className="flex-1 bg-primary">
        {renderHeader()}
        <ActivityIndicator size="large" color="#0000ff" className="py-5" />
      </View>
    ) : moviesError ? (
      <View className="flex-1 bg-primary">
        {renderHeader()}
        <Text className="text-red-500 mx-auto my-3">Error fetching movies</Text>
      </View>
    ) : allMovies && allMovies.length > 0 ? (
      <FlatList
        data={allMovies}
        renderItem={({ item }) => item && <MovieCard {...item} />}
        keyExtractor={(item) => item?.id?.toString() || Math.random().toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          paddingHorizontal: 20,
          marginBottom: 10,
        }}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator size="large" color="#0000ff" className="py-5" />
          ) : null
        }
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        className="bg-primary"
      />
    ) : null
  );
}