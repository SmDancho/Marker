import { createSelector } from '@reduxjs/toolkit';

import { useAvergeRaiting } from '../../hooks/avergeRaiting';
import type { RootState } from '../store';

import type { post } from '../../types';
export const filter = (state: RootState) => state.userPosts.filter;
export const typeFilter = (state: RootState) => state.userPosts.typeFilter;
export const posts = (state: RootState) => state.userPosts.UserPost;

export const filteredPosts = createSelector(
  [filter, typeFilter, posts],
  (activeFilter, activeTypeFilter, allPosts) => {
    const byLikes = allPosts
      .filter((item) =>
        activeTypeFilter === 'All' ? item : item.group === activeTypeFilter
      )
      .sort((a: post, b: post) => {
        return b.likes.length - a.likes.length;
      });

    const byUserRate = allPosts
      .filter((item) =>
        activeTypeFilter === 'All' ? item : item.group === activeTypeFilter
      )
      .sort((a: post, b: post) => b.authorRaiting - a.authorRaiting);
      
    const byAvgRating = allPosts
      .filter((item) =>
        activeTypeFilter === 'All' ? item : item.group === activeTypeFilter
      )
      .sort(
        (a: post, b: post) =>
          useAvergeRaiting(b.raiting) - useAvergeRaiting(a.raiting)
      );

    if (activeFilter === 'likes') return byLikes;

    if (activeFilter === 'userRaiting') {
      return byUserRate;
    }

    return byAvgRating;
  }
);
