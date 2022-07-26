export type SearchRecordsRequest = {
  textSearch?: string;
  buyerIds?: string | string[];
};

export type ProcurementRecord = {
  id: string;
  stage: string;
  title: string;
  description: string;
  publishDate: string;
  awardDate: string;
  closeDate: string;
  buyer: {
    id: string;
    name: string;
  };
  value: number;
  currency: string;
};

export type SearchRecordsResponse = {
  data: ProcurementRecord[];
  count: number;
  records: ProcurementRecord[];
};

class Api {
  async searchRecords(
    request: SearchRecordsRequest
  ): Promise<SearchRecordsResponse> {
    const response = await fetch("/api/records", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(request),
    });
    return await response.json();
  }
}

export default Api;
