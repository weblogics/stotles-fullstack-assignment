import React from "react";

import Api, { ProcurementRecord } from "@/services/Api";
import RecordSearchFilters from "@/components/RecordSearchFilters";
import RecordsTable from "@/components/RecordsTable";

import { SearchFilters } from "@/types/shared/RecordSearchFilters.types";

function RecordSearchPage() {
  const [searchFilters, setSearchFilters] = React.useState<SearchFilters>({
    query: "",
  });

  const [records, setRecords] = React.useState<
    ProcurementRecord[] | undefined
  >();

  React.useEffect(() => {
    void (async () => {
      const api = new Api();
      const response = await api.searchRecords({
        textSearch: searchFilters.query,
      });

      setRecords(response.data);
    })();
  }, [searchFilters]);

  return (
    <>
      {/* SUGGESTION: Add loader for improved UX */}
      <RecordSearchFilters
        filters={searchFilters}
        onChange={setSearchFilters}
      />
      {records && <RecordsTable records={records} />}
    </>
  );
}

export default RecordSearchPage;
