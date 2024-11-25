import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiCalendar, FiClock, FiMapPin } from "react-icons/fi"
import { BASE_URL } from '../utils/BASE_URL';
import Arrow from "../components/Arrow"
import { motion } from "framer-motion";
import ReactPaginate from 'react-paginate';
import { GrNext, GrPrevious } from "react-icons/gr";
import { HiDotsHorizontal } from "react-icons/hi";
import toast, { Toaster } from 'react-hot-toast';

const Companyjobs = () => {
  const { companyId } = useParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 10;

  useEffect(() => {
    const CompanyDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/company-jobs/${companyId}`);

        if (response.ok) {
          const jobData = await response.json();
          setJobs(jobData);
        } else {
          toast.error('Error fetching job details:', response.status);
        }
      } catch (error) {
        toast.error('Error fetching job details:', error);
      } finally {
        setLoading(false);
      }
    };

    CompanyDetails();
  }, [companyId]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const job1 = jobs.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(jobs?.length / itemsPerPage);

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
      <div className="flex justify-center mt-28 min-h-[80vh]">
        <div className="w-[80%]">
          <div>
            <h3 className="text-lg font-bold mb-2 ml-6">
              {jobs?.length > 0
                ? `${jobs?.length} Jobs in ${companyId}`
                : `No jobs found for ${companyId}`}
            </h3>
          </div>

          {jobs?.length > 0 ? (
            jobs.map(job => (
              <section key={job._id} className='card border border-gray-300 rounded mb-4 hover:shadow-lg p-3'>
                <Link to={`/jobdetails/${job?._id}`} className='flex flex-row sm:flex-row items-start gap-4 p-1 sm:p-2 lg:p-3'>
                  <div className='w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 flex-shrink-0'>
                    <img src={job?.image} alt={job?.companyName} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-between w-full">
                    <div>
                      <h4 className='text-primary mb-1 text-base sm:text-sm lg:text-xl'>{job?.companyName}</h4>
                      <h3 className='sm:text-sm lg:text-xl font-semibold'>{job?.jobTitle}</h3>
                      <h6 className='sm:text-sm lg:text-xl font-semibold'>{job?.skills && job?.skills.join(', ')}</h6>
                      <div className='text-primary/70 text-sm sm:text-base flex flex-wrap sm:flex-row flex-row gap-1 font-bold'>
                        <span className='flex items-center gap-1'><FiMapPin /> {job?.jobLocation}</span>
                        <span className='flex items-center gap-1'><FiClock /> {job?.employmentType}</span>
                        <span className='flex items-center gap-1'>£ {job?.minPrice}-{job?.maxPrice} {job?.salaryType}</span>
                        <span className='flex items-center gap-1'><FiCalendar /> {job?.jobPosting}</span>
                      </div>
                      <p className='text-sm sm:text-base text-primary/70 hidden sm:block'>{job?.description?.slice(0, 100)}</p>
                    </div>
                  </div>
                </Link>
              </section>
            ))
          ) : (
            <div className="text-center text-xl font-semibold mt-8">
              <p>No jobs found for this company.</p>
            </div>
          )}
          {jobs && jobs.length > 0 ? (
            <div className='flex justify-end'>
              <ReactPaginate
                previousLabel={<GrPrevious size={20} />}
                nextLabel={<GrNext size={20} />}
                breakLabel={<HiDotsHorizontal size={20} />}
                breakClassName={"pagination__break"}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                pageClassName={"pagination__page"}
                pageLinkClassName={"pagination__link"}
                previousClassName={"pagination__previous"}
                nextClassName={"pagination__next"}
                activeLinkClassName={"pagination__link--active"}
                disabledClassName={"pagination__link--disabled"}
                breakLinkClassName={"pagination__break"}
              />
            </div>
          ) : (null)}
        </div>
        <Arrow />
        <Toaster />
      </div>
    </motion.div>
  );
};

export default Companyjobs;
