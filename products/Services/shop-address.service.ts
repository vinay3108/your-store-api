import dbConnection from "@root/DB/db.connection";
import { Repository } from "typeorm";
import { ShopAddress } from "@root/Model/shop_addresses.model";

export class ShopAddressService {
    private shopAddressRepository: Repository<ShopAddress>;

    constructor() {
        this.shopAddressRepository = dbConnection.getRepository(ShopAddress);
    }

    async createShopAddress(shopId: number, data: Partial<ShopAddress>): Promise<ShopAddress> {
        const shopAddress = this.shopAddressRepository.create({
            ...data,
            shop: { id: shopId } as any,
        });
        return await this.shopAddressRepository.save(shopAddress);
    }

    async findNearestShops(userLongitude: number, userLatitude: number, radius: number = 10000): Promise<ShopAddress[]> {
        return await this.shopAddressRepository
            .createQueryBuilder("shop_address")
            .leftJoinAndSelect("shop_address.shop", "shop")
            .orderBy()
            .getMany();
    }
}
