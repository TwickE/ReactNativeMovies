import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
/* import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; */
import { Stack } from "expo-router";
import './globals.css';

import global_en from '@/assets/translations/en/global.json';
import global_pt from '@/assets/translations/pt/global.json';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';

i18next.init({
  fallbackLng: "en",
  resources: {
    en: {
      global: global_en
    },
    pt: {
      global: global_pt
    }
  }
});

const client = new QueryClient();

export default function RootLayout() {
  return (
    <I18nextProvider i18n={i18next}>
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
    </I18nextProvider>
  );
}
