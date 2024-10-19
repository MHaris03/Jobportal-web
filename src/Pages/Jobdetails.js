import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Arrow from '../components/Arrow';
import Apply from './Apply';

const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isApplyOpen, setIsApplyOpen] = useState(false);
    const [companyEmail, setCompanyEmail] = useState('')

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await fetch(`https://portal-lvi4.onrender.com/jobdetails/${id}`);
                if (response.ok) {
                    const jobData = await response.json();
                    setJob(jobData);
                } else {
                    console.error('Error fetching job details:', response.status);
                }
            } catch (error) {
                console.error('Error fetching job details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [id]);

    const handleApply = (companyInfo) => {
        console.log("🚀 ~ handleApply ~ companyInfo:", companyInfo)
        const UserName = localStorage.getItem('userName');

        if (!UserName) {
            Swal.fire({
                icon: 'error',
                title: 'Please log in first',
                showConfirmButton: true,
            });
        } else {
            setIsApplyOpen(true);
            setCompanyEmail(companyInfo);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center mt-28">
                <img src="/images/loader.gif" alt="Loading..." style={{ height: "100px" }} />
            </div>
        );
    }

    const relativeTime = moment(job?.jobPosting).fromNow();
    return (
        <div className="container mx-auto py-8 flex flex-col md:flex-row justify-between items-start w-[80vw] min-h-[80vh] mt-28">
            <div className="w-full md:w-3/4 mb-8 md:mb-0 md:pr-8 flex flex-col">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{job?.jobTitle}</h1>
                <div className="flex items-center mb-4">
                    <p className="text-gray-700 mr-4"><b>Posted Date </b> {relativeTime}</p>
                </div>
                <h2 className='text-2xl md:text-3xl font-bold'>Job Details</h2>
                <hr className="border-gray-300 my-4" />
                <p className="text-gray-700 mb-4 mt-4" dangerouslySetInnerHTML={{ __html: job?.description.replace(/\n/g, '<br />') }} />
                <button className="py-2 px-5 border rounded bg-sky-500 text-white hover:bg-white hover:text-gray-900 self-end" onClick={() => handleApply(job)}>
                    Apply
                </button>
            </div>
            <div className="w-full md:w-1/3 bg-gray-100 p-4 rounded-lg">
                <div className="text-center mt-5">
                    <h2 className="text-xl md:text-2xl font-bold mb-4">Company Information</h2>
                </div>
                <div className='flex justify-center'>
                    <img src={job?.image} alt={job?.companyName} className='w-44 h-44' />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 mt-3 ">
                    <Link to={`/company-jobs/${job?.companyId}`}>{job?.companyName}</Link>
                </h3>
                <div className="flex flex-wrap items-center mb-2">
                    <p className="text-gray-700 mr-4 mb-2 md:mb-0 md:mr-0 md:pr-4">
                        <b>Location:</b>
                        <Link to={`/location-jobs/${job?.jobLocation}`}>  {job?.jobLocation}</Link>
                    </p><br />
                </div>
                <div className="flex items-center mb-2">
                    <p className="text-gray-700 mr-4"><b>Employment Type:</b> {job?.employmentType}</p>
                </div>
                <div className="flex items-center mb-2">
                    <p className="text-gray-700 mr-4"><b>Experience Level:</b> {job?.experienceLevel}</p>
                </div>
                <div className="flex items-center">
                    <p className="text-gray-700 mr-4"><b>Salary Range:</b> {job?.minPrice} - {job?.maxPrice} {job?.salaryType}</p>
                </div>
                <div className="flex items-center">
                    <p className="text-gray-700 mr-4"><b>Company Email:</b> {job?.postedBy}</p>
                </div>
            </div>
            <Arrow />
            {isApplyOpen && <Apply setIsApplyOpen={setIsApplyOpen} companyInfo={companyEmail} />}

        </div>
    );
};

export default JobDetails;
