import React, { useState, useEffect } from 'react';
import LocationBrowse from './LocattionBrowse';
import { BASE_URL } from '../utils/BASE_URL';
import { Link } from 'react-router-dom';
import Arrow from "../components/Arrow"

const BrowseJobs = () => {
  const [jobsData, setJobsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/all-jobs`)
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
      <div className='flex flex-col px-10 mt-28'>
        <h2 className='mb-10 text-2xl container text-bold text-sky-500 font-sans'>
          Browse by Categories
        </h2>
        <hr className='p-5' />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-center justify-center mb-10 px-10">
        <div className=" bg-gray-100 p-4 rounded-lg">
          {[
            { name: 'Hospitality Jobs', category: 'Hospitality' },
            { name: 'Healthcare and Nursing', category: 'Healthcare-Nursing' },
            { name: 'Sales and Marketing', category: 'Sales-Marketing' },
            { name: 'Engineering Jobs', category: 'Engineering' },
            { name: 'Oil & Gas', category: 'OilGas' },
            { name: 'Creative and Design', category: 'Creative-Design' },
            { name: 'Administration', category: 'Administration' },
            { name: 'IT & Software', category: 'ITSoftware' },
            { name: 'Technology', category: 'Technology' },
            { name: 'Government', category: 'Government' },
            { name: 'Public Sector', category: 'Public-Sector' },
            { name: 'Accounting / Finance', category: 'AccountingFinance' },
            { name: 'Telecommunications', category: 'Telecommunications' }
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
            { name: 'Engineering and Technical', category: 'Engineering-Technical' },
            { name: 'Hospitality and Catering', category: 'Hospitality-Catering' },
            { name: 'Telecom', category: 'Telecom' },
            { name: 'Design & Multimedia', category: 'DesignMultimedia' },
            { name: 'Human Resource', category: 'HumanResource' },
            { name: 'Social Care', category: 'Social-Care' },
            { name: 'Consumer', category: 'Consumer' },
            { name: 'Manufacturing', category: 'Manufacturing' },
            { name: 'Retail', category: 'Retail' },
            { name: 'Media and Communications', category: 'Media-Communications' },
            { name: ' Distribution/Logistics', category: 'DistributionLogistics' },
            { name: ' Transport and Logistics', category: 'Transport-Logistics' }
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
            { name: 'Construction and Trades', category: 'Construction-Trades' },
            { name: 'Education and Teaching', category: 'Education-Teaching' },
            { name: 'Science and Research', category: 'Science-Research' },
            { name: 'Property Management', category: 'Property-Management' },
            { name: 'Procurement / Sourcing', category: 'ProcurementSourcing' },
            { name: 'Information Technology (IT)', category: 'InformationTechnology' },
            { name: 'Sales/Business Development', category: 'SalesBusinessDevelopment' },
            { name: 'Legal & Professional Services', category: 'LegalProfessionalServices' },
            { name: 'Legal and Compliance', category: 'Legal-Compliance' },
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
      <Arrow />
    </>
  );
};

export default BrowseJobs;


