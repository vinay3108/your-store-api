import express from "express";
import { ShopAddressController } from "@root/Controller/shop-address.controller";


export default function ShopAddressRouter() {
    const router = express.Router();
    router.post("/:shopId",ShopAddressController.createShopAddress);
    router.get("/nearby",ShopAddressController.findNearestShops);
    
    return router;
}
