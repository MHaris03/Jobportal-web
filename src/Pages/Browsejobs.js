import React, { useState, useEffect } from 'react';
import LocationBrowse from './LocattionBrowse';
import { Link } from 'react-router-dom';
import Arrow from "../components/Arrow"

const BrowseJobs = () => {
  const [jobsData, setJobsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3003/all-jobs")
      .then(response => response?.json())
      .then(data => {
        setJobsData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const getJobCount = (category) => {
    const categoryJobs = jobsData?.filter(job => job?.category?.toLowerCase() === category?.toLowerCase());
    return categoryJobs?.length;
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center mt-28">
        <img src="/images/loader.gif" alt="Loading..." style={{ height: "100px" }} />
      </div>
    );
  }
  return (
    <>
      <div className='flex flex-col px-10'>
        <h2 className='mb-10 text-2xl container text-bold text-sky-500 font-sans'>
          Browse by Categories
        </h2>
        <hr className='p-5' />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-center justify-center mb-10 px-10">
        <div className=" bg-gray-100 p-4 rounded-lg">
          {[
            { name: 'Hospitality Jobs', category: 'Hospitality' },
            { name: 'Engineering Jobs', category: 'Engineering' },
            { name: 'Oil & Gas', category: 'OilGas' },
            { name: 'Administration', category: 'Administration' },
            { name: 'IT & Software', category: 'ITSoftware' },
            { name: 'Technology', category: 'Technology' },
            { name: 'Government', category: 'Government' },
            { name: 'Accounting / Finance', category: 'AccountingFinance' }
          ].map(({ name, category }) => (
            <Link to={`/categories/${category}`}>
              <div key={category} className="bg-white py-3 px-3 rounded-lg mt-3 flex justify-between">
                <h3 className="text-sm font-bold cursor-pointer hover:text-[#98d8f4]">
                  {name}
                </h3>

                <p className="bg-[#e7f8fd] text-gray-900 px-2 cursor-pointer">
                  {jobsData.length ? getJobCount(category) : 0}
                </p>

              </div>
            </Link>
          ))}
        </div>
        <div className=" bg-gray-100 p-4 rounded-lg">
          {[
            { name: ' Construction / Facilities', category: 'ConstructionFacilities' },
            { name: 'Telecom', category: 'Telecom' },
            { name: 'Design & Multimedia', category: 'DesignMultimedia' },
            { name: 'Human Resource', category: 'HumanResource' },
            { name: 'Consumer', category: 'Consumer' },
            { name: 'Manufacturing', category: 'Manufacturing' },
            { name: 'Retail', category: 'Retail' },
            { name: ' Distribution/Logistics', category: 'DistributionLogistics' }
          ].map(({ name, category }) => (
            <Link to={`/categories/${category}`}>
              <div key={category} className="bg-white py-3 px-3 rounded-lg mt-3 flex justify-between">
                <h3 className="text-sm font-bold cursor-pointer hover:text-[#98d8f4]">
                  {name}
                </h3>

                <p className="bg-[#e7f8fd] text-gray-900 px-2 cursor-pointer">
                  {jobsData.length ? getJobCount(category) : 0}
                </p>

              </div>
            </Link>
          ))}
        </div>
        <div className=" bg-gray-100 p-4 rounded-lg">
          {[
            { name: 'Supply Chain Operations', category: 'SupplyChainOperations' },
            { name: 'Healthcare & Medical', category: 'HealthcareMedical' },
            { name: 'Procurement / Sourcing', category: 'ProcurementSourcing' },
            { name: 'Information Technology (IT)', category: 'InformationTechnology' },
            { name: 'Sales/Business Development', category: 'SalesBusinessDevelopment' },
            { name: 'Legal & Professional Services', category: 'LegalProfessionalServices' },
            { name: 'Life Sciences & Healthcare', category: 'LifeSciencesHealthcare' },
            { name: 'Web Developer', category: 'WebDeveloper' }
          ].map(({ name, category }) => (
            <Link to={`/categories/${category}`}>
              <div key={category} className="bg-white py-3 px-3 rounded-lg mt-3 flex justify-between">
                <h3 className="text-sm font-bold cursor-pointer hover:text-[#98d8f4]">
                  {name}
                </h3>

                <p className="bg-[#e7f8fd] text-gray-900 px-2 cursor-pointer">
                  {jobsData.length ? getJobCount(category) : 0}
                </p>

              </div>
            </Link>
          ))}
        </div>
      </div>
      <LocationBrowse />
      <Arrow/>
    </>
  );
};

export default BrowseJobs;


