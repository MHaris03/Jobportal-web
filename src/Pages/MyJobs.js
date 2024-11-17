import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Arrow from "../components/Arrow"
import ReactPaginate from 'react-paginate';
import { GrNext, GrPrevious } from "react-icons/gr";
import { HiDotsHorizontal } from "react-icons/hi";

export const MyJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userEmail, setUserEmail] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    
    const itemsPerPage = 20;

    useEffect(() => {
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
            setUserEmail(userEmail);
        }
    }, []);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setIsLoading(true);

                if (!userEmail) return;

                const response = await fetch(`https://portal-lvi4.onrender.com/myJobs/${userEmail}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch jobs');
                }
                const data = await response.json();
                const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setJobs(sortedData); 
            } catch (error) {
                console.error('Error fetching jobs:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchJobs();
    }, [userEmail]);


    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * itemsPerPage;
    const currentJobs = jobs.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(jobs?.length / itemsPerPage);


    const handleDelete = (id) => {
        // Show confirmation dialog
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this job!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                // If user confirms deletion, send delete request
                fetch(`https://portal-lvi4.onrender.com/job/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.acknowledged === true) {
                            // Show success message
                            Swal.fire(
                                'Deleted!',
                                'Job has been deleted.',
                                'success'
                            );
                            // After successful deletion, update jobs state to remove the deleted job
                            setJobs(prevJobs => prevJobs.filter(job => job?._id !== id));
                        }
                    })
                    .catch(error => {
                        console.error('Error deleting job:', error);
                        // Handle error here
                    });
            }
        });
    }

    // const extractPublicIdFromUrl = (url) => {
    //     // Extract the public_id from the Cloudinary URL
    //     const parts = url.split('/');
    //     const fileName = parts[parts.length - 1].split('.')[0]; // "logo512_zo4kdn"
    //     const folder = parts[parts.length - 2]; // "image"
    //     return `${folder}/${fileName}`;
    // };

    // const handleDelete = async (jobId, imageUrl) => {
    //     // Extract the public_id from the image URL
    //     const publicId = extractPublicIdFromUrl(imageUrl);

    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: 'This action will delete the job and its associated image!',
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes',
    //         cancelButtonText: 'No'
    //     }).then(async (result) => {
    //         if (result.isConfirmed) {
    //             try {
    //                 // 1. Delete the job from the server
    //                 const jobResponse = await fetch(`https://portal-lvi4.onrender.com/job/${jobId}`, {
    //                     method: 'DELETE',
    //                 });

    //                 const jobData = await jobResponse.json();

    //                 if (jobData.acknowledged === true) {
    //                     Swal.fire('Deleted!', 'Job has been deleted.', 'success');

    //                     // 2. Delete the image from Cloudinary if job deletion was successful
    //                     const imageResponse = await fetch(`https://api.cloudinary.com/v1_1/di8dn3esb/image/destroy`, {
    //                         method: 'POST',
    //                         headers: { 'Content-Type': 'application/json' },
    //                         body: JSON.stringify({ public_id: publicId }),
    //                     });

    //                     const imageData = await imageResponse.json();
    //                     if (imageData.result === 'ok') {
    //                         Swal.fire('Deleted!', 'Job image has been deleted from Cloudinary.', 'success');
    //                     } else {
    //                         Swal.fire('Error', 'Failed to delete the image from Cloudinary.', 'error');
    //                     }

    //                     // 3. Update the job state to remove the deleted job from UI
    //                     setJobs((prevJobs) => prevJobs.filter((job) => job?._id !== jobId));
    //                 } else {
    //                     Swal.fire('Error', 'Failed to delete the job.', 'error');
    //                 }
    //             } catch (error) {
    //                 console.error('Error deleting job or image:', error);
    //                 Swal.fire('Error', 'An error occurred while deleting.', 'error');
    //             }
    //         }
    //     });
    // };

    return (
        <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 ">
            <div className='my-jobs-container'>
                <h1 className='text-sky-500 font-sans text-2xl text-bold text-center   mb-10'> All Jobs </h1>
                <hr className="border-gray-300 my-4" />
            </div>
            <section className="py-1 bg-blueGray-50">
                <div className="w-full mb-12 xl:mb-0 px-4 mx-auto mt-5">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-blueGray-700">All Jobs : {jobs?.length}</h3>
                                </div>
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                    <Link to="/post-job">
                                        <button className="bg-sky-500 text-white  active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">Post A New Job</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="block w-full overflow-x-auto">
                            <table className="items-center bg-transparent w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            No
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Title
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Company Name
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Salary
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Edit
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Delete
                                        </th>
                                    </tr>
                                </thead>
                                {isLoading ? (
                                    <tbody>
                                        <tr>
                                            <td colSpan="6" className="text-center py-4">
                                                <img src="/images/loader.gif" alt="Loading..." style={{ height: "150px", margin: "auto", display: "block" }} />
                                            </td>
                                        </tr>
                                    </tbody>
                                ) : (
                                    <tbody>
                                        {currentJobs?.length === 0 ? (
                                            <tr>
                                                <td colSpan="6" className="text-center p-3 font-semibold">No data found</td>
                                            </tr>
                                        ) : (
                                            currentJobs.map((job, index) => (
                                                <tr key={index}>
                                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                                                        {index + 1}
                                                    </th>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                        {job?.jobTitle}
                                                    </td>
                                                    <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                        {job?.companyName}
                                                    </td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                        <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                                                        £ {job?.minPrice} - £ {job?.maxPrice}
                                                    </td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                        <Link to={`/edit-job/${job?._id}`}>
                                                            <button className='bg-sky-500 py-2 px-6 text-white rounded-sm'>Edit</button>
                                                        </Link>
                                                    </td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                        <button onClick={() => handleDelete(job?._id, job?.image)} className='bg-red-700 py-2 px-6 text-white rounded-sm'>Delete</button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>

                                )}
                            </table>
                        </div>
                    </div>
                </div>
                {/* Pagination */}
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
            </section>
            <Arrow />
        </div>
    );

};
