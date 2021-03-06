import {
  FormGroup,
  FormikField,
  Select,
  SelectType,
} from "@appquality/appquality-design-system";
import { FieldProps } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import API from "src/utils/api";

export const EducationSelect = ({
  name,
  label,
}: {
  name: string;
  label: string;
}) => {
  const [educationLevels, setEducation] = useState<SelectType.Option[]>([]);
  const { t } = useTranslation();
  useEffect(() => {
    const getEmployments = async () => {
      const results = await API.educationLevels({});
      setEducation(
        results.map((item) => ({ label: item.name, value: item.id.toString() }))
      );
    };
    getEmployments();
  }, []);

  return (
    <FormikField name={name}>
      {({ field, form }: FieldProps) => (
        <FormGroup>
          <Select
            placeholder={t("Search")}
            name={field.name}
            label={label}
            value={educationLevels.filter((ed) => ed.value === field.value)}
            options={educationLevels}
            onBlur={() => {
              form.setFieldTouched(field.name);
            }}
            onChange={(v) => {
              if (v === null) {
                v = { label: "", value: "0" };
              }
              form.setFieldValue(field.name, v.value, true);
            }}
            noOptionsMessage={() => t("__SELECT_DEFAULT_NO_OPTION")}
          />
        </FormGroup>
      )}
    </FormikField>
  );
};
