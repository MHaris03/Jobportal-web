import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/BASE_URL";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Latestblog from "./Latestblog";

const Blogdetail = () => {
    const { slug } = useParams();
    const [blogData, setBlogData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/blog-detail/${slug}`);
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
    }, [slug]);

    if (loading) return <div className="flex justify-center items-center mt-28">
        <img src="/images/loader.gif" alt="Loading..." style={{ height: "100px" }} />
    </div>;
    if (error) return <div className="text-center text-red-600 py-20 mt-16 min-h-screen">Error: {error}</div>;
    if (!blogData) return <div className="text-center py-20 mt-16 min-h-screen">No blog data found.</div>;

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{blogData?.title}</title>
                    <meta name="description" content={blogData?.description} />
                    <meta property="og:title" content="Blog" />
                    <meta property="og:description" content={blogData?.description} />
                    <meta property="og:image" content="https://www.aidifys.com/Aidifys-hiring.jpg" />
                    <meta property="og:url" content="https://www.aidifys.com/blog" />
                </Helmet>
                <div className="mt-8 sm:mt-12 md:mt-24 lg:mt-24 mb-8">
                    <div className="relative mb-20 sm:mb-28 md:mb-36">
                        <div className="absolute inset-0 bg-[#EDEEF4] pt-8 sm:pt-10 md:pt-12 pb-6 sm:pb-10 md:pb-16"></div>
                        <div className="relative z-10 max-w-[95%] lg:max-w-6xl 2xl:max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-end h-full pb-6 md:pb-12">
                            {/* Blog Title Section */}
                            <div className="mt-28 md:mt-56 pb-4 md:pb-8 w-full md:w-[60%]">
                                <div className="mb-4 flex items-center">
                                    <h2 className="text-base sm:text-lg md:text-xl font-bold uppercase text-gray-600">
                                        BLOG
                                    </h2>
                                </div>
                            </div>
                            {/* Blog Image */}
                            <div className="relative md:absolute right-0 -bottom-20 md:-bottom-28 2xl:-bottom-40 z-50 flex justify-end w-full md:w-auto">
                                <img
                                    src={blogData?.imageUrl}
                                    alt={blogData?.alttag || "Blog Image"}
                                    className="w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[760px] h-auto rounded-lg shadow-lg object-cover"
                                />
                            </div>
                        </div>
                    </div>
                    {/* Blog Content */}
                    <div className="max-w-[95%] lg:max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-0">
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-black uppercase leading-snug sm:leading-tight md:leading-[40px] lg:leading-[50px]">
                            {blogData?.title}
                        </h1>
                        <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none text-justify mt-10">
                            <div dangerouslySetInnerHTML={{ __html: blogData?.content }} />
                        </div>
                    </div>
                </div>
            </HelmetProvider>
            {/* <Latestblog/> */}
        </>
    );
};

export default Blogdetail;
