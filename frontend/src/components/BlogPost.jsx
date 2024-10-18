import { useState } from 'react';
import PropTypes from 'prop-types';

const BlogPost = ({ post }) => {
  const [showFullPost, setShowFullPost] = useState(false);
  const [reactionCount, setReactionCount] = useState(post.reactions);
  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState('');
  const [userLiked, setUserLiked] = useState(false); // To track if the user has liked the post

  const togglePost = () => setShowFullPost(!showFullPost);

  // Toggle like/unlike
  const toggleLike = () => {
    if (userLiked) {
      setReactionCount(reactionCount - 1);
      setUserLiked(false);
    } else {
      setReactionCount(reactionCount + 1);
      setUserLiked(true);
    }
  };

  const handleCommentChange = (e) => setNewComment(e.target.value);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const comment = { user: 'Anonymous', text: newComment };
    setComments([...comments, comment]);
    setNewComment('');
  };

  return (
    <div className="border p-4 rounded-lg shadow-md">
      {/* Blog post image, title, and description */}
      <img src={post.image} alt={post.title} className="w-full h-48 object-cover mb-4 rounded-lg" />
      <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
      <p className="text-gray-600 mb-4">{post.description}</p>
      <button onClick={togglePost} className="text-blue-500 hover:underline">
        {showFullPost ? 'Show Less' : 'Read More'}
      </button>

      {/* Full content, reactions, and comments */}
      {showFullPost && (
        <div className="mt-4">
          <p>{post.content}</p>
          <div className="mt-4">
            <button
              onClick={toggleLike}
              className={`px-4 py-2 ${
                userLiked ? 'bg-blue-500 ' : 'bg-gray-300'
              } text-white rounded-lg hover:bg-blue-600`}
            >
              👍 {reactionCount}
            </button>
          </div>

          {/* Comments */}
          <div className="mt-6">
            <h3 className="font-bold mb-2">Comments</h3>
            {comments.length > 0 ? (
              <ul className="space-y-4">
                {comments.map((comment, index) => (
                  <li key={index} className="p-2 border rounded-lg">
                    <p className="font-semibold">{comment.user}</p>
                    <p>{comment.text}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No comments yet.</p>
            )}

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mt-4">
              <textarea
                value={newComment}
                onChange={handleCommentChange}
                className="w-full p-2 border rounded-lg mb-2"
                placeholder="Write a comment..."
              />
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Submit Comment
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// PropTypes validation
BlogPost.propTypes = {
  post: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    reactions: PropTypes.number.isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        user: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default BlogPost;
