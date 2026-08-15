import { Router } from "express";
import { userRoutes } from "../modules/user/user.route.js";
import { authRoutes } from "../modules/auth/auth.route.js";
import { productRoutes } from "../modules/product/product.route.js";
import { cartRoutes } from "../modules/cart/cart.route.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/product", productRoutes);
router.use("/cart", cartRoutes);

export const apiRoutes = router;
