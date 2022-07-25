import React from "react";

import { Table } from "antd";
import { ColumnType } from "antd/lib/table";

import ProcurementRecordPreviewModal from "@/components/ProcurementRecordPreview";

import { ProcurementRecord } from "@/services/Api";
import { formatRecordCurrency } from "@/utils/formatRecordCurrency";

type Props = {
  records: ProcurementRecord[];
};

function RecordsTable(props: Props) {
  const { records } = props;
  const [previewedRecord, setPreviewedRecord] = React.useState<
    ProcurementRecord | undefined
  >();

  const columns = React.useMemo<ColumnType<ProcurementRecord>[]>(() => {
    return [
      {
        title: "Published",
        render: (record: ProcurementRecord) =>
          new Date(record.publishDate).toLocaleDateString(),
      },
      {
        title: "Title",
        render: (record: ProcurementRecord) => {
          const handleClick = (e: React.MouseEvent) => {
            e.preventDefault();
            setPreviewedRecord(record);
          };
          return (
            <a href="#" onClick={handleClick}>
              {record.title}
            </a>
          );
        },
      },
      {
        title: "Value",
        width: "10%",
        render: (record: ProcurementRecord) => formatRecordCurrency(record),
      },
      {
        title: "Stage",
        width: "20%",
        render: (record: ProcurementRecord) => renderType(record),
      },
      {
        title: "Buyer name",
        render: (record: ProcurementRecord) => record?.buyer?.name,
      },
    ];
  }, []);

  const formatTenderResponse = (record: ProcurementRecord) => {
    const today = new Date();
    const closeDate = new Date(record.closeDate);

    if (record.closeDate === null || closeDate > today) {
      return `Open until ${closeDate.toLocaleDateString()}`;
    }

    return `Closed`;
  };

  const formatContractResponse = (record: ProcurementRecord) => {
    const awardDate = new Date(record.awardDate);
    return `Awarded on ${awardDate.toLocaleDateString()}`;
  };

  const renderType = (record: ProcurementRecord) => {
    const stageTypes: Record<string, any> = {
      TENDER: formatTenderResponse(record),
      TenderIntent: formatTenderResponse(record),
      CONTRACT: formatContractResponse(record),
    };

    return stageTypes[record.stage] ?? "-";
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={records}
        pagination={false}
        rowKey="id"
      />
      <ProcurementRecordPreviewModal
        record={previewedRecord}
        onClose={() => setPreviewedRecord(undefined)}
      />
    </>
  );
}

export default RecordsTable;
