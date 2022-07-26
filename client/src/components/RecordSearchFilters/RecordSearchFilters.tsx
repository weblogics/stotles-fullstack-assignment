import React from "react";

import { FilterOutlined } from "@ant-design/icons";
import { Input, Select, Button } from "antd";
import { SearchFilters } from "@/types/shared/RecordFilter.types";
import { BuyerRecord } from "@/types/shared/Buyer.types";

import styles from "./RecordSearchFilters.module.css";

const { Option } = Select;

type Props = {
  filters: SearchFilters;
  buyerFilterOptions: BuyerRecord[];
  onChange: (newFilters: SearchFilters) => void;
};

function RecordSearchFilters(props: Props) {
  const { filters, buyerFilterOptions, onChange } = props;

  const handleQueryChange = React.useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      onChange({
        ...filters,
        query: e.currentTarget.value,
      });
    },
    [onChange, filters]
  );

  const handleBuyerChange = React.useCallback(
    (value: string | string[]) => {
      onChange({
        ...filters,
        buyerIds: value,
      });
    },
    [onChange, filters]
  );

  const onClearFilters = () => {
    onChange({
      query: "",
      buyerIds: [],
    });
  };

  const renderBuyerOptions: React.ReactNode[] = buyerFilterOptions.map(
    (option) => (
      <Option key={option.id} value={option.id}>
        {option.name}
      </Option>
    )
  );

  return (
    <div className={styles.searchFilters}>
      <Input
        placeholder="Search text..."
        value={filters.query}
        onChange={handleQueryChange}
      />
      <Select
        mode="tags"
        size="middle"
        placeholder="Please select"
        defaultValue={filters.buyerIds}
        onChange={handleBuyerChange}
        style={{ width: "100%" }}
      >
        {buyerFilterOptions.length > 0 ? renderBuyerOptions : null}
      </Select>
      <Button
        disabled={filters.query.length === 0 && filters.buyerIds.length === 0}
        type="primary"
        icon={<FilterOutlined />}
        onClick={() => onClearFilters()}
      >
        Clear filters
      </Button>
    </div>
  );
}

export default RecordSearchFilters;
