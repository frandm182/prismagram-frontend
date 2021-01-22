/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { withRouter } from 'react-router-dom';
import SearchPresenter from './SearchPresenter';
import { SEARCH } from './SearchQueries';


const Search = ({ location: { search } }) => {
  const [,term] = search.split('=');
  const { data, loading } = useQuery(SEARCH, { skip: !term, variables: { term } });
  return (
  <SearchPresenter 
    searchTerm={term}
    loading={loading}
    data={data}
  />);
}

export default withRouter(Search);