export interface subCateType {
  Id: number;
  Name: string;
  Product: {
    Name: string;
    PriceCode: string;
    ImageName: string;
    Id: number;
  }[];
}
