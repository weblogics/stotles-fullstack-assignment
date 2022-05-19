import React from "react";
import Api, { ProcurementRecord } from "./Api";
import RecordSearchFilters, { SearchFilters } from "./RecordSearchFilters";
import RecordsTable from "./RecordsTable";

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

      setRecords(response.records);
    })();
  }, [searchFilters]);

  return (
    <>
      <RecordSearchFilters
        filters={searchFilters}
        onChange={setSearchFilters}
      />
      {records && <RecordsTable records={records} />}
    </>
  );
}

export default RecordSearchPage;
