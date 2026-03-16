export const blog = {
  state: {
    posts: [],
    selectedPost: null,
    comments: [],
  },
  reducers: {
    setPosts: (state: any, payload: any[]) => {
      state.posts = payload;
    },
    setSelectedPost: (state: any, payload: any) => {
      state.selectedPost = payload;
      state.comments = []; // Clear comments when selecting new post
    },
    setComments: (state: any, payload: any[]) => {
      state.comments = payload;
    }
  },
  effects: () => ({
    async fetchPosts(_payload: void, _rootState: any, request: any) {
      const data = await request.get('/posts?_limit=5');
      (this as any).setPosts(data);
    },
    async fetchPostDetails(postId: number, _rootState: any, request: any) {
      const [post, comments] = await Promise.all([
        request.get(`/posts/${postId}`),
        request.get(`/posts/${postId}/comments`)
      ]);
      (this as any).setSelectedPost(post);
      (this as any).setComments(comments);
    }
  })
};
