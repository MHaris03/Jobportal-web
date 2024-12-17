import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/BASE_URL";

const Blogdetail = () => {
    const { id } = useParams();
    const [blogData, setBlogData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/blog-detail/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch blog data");
                }
                const data = await response.json();
                setBlogData(data?.blog);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogData();
    }, [id]);

    if (loading) return <div className="flex justify-center items-center mt-28">
        <img src="/images/loader.gif" alt="Loading..." style={{ height: "100px" }} />
    </div>;
    if (error) return <div className="text-center text-red-600 py-20 mt-16 min-h-screen">Error: {error}</div>;
    if (!blogData) return <div className="text-center py-20 mt-16 min-h-screen">No blog data found.</div>;

    return (
        <div className="mt-16 md:mt-24 mb-10">
            <div className="relative mb-32 md:mb-48">
                <div className="absolute inset-0 bg-[#EDEEF4] pt-12 pb-8 md:pb-16"></div>
                <div className="relative z-10 max-w-[95%] lg:max-w-6xl 2xl:max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-end h-full pb-8 md:pb-12">
                    <div className="mt-12 md:mt-20 pb-6 md:pb-10 w-full md:w-[60%]">
                        <div className="mb-4 flex items-center">
                            <h2 className="text-lg md:text-xl font-bold uppercase text-gray-600">BLOG</h2>
                        </div>
                        <h1 className="text-2xl w-[600px] md:text-4xl lg:text-5xl font-extrabold text-black uppercase leading-tight md:leading-[60px] lg:leading-[70px]">
                            {blogData?.title}
                        </h1>
                    </div>
                    <div className="md:absolute right-0 -bottom-28 2xl:-bottom-40 z-50 -mb-36 md:-mb-0">
                        <img
                            src={blogData?.imageUrl}
                            alt="blog"
                            className="ml-auto 2xl:w-[760px] w-[600px] h-[400px] 2xl:h-[450px] shadow-lg"
                            width={760}
                            height={450} />
                    </div>
                </div>
            </div>
            <div className="max-w-[95%] lg:max-w-6xl 2xl:max-w-7xl mx-auto px-4 md:px-8 lg:px-0">
                <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none text-justify">
                    <div dangerouslySetInnerHTML={{ __html: blogData?.content }} />
                </div>
            </div>
        </div>
    );
};

export default Blogdetail;
