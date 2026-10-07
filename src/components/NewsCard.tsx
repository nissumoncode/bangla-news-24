import Image from "next/image";
import Link from "next/link";
interface News {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
}

const NewsCard = ({ news }: { news: News }) => {
  return (
    <Link href={`/news/${news.id}`}>
      <div className="card bg-base-100 overflow-hidden shadow-md">
        <figure>
          <Image
            height={600}
            width={600}
            src={news.imageUrl}
            alt={news.imageAlt || news.title}
            className="h-60 w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </figure>

        <div className="px-3 pt-2 pb-3">
          <h2 className="card-title text-xl font-bold leading-snug mt-1">
            {news.title}
          </h2>

          <p className="line-clamp-3 text-sm leading-6 text-gray-600 mt-1">
            {news.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
