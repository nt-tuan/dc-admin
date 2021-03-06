import React from "react";
import { AutocompleteField } from "@/components/commons/fields";
import { useGetFamilies } from "../../libs/use-get-entity";

interface Props {
  name: string;
  value?: string;
  label: string;
  placeholder: string;
  segmentCode?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const FamilySelect = ({
  segmentCode,
  name,
  value,
  label,
  placeholder,
  required,
  disabled,
  onChange
}: Props) => {
  const { data } = useGetFamilies();
  const dataSource = React.useMemo(() => {
    const tempFamilies = data?.families.filter(
      (family) => segmentCode == null || family.segmentCode === segmentCode
    );
    return (
      tempFamilies?.map((segment) => ({
        value: segment.code,
        label: segment.title
      })) ?? []
    );
  }, [segmentCode, data]);
  return (
    <AutocompleteField
      disabled={disabled}
      label={label}
      required={required}
      placeholder={placeholder}
      dataSource={dataSource}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default FamilySelect;
