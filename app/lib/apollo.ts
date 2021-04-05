import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { LocalStorageWrapper, persistCache } from 'apollo3-cache-persist';
import { useCallback, useMemo } from 'react';

import { cache } from '../context/statistic/cache';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

function createApolloClient() {
  const authLink = setContext((_, { headers }) => {
    const token = sessionStorage.getItem('token');

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });
  const httpLink = new HttpLink({
    uri: 'http://localhost:8000/graphql',
    credentials: 'include',
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: cache,
    connectToDevTools: true,
  });
}

export function initializeApollo(initialState: any = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  if (typeof window === 'undefined') return _apolloClient;

  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
