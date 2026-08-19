import { Router, type IRouter } from "express";
import healthRouter from "./health";
import inquiryRouter from "./inquiry";
import chatRouter from "./chat";

const router: IRouter = Router();

router.use(healthRouter);
router.use(inquiryRouter);
router.use(chatRouter);

export default router;
