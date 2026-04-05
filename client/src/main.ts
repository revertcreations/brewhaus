import { createApp, provide, h } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";

const apolloClient = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URL || "http://localhost:4000",
  cache: new InMemoryCache(),
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

app.use(router);
app.mount("#app");
