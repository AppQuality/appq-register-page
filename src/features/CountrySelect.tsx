import { Select, SelectType } from "@appquality/appquality-design-system";
import { useState, useMemo } from "react";
import countryList from "react-select-country-list";
import { useTranslation } from "react-i18next";

const CountrySelect = ({
  name,
  initialValue,
  onChange,
}: {
  name: string;
  initialValue: SelectType.Option;
  onChange: (v: SelectType.Option) => void;
}) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(initialValue);
  const options = useMemo(
    () =>
      countryList()
        .getData()
        .map((c) => ({ label: c.label, value: c.label })),
    []
  );
  return (
    <Select
      name={name}
      label={t("Country")}
      value={value}
      onChange={(v) => {
        if (v == null) {
          v = { label: "", value: "" };
        }
        onChange(v);
        setValue(v);
      }}
      options={options}
    />
  );
};

export default CountrySelect;
