import React from "react";
import { Link } from "react-router-dom";
import { FiCalendar, FiClock, FiDollarSign, FiMapPin } from "react-icons/fi"
import { motion } from "framer-motion";

const Card = ({ data }) => {
  const {
    _id,
    companyName,
    image,
    minPrice,
    maxPrice,
    jobLocation,
    employementType,
    jobPosting,
    description,
    jobTitle
  } = data;

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="flex flex-col w-full cursor-pointer"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
    >
      <section className='card'>
        <Link to={`/jobdetails/${_id}`} className='flex flex-col sm:flex-row items-start gap-4 p-1 sm:p-2 lg:p-3'>
          <div className='w-full h-full sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 flex-shrink-0'>
            <img src={image} alt={companyName} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-between w-full">
            <div>
              <h4 className='text-primary mb-1 text-base sm:text-lg lg:text-xl'>{companyName}</h4>
              <h3 className='text-lg sm:text-xl lg:text-2xl font-semibold mb-2'>{jobTitle}</h3>
              <div className='text-primary/70 text-sm sm:text-base flex flex-wrap gap-2 mb-2'>
                <span className='flex items-center gap-1'><FiMapPin /> {jobLocation}</span>
                <span className='flex items-center gap-1'><FiClock /> {employementType}</span>
                <span className='flex items-center gap-1'><FiDollarSign /> {minPrice}-{maxPrice}</span>
                <span className='flex items-center gap-1'><FiCalendar /> {jobPosting}</span>
              </div>
              <p className='text-sm sm:text-base text-primary/70'>{description?.slice(0, 150)}</p>
            </div>
          </div>
        </Link>
      </section>
    </motion.div>
  );
};

export default Card;
