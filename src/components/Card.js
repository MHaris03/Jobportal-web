import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiCalendar, FiClock, FiMapPin } from "react-icons/fi";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

const Card = ({ data }) => {
  const {
    _id,
    companyName,
    image,
    minPrice,
    maxPrice,
    jobLocation,
    employmentType,
    jobPosting,
    description,
    jobTitle,
  } = data;

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    try {
      const likedJobs = localStorage.getItem("likedJobs");
      const parsedLikedJobs = likedJobs ? JSON.parse(likedJobs) : [];

      if (Array.isArray(parsedLikedJobs)) {
        setIsLiked(parsedLikedJobs.includes(_id));
      } else {
        setIsLiked(false);
        localStorage.setItem("likedJobs", JSON.stringify([]));
      }
    } catch (error) {
      console.error("Error parsing likedJobs from localStorage:", error);
      setIsLiked(false);
      localStorage.setItem("likedJobs", JSON.stringify([]));
    }
  }, [_id, isLiked]);

  const handleLike = async () => {
    const token = localStorage.getItem("userToken");
    const userId = localStorage.getItem("UserId");

    if (!userId || !token) {
      toast.error("Please log in to like this job.");
      return;
    }

    try {
      const response = await fetch("https://portal-lvi4.onrender.com/job/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          jobId: _id,
          userId: userId,
          action: isLiked ? "unlike" : "like",
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsLiked(!isLiked);

        let likedJobs = JSON.parse(localStorage.getItem("likedJobs")) || [];
        if (isLiked) {
          likedJobs = likedJobs.filter((id) => id !== _id);
          toast.success("Job unliked ! Successfully");
        } else {
          likedJobs.push(_id);
          toast.success("Job liked ! Successfully");
        }
        localStorage.setItem("likedJobs", JSON.stringify(likedJobs));
      } else {
        console.error("Error:", data.message || "Failed to like/unlike the job.");
      }
    } catch (error) {
      console.error("Error liking/unliking job:", error);
    }
  };


  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="flex flex-col w-full cursor-pointer"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
    >
      <section className="card">
        <div className="text-gray-500 cursor-pointer mr-auto flex-1 flex justify-end" onClick={handleLike}>
          {isLiked ? (
            <FaHeart className="text-xl sm:text-2xl" />
          ) : (
            <FaRegHeart className="text-xl sm:text-2xl" />
          )}
        </div>
        <div className="flex flex-row items-start gap-4 p-2">
          {/* Job Details */}
          <Link
            to={`/jobdetails/${_id}`}
            className="flex flex-row sm:flex-row items-start gap-4 w-full"
          >
            <div className="w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 flex-shrink-0">
              <img
                src={image}
                alt={companyName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-between w-full">
              <div>
                <h4 className="text-primary mb-1 text-base sm:text-sm lg:text-xl">
                  {companyName}
                </h4>
                <h3 className="sm:text-sm lg:text-xl font-semibold">
                  {jobTitle}
                </h3>
                <div className="text-primary/70 text-sm sm:text-base flex flex-wrap sm:flex-row flex-row gap-1 font-bold">
                  <span className="flex items-center gap-1">
                    <FiMapPin /> {jobLocation}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiClock /> {employmentType}
                  </span>
                  <span className="flex items-center gap-1">
                    £ {minPrice}-{maxPrice}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiCalendar /> {jobPosting}
                  </span>
                </div>
                <p className="text-sm sm:text-base text-primary/70 hidden sm:block">
                  {description?.slice(0, 120)}
                </p>
              </div>
            </div>
          </Link>
        </div>
        <Toaster />
      </section>
    </motion.div>
  );
};

export default Card;
