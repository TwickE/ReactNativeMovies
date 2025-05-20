import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { updateSearchCount } from "@/services/appwrite";
import { fetchMovies } from "@/services/tmdb";
import useDebounce from "@/services/useDebounce";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { t } = useTranslation("global");

  const {
    data: movies,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['movies', debouncedSearchQuery],
    queryFn: ({ pageParam }) => fetchMovies({ query: searchQuery, pageNumber: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
    },
    enabled: !!debouncedSearchQuery,
  })
  const searchedMovies = movies?.pages.flatMap((page) => page.results || []);

  const saveSearchMutation = useMutation({
    mutationFn: async ({ query, movie }: { query: string; movie: any }) => {
      await updateSearchCount(query.toLowerCase(), movie);
    }
  });

  useEffect(() => {
    if (searchedMovies && searchedMovies.length > 0 && debouncedSearchQuery) {
      saveSearchMutation.mutate({
        query: debouncedSearchQuery,
        movie: searchedMovies[0]
      });
    }
  }, [movies]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  return (
    <View className="flex-1 bg-light-200 dark:bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
      <View className="px-5 pt-20">
        <Image source={icons.logo} className="size-12 mb-5 mx-auto" />
        <SearchBar
          placeholder={t("searchBar.placeholder")}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" className="py-5" />
      ) : isError ? (
        <Text className="text-red-500 mx-auto my-3">{t("search.error")}</Text>
      ) : searchQuery.trim() && searchedMovies?.length! > 0 && (
        <>
          <Text className="text-xl text-black dark:text-white font-bold m-5">
            {t("search.results")}
            <Text className="text-accent">{searchQuery}</Text>
          </Text>
          <FlatList
            data={searchedMovies}
            renderItem={({ item }) => item && <MovieCard {...item} />}
            keyExtractor={(item) => item?.id?.toString() || Math.random().toString()}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "flex-start",
              gap: 20,
              paddingHorizontal: 20,
              marginBottom: 10,
            }}
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
            className="bg-light-200 dark:bg-primary"
          />
        </>
      )}
    </View>
  );
}

export default Search;