import React from "react";
import { AutocompleteField } from "@/components/commons/fields";
import { useGetClasses } from "../../libs/use-get-classes";

interface Props {
  name: string;
  value?: string;
  label: string;
  placeholder: string;
  familyCode?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ClassSelect = ({ familyCode, name, value, label, onChange, placeholder }: Props) => {
  const { data, isLoading } = useGetClasses();
  const dataSource = React.useMemo(() => {
    if (data == null) return [];
    const classes = data.classes.map((cl) => ({
      value: cl.code,
      label: cl.title
    }));
    if (!familyCode) return classes;
    return classes.filter((cl) => cl.value === familyCode);
  }, [data, familyCode]);
  return (
    <AutocompleteField
      label={label}
      loading={isLoading}
      placeholder={placeholder}
      dataSource={dataSource}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default ClassSelect;
