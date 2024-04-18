import express from "express"
import myUserController from "../controllers/MyUserController"
import { jwtCheck, jwtParse } from "../middlewares/auth"
import { validateMyUserRequest } from "../middlewares/validation"

const router = express.Router()

router.get("/", jwtCheck, jwtParse, myUserController.getCurrentUser)
router.post("/", jwtCheck, myUserController.createCurrentUser)
router.put("/", jwtCheck, jwtParse, validateMyUserRequest, myUserController.updateCurrentUser)



export default router