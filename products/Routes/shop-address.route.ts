import express from "express";
import { ShopAddressController } from "@root/Controller/shop-address.controller";

const router = express.Router();
const shopAddressController = new ShopAddressController();

router.route("/shop-addresses/:shopId").post(shopAddressController.createShopAddress);
router.route("/shop-addresses/nearby").get(shopAddressController.findNearestShops);

export default router;
