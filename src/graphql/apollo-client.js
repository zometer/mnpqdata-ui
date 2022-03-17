import { ApolloClient, InMemoryCache } from '@apollo/client'; 

const uri = process.env.REACT_APP_MPQDATA_API_URL + 'api/graphql';

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache()
});

export default client ;
