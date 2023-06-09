import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { post } from '../../types';
import { useCookie } from '../../hooks/getToken';
import { instance } from '../../utils/axios';

interface postData {
  postId?: string;
  userId?: string;
  title: string;
  topic: string;
  image?: File[];
  text: string;
  group?: string;
  tags?: string[];
  authorRaiting: number;
}

export interface postState {
  UserPost: post[];
  isLoading: boolean;
  status: string;
  allTags: string[];
  posts: post[];
  specificPost: post | null;
  searchedPosts: post[];
  error: string;
  filter: string;
  typeFilter: string;
}

const initialState: postState = {
  UserPost: [],
  isLoading: false,
  status: '',
  allTags: [],
  posts: [],
  specificPost: null,
  error: '',
  searchedPosts: [],
  filter: '',
  typeFilter: '',
};

export const addpost = createAsyncThunk(
  'postSlice/addpost',
  async ({
    title,
    topic,
    image,
    text,
    group,
    tags,
    authorRaiting,
    userId,
  }: postData) => {
    console.log('red', image)
    const data = await instance
      .post(
        '/post/add',
        {
          title,
          topic,
          image,
          text,
          group,
          tags: tags,
          authorRaiting,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${useCookie('token')}`,
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((response) => {
        return response.data;
      });
    return data;
  }
);

export const search = createAsyncThunk(
  'postSlice/search',
  async (request: string) => {
    const data = await instance
      .post('/search/posts', {
        request,
      })
      .then((response) => {
        return response.data;
      });
    return data;
  }
);

export const deletePost = createAsyncThunk(
  'postSlice/deletePost',

  async ({ postId, userId }: { postId: string; userId: string }) => {
    const data = await instance
      .delete('/post/delete', {
        headers: {
          Authorization: `Bearer ${useCookie('token')}`,
        },
        data: {
          postId,
          userId,
        },
      })
      .then((response) => {
        return response.data;
      });

    return data;
  }
);

export const updatePost = createAsyncThunk(
  'postSlice/updatePost',

  async ({ postId, text, title, topic, authorRaiting }: postData) => {
    const data = await instance
      .post(
        '/post/update',
        {
          postId,
          text,
          title,
          topic,
          authorRaiting,
        },
        {
          headers: {
            Authorization: `Bearer ${useCookie('token')}`,
          },
        }
      )
      .then((response) => {
        return response.data;
      });

    return data;
  }
);

export const getUserPosts = createAsyncThunk(
  'postSlice/getUserPosts',
  async (id: string) => {
    const data = await instance
      .get('/post/getUsersPosts', {
        headers: {
          Authorization: `Bearer ${useCookie('token')}`,
        },
        params: {
          id,
        },
      })
      .then((response) => {
        return response.data;
      });

    return data;
  }
);

export const getAllPosts = createAsyncThunk(
  'postSlice/getAllPosts',
  async () => {
    const data = await instance.get('/post/allPosts').then((response) => {
      return response.data;
    });

    return data;
  }
);

export const getPostById = createAsyncThunk(
  'postSlice/PostBuId',
  async (_id: string) => {
    const data = await instance
      .post('/post/postById', {
        postID: _id,
      })
      .then((response) => {
    
        return response.data;
      });

    return data;
  }
);

export const likePost = createAsyncThunk(
  'postSlice/likePost',

  async (_id: string) => {
    const data = await instance
      .post(
        '/post/likePosts',
        {
          postID: _id,
        },
        {
          headers: {
            Authorization: `Bearer ${useCookie('token')}`,
          },
        }
      )
      .then((response) => {
        return response.data;
      });

    return data;
  }
);

export const addComment = createAsyncThunk(
  'postSlice/addComment',

  async ({ _id, commentText }: { _id: string; commentText: string }) => {
    const data = await instance
      .post(
        '/post/comment',
        {
          postID: _id,
          text: commentText,
        },
        {
          headers: {
            Authorization: `Bearer ${useCookie('token')}`,
          },
        }
      )
      .then((response) => {
        return response.data;
      });

    return data;
  }
);
export const getTags = createAsyncThunk('postSlice/getTags', async () => {
  const data = await instance.get('/post/getTags').then((response) => {
    return response.data;
  });

  return data;
});
export const addRaiting = createAsyncThunk(
  'postSlice/addRaiting',

  async ({ _id, value }: { _id: string; value: number }) => {
    const data = await instance
      .post(
        '/post/rate',
        {
          postID: _id,
          value,
        },
        {
          headers: {
            Authorization: `Bearer ${useCookie('token')}`,
          },
        }
      )
      .then((response) => {
        return response.data;
      });

    return data;
  }
);

export const postSlice = createSlice({
  name: 'postSlice',
  initialState,
  reducers: {
    activeFilter: (state, action) => {
      state.filter = action.payload;
    },
    activeFilterByType: (state, action) => {
      state.typeFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addpost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(addpost.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(addpost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.error = action.payload.message;
    });
    builder.addCase(search.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(search.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(search.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.searchedPosts = action.payload;
    });
    builder.addCase(getUserPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(getUserPosts.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getUserPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;

      state.UserPost = action.payload;
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(deletePost.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    });

    builder.addCase(getAllPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(getAllPosts.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.posts = action.payload;
    });

    builder.addCase(getPostById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(getPostById.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getPostById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.specificPost = action.payload;
    });

    builder.addCase(likePost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(likePost.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(likePost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    });
    builder.addCase(addComment.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(addComment.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    });

    builder.addCase(addRaiting.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(addRaiting.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(addRaiting.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    });
    builder.addCase(getTags.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(getTags.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTags.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allTags = action.payload;
      state.status = action.payload.message;
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(updatePost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    });
  },
});

export const { activeFilter, activeFilterByType } = postSlice.actions;
export default postSlice.reducer;
