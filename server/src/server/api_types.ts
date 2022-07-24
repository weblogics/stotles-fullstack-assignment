export type RecordSearchRequest = {
  textSearch?: string;
};

export type BuyerDto = {
  id: string;
  name: string;
};

export type ProcurementRecordDto = {
  id: string;
  stage: string;
  title: string;
  description: string;
  buyer: BuyerDto;
  publishDate: string;
  awardDate: string;
  closeDate: string;
  value: number;
  currency: string;
};

export type RecordSearchResponse = {
  records: ProcurementRecordDto[];
};
