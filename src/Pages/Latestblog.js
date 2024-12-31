import React from 'react'

const Latestblog = () => {
  const blogData = [
    {
      imageUrl: 'https://via.placeholder.com/600x400',
      alttag: 'Blog Image 1',
      title: 'Blog Post 1',
      slug: 'blog-post-1',
    },
    {
      imageUrl: 'https://via.placeholder.com/600x400',
      alttag: 'Blog Image 2',
      title: 'Blog Post 2',
      slug: 'blog-post-2',
    },
    {
      imageUrl: 'https://via.placeholder.com/600x400',
      alttag: 'Blog Image 3',
      title: 'Blog Post 3',
      slug: 'blog-post-3',
    },
    {
      imageUrl: 'https://via.placeholder.com/600x400',
      alttag: 'Blog Image 4',
      title: 'Blog Post 4',
      slug: 'blog-post-4',
    },
  ];
  return (
    <div className="mb-10">
      <div className="relative mb-32 md:mb-48">
        <div className="absolute inset-0 bg-[#EDEEF4] pt-12 pb-8 md:pb-16"></div>
        <div className="relative z-10 max-w-[95%] lg:max-w-6xl 2xl:max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-end h-full pb-8 md:pb-12">
          {/* Blog Title Section */}
          <div className="mt-12 md:mt-20 pb-6 md:pb-10 w-full md:w-[60%]">
            <div className="mb-4 flex items-center">
              <h2 className="text-lg md:text-xl font-bold uppercase text-gray-600">LATEST BLOGS</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Blogs Preview */}
      <div className="max-w-[95%] lg:max-w-6xl 2xl:max-w-7xl mx-auto px-4 md:px-8 lg:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Loop over the first 4 blogs */}
          {blogData?.slice(0, 4).map((article, index) => (
            <div key={index} className="relative">
              <div className="absolute inset-0 bg-[#EDEEF4] pt-12 pb-8 md:pb-16"></div>
              <div className="relative z-10">
                {/* Article Image */}
                <div className="mb-4">
                  <img
                    src={article.imageUrl}
                    alt={article.alttag}
                    className="w-full max-w-[400px] h-auto shadow-lg object-cover"
                  />
                </div>
                {/* Article Title */}
                <h3 className="text-xl font-bold text-gray-800">{article.title}</h3>
                {/* Link to Detailed View Page */}
                <a href={`/blog/${article.slug}`} className="text-blue-600 mt-2 inline-block">Read more</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Latestblog