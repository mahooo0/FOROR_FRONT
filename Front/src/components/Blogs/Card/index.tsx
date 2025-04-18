import React from 'react';

type BlogCardProps = {
    image: {
        src: string;
        alt?: string;
    };
    url: string;
    category: string;
    readTime: string;
    title: string;
    description: string;
    button: {
        title: string;
        onClick?: () => void;
    };
};

export const BlogCard: React.FC<BlogCardProps> = ({
    image,
    url,

    title,
    description,
}) => {
    return (
        <div className="flex size-full flex-col items-center justify-start">
            <a href={url} className="mb-6 w-full">
                <img
                    loading="lazy"
                    src={image.src}
                    alt={image.alt || 'blog image'}
                    className="aspect-video size-full object-cover rounded-xl"
                />
            </a>

            <div className="flex w-full flex-col items-start justify-start">
                <a className="mb-2" href={url}>
                    <h2 className="text-xl font-bold md:text-2xl">{title}</h2>
                </a>
                <p>{description}</p>
            </div>
        </div>
    );
};
