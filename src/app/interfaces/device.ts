import { Brand} from "./brand";
import { Model } from "./model";

export interface Device {
    id: number;
    brand: Brand ;
    model: Model ;
    processor: string;
    memory: string;
    screen: string;
    storage: string;
    description: string;
    newDevice: boolean;
}
