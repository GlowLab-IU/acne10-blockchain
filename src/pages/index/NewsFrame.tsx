import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Header, Page, Text, BottomNavigation, Icon } from "zmp-ui";

interface NewsProps {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

const NewsFrame: React.FC = () => {
  const location = useLocation();
  const { article }: { article: NewsProps } = location.state || {};

  if (!article) {
    return <p>Article not found</p>;
  }

  const {
    source,
    author,
    title,
    description,
    urlToImage,
    publishedAt,
    content,
  } = article;

  return (
  <Page>
  <Header title="Daily News" />
    <Box
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dwljkfseh/image/upload/v1729323375/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2024-10-19_lu%CC%81c_14.33.11_s95och.png')",
        backgroundSize: "cover",
        height: "700px",
        padding: "16px",
        overflowY: "auto",
      }}
    >
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
      <img
        src={urlToImage || "https://via.placeholder.com/500"}
        alt={title}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        <p className="text-gray-500 text-sm">By {author || "Unknown"}</p>
        <p className="text-gray-400 text-sm">
          Source: <strong>{source.name}</strong>
        </p>
        <p className="text-gray-500 text-sm">Published: {new Date(publishedAt).toLocaleString()}</p>
        <p className="text-gray-600 mt-4">{description}</p>
      </div>

      {content ? (
  <div className="mt-4">
    <h4 className="text-xl font-bold">Preview Content:</h4>
    <p className="text-gray-600">{content}</p>
    <h6 className="text-xl font-bold">Full Content:</h6>
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 underline hover:text-blue-700"
    >
      Read Article
    </a>
  </div>
) : (
  <p className="text-gray-600 mt-4">No full content available.</p>
)}

    </div>
  </Box>
  </Page>
  );
};

export default NewsFrame;
