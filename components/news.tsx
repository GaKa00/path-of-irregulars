import NewsCard from "@/ui/newscard";
import newsData from "@/data/news.json";

export default function News() {
    const { newsItems } = newsData;
    return (
      <>
      <section>
        {newsItems.map(news => (
            <NewsCard 
                key={news.id}
                id={news.id}
                title={news.title}
                description={news.description}
                date={news.date}
            />
        ))}
      </section>
      </>
    );
}
