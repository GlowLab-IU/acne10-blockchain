import { ProductPicker } from "../../components/product/picker";
import { Section } from "../../components/section";
import { ProductSlideSkeleton } from "../../components/skeletons";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Text, Button } from "zmp-ui";
import { useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const API_URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=skincare&category=health`;

interface NewsItem {
  source_id: string;
  title: string;
  description: string;
  link: string;
  image_url: string | null;
  pubDate: string;
  content: string | null;
  creator: string[] | null;
  source_name: string;
}

export const News: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (Array.isArray(data.results)) {
        setNews(data.results);
      } else {
        setNews([]);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleOnClick = (article: NewsItem) => {
    const transformedArticle = {
      source: {
        id: article.source_id,
        name: article.source_name,
      },
      author: article.creator ? article.creator.join(", ") : null,
      title: article.title,
      description: article.description || "",
      url: article.link,
      urlToImage: article.image_url,
      publishedAt: article.pubDate,
      content: article.content,
    };

    navigate("/NewsFrame", { state: { article: transformedArticle } });
  };

  const Navbar = () => (
    <Box className="bg-gradient-to-r from-blue-500 to-sky-400 text-white py-4 px-6 shadow-md rounded-b-2xl">
      <Text size="large" className="font-bold text-center text-white text-xl">
        📰 Daily Skincare News
      </Text>
    </Box>
  );

  return (
    <>
      <Navbar />
      <Section title="">
        <div className="flex items-center justify-between px-4 mb-2">
          <h2 className="text-lg font-semibold text-gray-800">
            Tin tức mỗi ngày
          </h2>
          <Button
            size="small"
            onClick={fetchNews}
            className="bg-blue-500 text-white rounded-full px-3 py-1 shadow-md"
          >
            Tải lại
          </Button>
        </div>
        {loading ? (
          <div className="px-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="mb-4">
                <ProductSlideSkeleton />
              </div>
            ))}
          </div>
        ) : (
          <div className="px-4">
            {/* Mobile: Swiper | Desktop: Grid */}
            <div className="block md:hidden">
              <Swiper slidesPerView={1.25} spaceBetween={16}>
                {news.map((article, index) => (
                  <SwiperSlide key={index}>
                    <ProductPicker
                      product={{
                        id: index,
                        name: article.title,
                        image: article.image_url || "",
                        price: 0,
                        categoryId: ["news"],
                      }}
                    >
                      {({ open }) => (
                        <div
                          onClick={() => handleOnClick(article)}
                          className="cursor-pointer transition-transform hover:scale-[1.02]"
                        >
                          <Box
                            className="aspect-video bg-gray-200 rounded-2xl shadow-md overflow-hidden bg-cover bg-center"
                            style={{
                              backgroundImage: `url(${
                                article.image_url || ""
                              })`,
                            }}
                          />
                          <Box className="mt-2 text-center">
                            <Text
                              size="small"
                              className="font-medium text-gray-800 line-clamp-2"
                            >
                              {article.title}
                            </Text>
                          </Box>
                        </div>
                      )}
                    </ProductPicker>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Desktop: Grid layout */}
            <div
              className="
    hidden md:grid 
    grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
    grid-rows-2 
    gap-4 
    max-h-[700px] 
    overflow-y-auto
    px-1
  "
            >
              {news.map((article, index) => (
                <ProductPicker
                  key={index}
                  product={{
                    id: index,
                    name: article.title,
                    image: article.image_url || "",
                    price: 0,
                    categoryId: ["news"],
                  }}
                >
                  {({ open }) => (
                    <div
                      onClick={() => handleOnClick(article)}
                      className="cursor-pointer transition-transform hover:scale-[1.02]"
                    >
                      <Box
                        className="aspect-[4/3] bg-gray-200 rounded-2xl shadow-md overflow-hidden bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${article.image_url || ""})`,
                        }}
                      />
                      <Box className="mt-2 text-center">
                        <Text
                          size="small"
                          className="font-medium text-gray-800 line-clamp-2"
                        >
                          {article.title}
                        </Text>
                      </Box>
                    </div>
                  )}
                </ProductPicker>
              ))}
            </div>
          </div>
        )}
      </Section>
    </>
  );
};
