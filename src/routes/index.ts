import { Router } from "express";
import authRoutes from "./auth";
import notesRoutes from "./notes";

 const appRoutes = Router()

//Register post request will be handled here
//Added registervalidator as middleware to validate required body
appRoutes.use("/auth",  authRoutes)
//Notes CRUD end points
appRoutes.use("/notes",  notesRoutes)

export default appRoutes