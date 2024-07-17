import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import CreateJob from "../Pages/CreateJob";
import { MyJobs } from "../Pages/MyJobs";
import Updatejob from "../Pages/Updatejob";
import Contact from "../Pages/Contact";
import CvBuilder from "../Pages/CvBuilder";
import TermsConditions from "../Pages/TermsConditions";
import Privacy from "../Pages/Privacy";
import Browsejobs from "../Pages/Browsejobs";
import JobDetails from "../Pages/Jobdetails";
import Companyjobs from "../Pages/Companyjobs";
import Jobloction from "../Pages/Jobloction";
import Companydetails from "../Pages/Companydetails";
import Categories from "../Pages/Categories";
import UserProfile from "../Pages/Userprofile";
import PrivateRouter from "./PrivateRouter"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "post-job",
        element: <PrivateRouter />,
        children: [
          { path: "", element: <CreateJob /> }
        ]
      },
      {
        path: "my-job",
        element: <PrivateRouter />,
        children: [
          { path: "", element: <MyJobs /> }
        ]
      },
      {
        path: "edit-job/:id",
        element: <Updatejob />,
        loader: ({ params }) => fetch(`http://localhost:3001/all-jobs/${params.id}`)
      },
      {
        path: "companyinfo",
        element: <Companydetails />
      },
      {
        path: "contact",
        element: <Contact />
      },

      {
        path: "cvbuilder",
        element: <CvBuilder />
      },

      {
        path: "termsconditions",
        element: <TermsConditions />
      },

      {
        path: "privacy",
        element: <Privacy />
      },
      {
        path: "browsejobs",
        element: <Browsejobs />
      },
      {
        path: "userprofile",
        element: <UserProfile />
      },
      {
        path: "jobdetails/:id",
        element: <JobDetails />,
        loader: ({ params }) => fetch(`http://localhost:3001/jobdetails/${params.id}`)
      },
      {
        path: "company-jobs/:companyId",
        element: <Companyjobs />,
        loader: ({ params }) => fetch(`http://localhost:3001/company-jobs/${params.companyId}`)
      },
      {
        path: "location-jobs/:jobLocation",
        element: <Jobloction />,
        loader: ({ params }) => fetch(`http://localhost:3001/location-jobs/${params.jobLocation}`)
      },
      {
        path: "categories/:category",
        element: <Categories />,
        loader: ({ params }) => fetch(`http://localhost:3001/categories/${params.category}`)
      }




    ]

  },
]);

export default router;