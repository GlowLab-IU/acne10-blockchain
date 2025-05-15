import { ProductPicker } from "../../components/product/picker";
import { Section } from "../../components/section";
import { ProductSlideSkeleton } from "../../components/skeletons";
import React, { useEffect, useState } from "react";
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Text, Button } from "zmp-ui";
import { useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const API_URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=skincare&category=health`;

console.log('API KEY:', API_KEY); 
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
      if (data.results) {
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
    // Transform the newsdata.io format to match our NewsProps structure
    const transformedArticle = {
      source: { 
        id: article.source_id,
        name: article.source_name 
      },
      author: article.creator ? article.creator.join(', ') : null,
      title: article.title,
      description: article.description || '',
      url: article.link,
      urlToImage: article.image_url,
      publishedAt: article.pubDate,
      content: article.content
    };
    
    navigate('/NewsFrame', { state: { article: transformedArticle } });
  };

  return (
    <Section title="">
      <div className="flex items-center justify-between">
        <h2 className="font-bold">Daily News</h2>
        <Button
          size="small"
          onClick={fetchNews}
          className="bg-blue-500 text-white"
        >
          Reload
        </Button>
      </div>

      {loading ? (
        <Swiper slidesPerView={1.25} spaceBetween={16} className="px-4">
          {[...Array(3)].map((_, i) => (
            <SwiperSlide key={i}>
              <ProductSlideSkeleton />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Swiper slidesPerView={1.25} spaceBetween={16} className="px-4">
          {news.map((article, index) => (
            <SwiperSlide key={index}>
              <ProductPicker product={{ id: index.toString() }}>
                {({ open }) => (
                  <div onClick={() => handleOnClick(article)}>
                    <Box
                      className="relative aspect-video rounded-lg bg-cover bg-center bg-skeleton"
                      style={{
                        backgroundImage: `url(${article.image_url || ""})`,
                      }}
                    />
                    <Box className="flex items-center justify-center mt-2">
                      <Text size="small">{article.title}</Text>
                    </Box>
                  </div>
                )}
              </ProductPicker>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Section>
  );
};

