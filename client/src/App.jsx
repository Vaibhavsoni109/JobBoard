
import { Outlet, Navigate, Route, Routes, useLocation } from "react-router-dom";

import { Footer, Navbar } from "./components";

import { useSelector } from "react-redux";
import About from "./pages/About";
import FindJobs from "./pages/FindJobs";
import CompanyProfile from "./pages/CompanyProfile";
import Companies from "./pages/Companies";
import Auth from "./pages/Auth";
import UserProfile from "./pages/UserProfile";
import JobDetail from "./pages/JobDetail";
import UploadJob from "./pages/UploadJob";
import Applications from "./pages/Applications";

function Layout() {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate to='/user-auth' state={{ from: location }} replace />
  );
}

function App() {
  const { user } = useSelector((state) => state.user);
  return (
    <main className='bg-[#f7fdfd]'>
      <Navbar />

      <Routes>
        <Route element={<Layout />}>
          <Route
            path='/'
            element={<Navigate to='/find-jobs' replace={true} />}
          />
          <Route path='/find-jobs' element={<FindJobs/>} />
          <Route path='/companies' element={<Companies />} />
          <Route
            path={
              user?.accountType === "seeker"
                ? "/user-profile"
                : "/user-profile/:id"
            }
            element={<UserProfile />}
          />

          <Route path={"/company-profile"} element={<CompanyProfile />} />
          <Route path={"/company-profile/:id"} element={<CompanyProfile />} />
          <Route path={"/upload-job"} element={<UploadJob />} />
          <Route path={"/job-detail/:id"} element={<JobDetail />} />
        </Route>

        <Route path='/about-us' element={<About/>} />
        <Route path='/user-auth' element={<Auth/>} />
        <Route path='/applications' element={<Applications/>} />
      </Routes>
      {user && <Footer />}
    </main>
  );
}

export default App;
