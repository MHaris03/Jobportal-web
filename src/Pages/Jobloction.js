import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiCalendar, FiClock, FiMapPin } from "react-icons/fi";
import { LiaPoundSignSolid } from "react-icons/lia";
import Arrow from '../components/Arrow';
import { motion } from "framer-motion";

const Jobloction = () => {
    const { jobLocation } = useParams();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const CompanyDetails = async () => {
            try {
                const response = await fetch(`https://portal-lvi4.onrender.com/location-jobs/${jobLocation}`);

                if (response.ok) {
                    const jobData = await response.json();
                    console.log(jobData);
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
    }, [jobLocation]);

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

    const JobCard = ({ job }) => {
        const Description = job?.description?.slice(0, 120);

        return (
            <section key={job._id} className='card border border-gray-300 rounded mb-4 hover:shadow-lg p-3'>
                <Link to={`/jobdetails/${job._id}`} className='flex flex-row sm:flex-row items-start gap-4 p-1 sm:p-2 lg:p-3'>
                    <div className='w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 flex-shrink-0'>
                        <img src={job?.image} alt={job?.companyName} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h4 className='text-primary mb-1 text-base sm:text-sm lg:text-xl'>{job?.companyName}</h4>
                        <h3 className='sm:text-sm lg:text-xl font-semibold'>{job?.jobTitle}</h3>
                        <h6 className='sm:text-sm lg:text-xl font-semibold'>
                            {job?.skills && job?.skills.join(', ')}
                        </h6>
                        <div className='text-primary/70 text-sm sm:text-base flex flex-wrap sm:flex-row flex-row gap-1 font-bold'>
                            <span className='flex items-center gap-1'><FiMapPin /> {job?.jobLocation}</span>
                            <span className='flex items-center gap-1'><FiClock /> {job?.employmentType}</span>
                            <span className='flex items-center gap-1'>£ {job?.minPrice}-{job?.maxPrice} {job?.salaryType}</span>
                            <span className='flex items-center gap-1'><FiCalendar /> {job?.jobPosting}</span>
                        </div>
                        <p className='text-sm sm:text-base text-primary/70 hidden sm:block'>
                            {Description}
                        </p>
                    </div>
                </Link>
            </section>
        );
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
                <div className="w-[80vw] min-h-[80vh]">
                    <div>
                        <h3 className="text-lg font-bold mb-2 ml-6">{jobs?.length} Jobs in {jobLocation} </h3>
                    </div>
                    {jobs?.map(job => (
                        <JobCard key={job?._id} job={job} />
                    ))}
                </div>
                <Arrow />
            </div>
        </motion.div>
    );
};

export default Jobloction;
