export type RecordSearchRequest = {
  textSearch?: string;
};

export type BuyerDto = {
  id: string;
  name: string;
};

export type ProcurementRecordDto = {
  id: string;
  title: string;
  description: string;
  buyer: BuyerDto;
  publishDate: string;
};

export type RecordSearchResponse = {
  records: ProcurementRecordDto[];
};
