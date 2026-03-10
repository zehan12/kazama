import { useEffect } from 'react';
import { useModel, useModelEffectsLoading } from './store';

function App() {
  const [blog, blogDispatch] = useModel('blog');
  const loading = useModelEffectsLoading('blog');

  useEffect(() => {
    blogDispatch.fetchPosts();
  }, []);

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif', display: 'flex', gap: 40 }}>
      <div style={{ flex: 1 }}>
        <h1>Blog Posts</h1>
        {loading.fetchPosts ? (
          <p>Loading posts...</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {blog.posts.map((post: any) => (
              <li 
                key={post.id} 
                style={{ 
                  padding: 15, 
                  border: '1px solid #ccc', 
                  marginBottom: 10, 
                  cursor: 'pointer',
                  background: blog.selectedPost?.id === post.id ? '#f0f0f0' : 'white'
                }}
                onClick={() => blogDispatch.fetchPostDetails(post.id)}
              >
                <h3>{post.title}</h3>
                <p>{post.body.substring(0, 50)}...</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ flex: 1 }}>
        {loading.fetchPostDetails ? (
          <h2>Loading post details...</h2>
        ) : blog.selectedPost ? (
          <div>
            <h2>{blog.selectedPost.title}</h2>
            <p>{blog.selectedPost.body}</p>
            
            <h3>Comments ({blog.comments.length})</h3>
            <ul style={{ paddingLeft: 20 }}>
              {blog.comments.map((comment: any) => (
                <li key={comment.id} style={{ marginBottom: 15 }}>
                  <strong>{comment.email}</strong>
                  <p style={{ margin: '5px 0' }}>{comment.body}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <h2>Select a post to view details</h2>
        )}
      </div>
    </div>
  );
}

export default App;
