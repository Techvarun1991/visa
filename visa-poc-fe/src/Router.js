import { useRoutes } from "react-router-dom";
import SignInCard from "./Components/Auth/SignInCard";
import AddProfile from "./Components/Profile/AddProfile";
import PatientProfile from "./Components/Profile/PatientProfile";
import CreateLifeStyle from "./Components/Lifestyle/CreateLifeStyle";
import BasicLayout from "./Components/Layout/BasicLayout";
import LandingPage from "./Components/Pages/LandingPage";
import SignUp from "./Components/Auth/SignUp";
import ViewPatientProfile from "./Components/Profile/ViewPatientProfile";
import CreateMedicalHistory from "./Components/Lifestyle/CreateMedicalHistory";
import LifestyleTab from "./Components/Lifestyle/LifestyleTab";
import ViewLifeStyle from "./Components/Lifestyle/ViewLifeStyle";

export default function Router() {

    const routes = useRoutes([
        {
            path: '/',
            element: <SignInCard />,
        },
        {
            path: '/signup',
            element: <SignUp />,
        },
        {
            path: '/layout',
            element: <BasicLayout />,
            children: [
                {
                    path: 'landingpage',
                    element: <LandingPage />,
                },
                {
                    path: 'add-profile',
                    element: <AddProfile />,
                },
                {
                    path: 'patient-profiles',
                    element: <PatientProfile />,
                },
                {
                    path: 'patient-profile/view/:patientId',
                    element: <ViewPatientProfile />,
                },
                {
                    path: 'lifestyle',
                    element: <LifestyleTab />,
                },
                {
                    path: 'lifestyle/view',
                    element: <ViewLifeStyle />,
                },
                {
                    path: 'medical-history',
                    element: <CreateMedicalHistory />,
                },
            ]
        }

    ]);

    return routes;
}