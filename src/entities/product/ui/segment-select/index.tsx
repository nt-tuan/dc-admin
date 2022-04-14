import React from "react";
import { AutocompleteField } from "@/components/commons/fields";
import { useGetSegments } from "../../libs/use-get-segments";

interface Props {
  name: string;
  value?: string;
  label: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const SegmentSelect = ({ name, value, label, placeholder, onChange }: Props) => {
  const { data, isLoading } = useGetSegments();
  const dataSource = React.useMemo(() => {
    if (data == null) return [];
    return data.segments.map((segment) => ({
      value: segment.code,
      label: segment.title
    }));
  }, [data]);
  return (
    <AutocompleteField
      loading={isLoading}
      label={label}
      dataSource={dataSource}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default SegmentSelect;
