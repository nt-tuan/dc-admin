import React from "react";
import { AutocompleteField } from "@/components/commons/fields";
import { useGetFamily, useGetClasses } from "../../libs/use-get-entity";
import { ProductClass } from "@/services/pim.service";

interface Props {
  name: string;
  value?: string;
  label: string;
  placeholder: string;
  familyCode?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const parseFromClass = (cl: ProductClass) => {
  return {
    value: cl.code,
    label: cl.title
  };
};
const ClassSelect = ({
  familyCode,
  name,
  value,
  label,
  onChange,
  required,
  disabled,
  placeholder
}: Props) => {
  const { data, isLoading } = useGetClasses({ enabled: !Boolean(familyCode) });
  const { data: familyData, isLoading: isFamilyLoading } = useGetFamily(familyCode);
  const dataSource = React.useMemo(() => {
    if (familyCode) {
      return familyData?.classes?.map(parseFromClass) ?? [];
    }
    return data?.classes?.map(parseFromClass) ?? [];
  }, [data, familyData, familyCode]);
  return (
    <AutocompleteField
      label={label}
      required={required}
      loading={isLoading || isFamilyLoading}
      placeholder={placeholder}
      dataSource={dataSource}
      name={name}
      value={value}
      disabled={disabled}
      onChange={onChange}
    />
  );
};

export default ClassSelect;
