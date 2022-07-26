import React from "react";

import Api, { ProcurementRecord } from "@/services/Api";
import RecordSearchFilters from "@/components/RecordSearchFilters";
import RecordsTable from "@/components/RecordsTable";

import { SearchFilters } from "@/types/shared/RecordFilter.types";
import { BuyerRecord } from "@/types/shared/Buyer.types";

function RecordSearchPage() {
  const [searchFilters, setSearchFilters] = React.useState<SearchFilters>({
    query: "",
    buyerIds: [],
  });

  const [records, setRecords] = React.useState<
    ProcurementRecord[] | undefined
  >();

  const serializeBuyerOptions = (records: ProcurementRecord[] | undefined) => {
    const buyers = new Array();

    if (!records) {
      return buyers;
    }

    return records
      .reduce((b, record) => {
        if (record.buyer) {
          b.push(record.buyer);
        }
        return b;
      }, [] as BuyerRecord[])
      .filter((b) => {
        const isDuplicate = buyers.includes(b.id);
        if (!isDuplicate) {
          buyers.push(b.id);
          return true;
        }
        return false;
      });
  };

  const buyerFilterOptions = React.useMemo(
    () => serializeBuyerOptions(records),
    [records]
  );

  React.useEffect(() => {
    void (async () => {
      const api = new Api();
      const response = await api.searchRecords({
        textSearch: searchFilters.query,
        buyerIds: searchFilters.buyerIds,
      });

      setRecords(response.data);
    })();
  }, [searchFilters]);

  return (
    <>
      {/* SUGGESTION: Add loader for improved UX */}
      <div>
        <RecordSearchFilters
          buyerFilterOptions={buyerFilterOptions}
          filters={searchFilters}
          onChange={setSearchFilters}
        />
      </div>

      {records && <RecordsTable records={records} />}
    </>
  );
}

export default RecordSearchPage;
