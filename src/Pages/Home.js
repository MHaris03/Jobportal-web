import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import Jobs from "./Jobs";
import { BASE_URL } from "../utils/BASE_URL";
import Sidebar from "../sidebard/Sidebar";
import Newsletter from "../components/Newsletter";
import Arrow from "../components/Arrow";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import Browse from "./Browse";

const Home = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setIsloading(true);
    fetch(`${BASE_URL}/all-jobs`)
      .then(res => res.json())
      .then(data => {
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setJobs(data);
        setIsloading(false);
      });
  }, []);
  
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };
  const handleCategories = (Category) => {
    setSelectedCategory(Category);
  };

  //filter  jobs by title Create by Usama
  // const filteredItems = jobs.filter((job) => job?.jobTitle.toLowerCase().indexOf(query.toLocaleLowerCase()) !== -1)
  // const filteredItems = jobs.filter((job) => {
  //   const jobTitleMatch = job?.jobTitle?.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  //   const companyNameMatch = job?.companyName?.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  //   const locationMatch = !selectedLocation || (job?.jobLocation && job.jobLocation.toLowerCase() === selectedLocation.toLowerCase());
  //   const categoryMatch = !selectedCategory || (job?.category && job.category.toLowerCase() === selectedCategory.toLowerCase());
  //   return (jobTitleMatch || companyNameMatch) && locationMatch && categoryMatch;
  // });

  //================Radio Base Button filtering-------------
  const handleChange = (event) => {
    setSelectedCategory(event.target.value)
  }
  // ===================Buttons Side  filtering---------------
  const handleClick = (event) => {
    // console.log(event.target.value);
    setSelectedCategory(event.target.value)
  }
  // calculate inndex Range
  const filteredData = (jobs, selected, query, selectedLocation) => {
    let filteredJobs = jobs;

    // Filter by input query
    if (query) {
      filteredJobs = filteredJobs.filter((job) => {
        const jobTitleMatch = job?.jobTitle?.toLowerCase().includes(query.toLowerCase());
        const companyNameMatch = job?.companyName?.toLowerCase().includes(query.toLowerCase());
        return jobTitleMatch || companyNameMatch;
      });
    }

    // Filter by category or other attributes
    if (selected) {
      filteredJobs = filteredJobs.filter(({ jobLocation, maxPrice, experiencedLevel, salaryType, employmentType, postingDate, category }) =>
        (category && category.toLowerCase() === selected.toLowerCase()) ||
        (jobLocation && jobLocation.toLowerCase() === selected.toLowerCase()) ||
        (maxPrice && parseInt(maxPrice) <= parseInt(selected)) ||
        (postingDate && postingDate >= selected) ||
        (salaryType && salaryType.toLowerCase() === selected.toLowerCase()) ||
        (experiencedLevel && experiencedLevel.toLowerCase() === selected.toLowerCase()) ||
        (employmentType && employmentType.toLowerCase() === selected.toLowerCase())
      );
    }

    // Filter by location
    if (selectedLocation) {
      filteredJobs = filteredJobs.filter(job =>
        job?.jobLocation?.toLowerCase() === selectedLocation.toLowerCase()
      );
    }

    // Return filtered jobs
    return filteredJobs;
  };

  // Pagination logic
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Calculate filtered jobs and apply pagination
  const filteredItems = filteredData(jobs, selectedCategory, query, selectedLocation);
  const { startIndex, endIndex } = calculatePageRange();
  const paginatedJobs = filteredItems.slice(startIndex, endIndex);

  return (
    <div>
      {/* Pass query and handleInputChange as props to the Banner component */}
      <Banner
        query={query}
        handleInputChange={handleInputChange}
        handleLocationChange={handleLocationChange}
        handleCategories={handleCategories}
      />
      {/* Main Content  */}
      <div className="bg-[#FAFAFA] grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-8 lg:px-6 px-4 py-8 lg:py-12">
        {/* Left Side  */}
        <div className="bg-white p-4 rounded md:col-span-1">
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>
        {/* Job Cards   */}
        {/* <div className="bg-white p-4 rounded-sm md:col-span-2">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <img src="/images/loader.gif" alt="Loading..." style={{ height: "100px" }} />
            </div>
          ) : result.length > 0 ? (
            <Jobs result={result} Totaljobs={Totaljobs} />
          ) : (
            <>
              <h3 className="text-lg font-bold mb-2">{result?.length} Jobs filter</h3>
              <p className="flex justify-center font-bold">No Data Found!</p>
            </>
          )}
          {result.length > 0 && (
            <div className="flex justify-end space-x-6 mt-4">
              <button onClick={prevPage} disabled={currentPage === 1} className="cursor-pointer">
                <MdArrowBackIos size={20} />
              </button>
              <span className="mx-2">Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}</span>
              <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)} className="cursor-pointer">
                <MdArrowForwardIos size={20} />
              </button>
            </div>
          )}
        </div> */}
        <div className="bg-white p-4 rounded-sm md:col-span-2">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <img src="/images/loader.gif" alt="Loading..." style={{ height: "100px" }} />
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="grid gap-4">
              <Jobs Totaljobs={filteredItems?.length} />
              {paginatedJobs.map((job, i) => (
                <Card key={i} data={job} />
              ))}
            </div>
          ) : (
            <p className="flex justify-center font-bold">No jobs found!</p>
          )}
          {/* Pagination */}
          {filteredItems.length > itemsPerPage && (
            <div className="flex justify-end space-x-6 mt-4">
              <button onClick={prevPage} disabled={currentPage === 1}>
                <MdArrowBackIos size={20} />
              </button>
              <span>
                Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}
              </span>
              <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)}>
                <MdArrowForwardIos size={20} />
              </button>
            </div>
          )}
        </div>
        {/* Right Side  */}
        <div className="bg-white p-4 rounded md:col-span-1">
          <Newsletter />
        </div>
      </div>
      <Browse />
      <Arrow />
    </div>
  );
};

export default Home;

