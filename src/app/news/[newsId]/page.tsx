import Image from "next/image";

const renderContent = (content: unknown, index = 0): React.ReactNode => {
  // String হলে paragraph
  if (typeof content === "string") {
    return (
      <p key={index} className="mb-6">
        {content}
      </p>
    );
  }

  // Number / boolean
  if (typeof content === "number" || typeof content === "boolean") {
    return (
      <p key={index} className="mb-6">
        {String(content)}
      </p>
    );
  }

  // Array হলে প্রত্যেক item render
  if (Array.isArray(content)) {
    return content.map((item, i) => renderContent(item, i));
  }

  // null / undefined
  if (!content || typeof content !== "object") {
    return null;
  }

  const block = content as Record<string, unknown>;

  /*
   * Text
   */
  if (typeof block.text === "string") {
    return (
      <p key={index} className="mb-6">
        {block.text}
      </p>
    );
  }

  /*
   * Heading
   */
  if (typeof block.heading === "string" || typeof block.title === "string") {
    return (
      <h2
        key={index}
        className="mt-10 mb-5 text-2xl md:text-3xl font-bold leading-tight text-gray-900"
      >
        {String(block.heading ?? block.title)}
      </h2>
    );
  }

  /*
   * Image
   */
  const imageUrl =
    typeof block.imageUrl === "string"
      ? block.imageUrl
      : typeof block.url === "string"
        ? block.url
        : typeof block.src === "string"
          ? block.src
          : null;

  if (imageUrl) {
    const caption =
      typeof block.caption === "string"
        ? block.caption
        : typeof block.imageAlt === "string"
          ? block.imageAlt
          : "";

    return (
      <figure key={index} className="my-10">
        <Image
          src={imageUrl}
          alt={caption}
          width={1200}
          height={700}
          className="w-full h-auto object-cover"
        />

        {caption && (
          <figcaption className="mt-2 text-sm leading-6 text-gray-500">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  /*
   * blocks/content/children-এর ভিতরে data থাকলে
   * recursively render
   */
  if (block.blocks) {
    return <div key={index}>{renderContent(block.blocks, index)}</div>;
  }

  if (block.content) {
    return <div key={index}>{renderContent(block.content, index)}</div>;
  }

  if (block.children) {
    return <div key={index}>{renderContent(block.children, index)}</div>;
  }

  return null;
};

const NewsDetails = async ({
  params,
}: {
  params: Promise<{ newsId: string }>;
}) => {
  const { newsId } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/article/${newsId}`,
  );

  const data = await res.json();
  const news = data.data;

  return (
    <article className="max-w-4xl mx-auto px-5 py-10 md:py-14">
      {/* Category */}
      <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-red-600">
        {news.category}
      </p>

      {/* Title */}
      <h1 className="text-3xl md:text-5xl font-bold leading-tight text-gray-900">
        {news.title}
      </h1>

      {/* Description */}
      {typeof news.description === "string" && (
        <p className="mt-5 text-lg md:text-xl leading-8 text-gray-600">
          {news.description}
        </p>
      )}

      {/* Author / Date / Word Count */}
      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500">
        {typeof news.author === "string" && <span>{news.author}</span>}

        {news.firstPublished && (
          <span>
            {new Date(news.firstPublished).toLocaleDateString("bn-BD", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        )}

        {news.wordCount && <span>{news.wordCount} শব্দ</span>}
      </div>

      {/* Divider */}
      <div className="my-8 border-b border-gray-200" />

      {/* Main Image */}
      {typeof news.imageUrl === "string" && (
        <figure>
          <Image
            src={news.imageUrl}
            alt={typeof news.imageAlt === "string" ? news.imageAlt : news.title}
            width={1200}
            height={700}
            priority
            className="w-full h-auto object-cover"
          />

          {typeof news.imageAlt === "string" && (
            <figcaption className="mt-2 text-sm leading-6 text-gray-500">
              {news.imageAlt}
            </figcaption>
          )}
        </figure>
      )}

      {/* Divider */}
      <div className="my-8 border-b border-gray-200" />

      {/* Article */}
      <div className="text-lg leading-9 text-gray-800">
        {renderContent(news.text)}
      </div>

      {/* Tags */}
      {Array.isArray(news.tags) && news.tags.length > 0 && (
        <div className="mt-12 border-t border-gray-200 pt-6">
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {news.tags.map((tag: unknown, index: number) => (
              <span key={index} className="text-sm font-medium text-gray-700">
                {typeof tag === "string" ? tag : JSON.stringify(tag)}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};

export default NewsDetails;
