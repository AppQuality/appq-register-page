import { useFormikContext, Field as FormikField, FieldProps } from "formik";
import {
  Radio,
  FormGroup,
  Select,
  FormLabel,
  Input,
  Text,
  PlacesAutocomplete,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { ChangeEvent } from "react";

const FiscalTypeArea = () => {
  const { values, setValues } = useFormikContext<FiscalFormValues>();
  const { t, i18n } = useTranslation();
  return (
    <>
      <FormikField name="fiscalTypeRadio">
        {({
          field, // { name, value, onChange, onBlur }
          form,
        }: FieldProps) => (
          <FormGroup>
            <Radio
              name={field.name}
              checked={field.value === "italian"}
              id="italian"
              label={t("Italian")}
              onChange={() => form.setFieldValue(field.name, "italian", true)}
            />
            <Radio
              name={field.name}
              checked={field.value === "non-italian"}
              id="notItalian"
              label={t("Not italian")}
              onChange={() =>
                form.setFieldValue(field.name, "non-italian", true)
              }
            />
          </FormGroup>
        )}
      </FormikField>
      {values.fiscalTypeRadio === "italian" && (
        <FormikField name="fiscalTypeSelect">
          {({
            field, // { name, value, onChange, onBlur }
            form,
          }: FieldProps) => {
            return (
              <FormGroup>
                <Select
                  name={field.name}
                  label={t("Fiscal Type")}
                  value={
                    field.value
                      ? { value: field.value, label: "" }
                      : { value: "", label: "" }
                  }
                  onBlur={(e: ChangeEvent) => {
                    form.setFieldTouched(field.name);
                  }}
                  onChange={(v) => {
                    if (v == null) {
                      v = { label: "", value: "" };
                    }
                    field.onChange(v.value);
                    form.setFieldValue(field.name, v.value, true);
                  }}
                  options={[
                    {
                      value: "witholding",
                      label: t("witholding < 5000"),
                    },
                    {
                      value: "witholding-extra",
                      label: t("witholding > 5000"),
                    },
                    {
                      value: "other",
                      label: t("not compatible fiscal type"),
                    },
                  ]}
                />
              </FormGroup>
            );
          }}
        </FormikField>
      )}
      <FormGroup>
        <FormLabel label={t("city of birth")} htmlFor="birthCity" />
        <PlacesAutocomplete
          placesProps={{
            apiKey: process.env.REACT_APP_GOOGLE_APIKEY || "",
            apiOptions: {
              language: i18n.language,
              region: i18n.language,
            },
            selectProps: {
              // value: {
              //   label: formattedAddress,
              //   value: formattedAddress,
              // },
            },
            autocompletionRequest: {
              types: ["(cities)"],
            },
          }}
          onChange={(places) => {
            const fields = places[0].address_components;
            const country = fields.find(
              (field) => field.types.indexOf("country") >= 0
            );
            const province = fields.find(
              (field) => field.types.indexOf("administrative_area_level_2") >= 0
            );
            const city = fields.find(
              (field) => field.types.indexOf("administrative_area_level_3") >= 0
            );
            setValues((prevState) => ({
              ...prevState,
              birthPlaceCity: city?.long_name,
              birthPlaceProvince:
                country?.short_name === "IT" ? province?.short_name : "EE",
            }));
          }}
        />
      </FormGroup>
      <FormikField name="fiscalId">
        {({
          field, // { name, value, onChange, onBlur }
          form,
        }: FieldProps) => {
          return (
            <FormGroup>
              <FormLabel htmlFor={field.name} label={t("Fiscal ID")} />
              <Input
                id={field.name}
                type="text"
                value={field.value}
                onChange={(v) => {
                  field.onChange(v);
                  form.setFieldValue(field.name, v, true);
                }}
              />
              {values.fiscalTypeRadio === "italian" && (
                <Text small className="aq-mt-1">
                  Any change to your personal data will lead to the
                  recalculation of your tax code
                </Text>
              )}
            </FormGroup>
          );
        }}
      </FormikField>
    </>
  );
};

export default FiscalTypeArea;
