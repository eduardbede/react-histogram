import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import { useState, useEffect } from 'react';

export default function useGetApiData(){

const [dataFetch, setDataFetch] = useState([]);
const [loading, setLoading] = useState(true);
const url = 'https://fakerql.goosfraba.ro/graphql';
const query = `{
                    allPosts(count: 100){
                        createdAt
                    }
                }`;

useEffect(()=>{
    const client = new ApolloClient({
        uri: url,
        cache: new InMemoryCache(),
      });

      client
      .query({
        query: gql`${query}`,
      })
      .then((result) =>{
        setDataFetch(result);
        setLoading(result?.loading);
      });
},[]);
  return {dataFetch, loading};
}
