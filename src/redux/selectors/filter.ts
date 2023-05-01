import { createSelector } from '@reduxjs/toolkit';

import { useAvergeRaiting } from '../../hooks/avergeRaiting';
import type { RootState } from '../store';

import type { post } from '../../types';
export const filter = (state: RootState) => state.userPosts.filter;
export const typeFilter = (state: RootState) => state.userPosts.typeFilter;
export const posts = (state: RootState) => state.userPosts.UserPost;
export const allPosts = (state: RootState) => state.userPosts.posts;

const filterFunction = (type: string, filter: string, data: post[]) => {
  const byLikes = data
    .filter((item: post) => (filter === 'All' ? item : item.group === filter))
    .sort((a: post, b: post) => {
      return b.likes.length - a.likes.length;
    });

  const byUserRate = data
    .filter((item: post) => (filter === 'All' ? item : item.group === filter))
    .sort((a: post, b: post) => b.authorRaiting - a.authorRaiting);

  const byAvgRating = data
    .filter((item: post) => (filter === 'All' ? item : item.group === filter))
    .sort(
      (a: post, b: post) =>
        useAvergeRaiting(b.raiting) - useAvergeRaiting(a.raiting)
    );

  if (type === 'likes') return byLikes;

  if (type === 'userRaiting') {
    return byUserRate;
  }

  return byAvgRating;
};

export const filteredUserPosts = createSelector(
  [filter, typeFilter, posts],
  (activeFilter, activeTypeFilter, allPosts) => {
    return filterFunction(activeFilter, activeTypeFilter, allPosts);
  }
);

export const filteredAllPosts = createSelector(
  [filter, typeFilter, allPosts],
  (activeFilter, activeTypeFilter, allPosts) => {
    return filterFunction(activeFilter, activeTypeFilter, allPosts);
  }
);
