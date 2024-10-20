import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiCalendar, FiClock, FiDollarSign, FiMapPin } from "react-icons/fi"
import Arrow from "../components/Arrow"
import { motion } from "framer-motion";

const Companyjobs = () => {
  const { companyId } = useParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const CompanyDetails = async () => {
      try {
        const response = await fetch(`https://portal-lvi4.onrender.com/company-jobs/${companyId}`);

        if (response.ok) {
          const jobData = await response.json();
          console.log(jobData)
          setJobs(jobData);
        } else {
          console.error('Error fetching job details:', response.status);
        }
      } catch (error) {
        console.error('Error fetching job details:', error);
      } finally {
        setLoading(false);
      }
    };

    CompanyDetails();
  }, [companyId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-28">
        <img src="/images/loader.gif" alt="Loading..." style={{ height: "100px" }} />
      </div>
    );
  }
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
      <div className="flex justify-center mt-28">
        <div className="w-[80%]">
          <div>
            <h3 className="text-lg font-bold mb-2 ml-6">{jobs?.length} Jobs in {companyId} </h3>
          </div>
          {jobs?.map(job => (
            <section key={job._id} className='card border border-gray-300 rounded mb-4 hover:shadow-lg p-3'>
              <Link to={`/jobdetails/${job._id}`} className='flex gap-4 flex-col sm:flex-row item-start'>
                <div className='w-full h-full lg:w-44 lg:h-44 md:h-28 md:w-28'>
                  <img src={job?.image} alt={job?.companyName} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className='text-primary mb-1'>{job?.companyName}</h4>
                  <h3 className='text-lg font-semibold mb-2'>{job?.jobTitle}</h3>
                  <h6 className='text-lg font-semibold mb-2'>{job?.skills && job?.skills.join(', ')}</h6>
                  <div className='text-primary/70 text-base flex flex-wrap gap-2 mb-2'>
                    <span className='flex items-center gap-1'><FiMapPin /> {job?.jobLocation}</span>
                    <span className='flex items-center gap-1'><FiClock /> {job?.employementType}</span>
                    <span className='flex items-center gap-1'><FiDollarSign /> {job?.minPrice}-{job?.maxPrice} {job?.salaryType}</span>
                    <span className='flex items-center gap-1'><FiCalendar /> {job?.jobPosting}</span>
                  </div>
                  <p className='text-base text-primary/70 max-h-24 '>{job?.description?.slice(0, 100)}</p>
                </div>
              </Link>
            </section>
          ))}
        </div>
        <Arrow />
      </div>
    </motion.div>
  );
};

export default Companyjobs;
