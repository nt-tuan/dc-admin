import React from "react";
import { AutocompleteField } from "@/components/commons/fields";
import { useGetClasses } from "../../libs/use-get-classes";
import { useGetFamily } from "../../libs/use-get-families";
import { ProductClass } from "@/services/pim.service";

interface Props {
  name: string;
  value?: string;
  label: string;
  placeholder: string;
  familyCode?: string;
  required?: boolean;
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
      onChange={onChange}
    />
  );
};

export default ClassSelect;
