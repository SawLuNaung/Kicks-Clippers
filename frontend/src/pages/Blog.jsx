import { useState } from 'react';
import Title from '../components/Title';
import BlogPost from '../components/BlogPost';
//import { assets } from '../assets/assets';

const BlogPage = () => {
  const [posts] = useState([
    {
      id: 1,
      title: 'The Hottest Sneaker Drops of 2024',
      image: './blog2.jpg',
      description: 'Check out the latest sneaker releases and what makes them stand out.',
      content: 'Here is the full content of the blog post.',
      reactions: 24,
      comments: [{ user: 'John', text: 'Love these sneakers!' }],
    },
    {
      id: 2,
      title: 'Streetwear Trends You Can’t Miss',
      image: './blog1.jpg',
      description: 'Discover the most trending streetwear for this season.',
      content: 'Here is the full content of the blog post.',
      reactions: 18,
      comments: [{ user: 'Jane', text: 'The designs are dope!' }],
    },
    {
      id: 3,
      title: 'Streetwear Trends You Can’t Miss',
      image: './blog1.jpg',
      description: 'Discover the most trending streetwear for this season.',
      content: 'Here is the full content of the blog post.',
      reactions: 18,
      comments: [{ user: 'Jane', text: 'The designs are dope!' }],
    },
    {
      id: 4,
      title: 'Streetwear Trends You Can’t Miss',
      image: './blog1.jpg',
      description: 'Discover the most trending streetwear for this season.',
      content: 'Here is the full content of the blog post.',
      reactions: 18,
      comments: [{ user: 'Jane', text: 'The designs are dope!' }],
    },
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'LATEST '} text2={'BLOG'}/>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <BlogPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
