import express from "express";
import { Routes } from "../types/interfaces/app.inter";
import AuthRoute from "./auth.route";
import ProfileRoute from "./profile.route";
import PricingRoute from "./pricing.route";


const AppRouter = express.Router();

const appRoutes: Routes = [
    {
        path: "/auth",
        router: AuthRoute,
    },
    {
        path: "/profile",
        router: ProfileRoute,
    },
    {
        path: "/pricing",
        router: PricingRoute,   
    }

];

appRoutes.forEach((route) => {
    AppRouter.use(route.path, route.router);
});

export default AppRouter;
