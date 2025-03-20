export interface DeliveryDistrict {
  _id: string;
  name: string;
  deliveryCost?: number;
}

export interface DeliveryDistrictResponse {
  success: boolean;
  result: DeliveryDistrict[];
}

export interface DeliveryDistrictDelResponse {
  success: boolean;
  message: string;
}

export interface IAddDeliveryDistrict {
  name: string;
  deliveryCost: number;
}

export interface IDeliveryDistrictAddResponse {
  success: boolean;
  message: string;
  data: DeliveryDistrict;
}
