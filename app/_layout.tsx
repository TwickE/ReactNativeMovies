import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
/* import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; */
import { Stack } from "expo-router";
import './globals.css';

const client = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={client}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="movies/[id]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
