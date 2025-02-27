import { Request, Response } from "express";
import { ShopAddressService } from "@root/Services/shop-address.service";

const shopAddressService = new ShopAddressService();

export class ShopAddressController {
    static async createShopAddress(req: Request, res: Response) {
        try {
            const { shopId } = req.params;
            const newShopAddress = await shopAddressService.createShopAddress(parseInt(shopId), req.body);
            res.status(201).json(newShopAddress);
        } catch (error) {
            console.error("Error creating shop address:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static async findNearestShops(req: Request, res: Response) {
        try {
            const { longitude, latitude, radius } = req.query;

            if (!longitude || !latitude) {
                res.status(400).json({ message: "Longitude and Latitude are required" });
                return;
            }

            const shops = await shopAddressService.findNearestShops(
                parseFloat(longitude as string),
                parseFloat(latitude as string),
                radius ? parseInt(radius as string) : 10000
            );

            res.status(200).json(shops);
        } catch (error) {
            console.error("Error fetching nearby shops:", error);
            res.status(500).json({ message: "Internal Server Error" });
            return;
        }
    }
}
