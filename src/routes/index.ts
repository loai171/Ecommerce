import { Router } from "express";
import { userRoutes } from "../modules/user/user.route.js";
import { authRoutes } from "../modules/auth/auth.route.js";
import { productRoutes } from "../modules/product/product.route.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/product", productRoutes);

export const apiRoutes = router;
