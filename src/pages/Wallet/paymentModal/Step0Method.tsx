import { useTranslation } from "react-i18next";
import {
  Checkbox,
  ErrorMessage,
  FormGroup,
  FormikField,
  Radio,
} from "@appquality/appquality-design-system";
import { FieldProps } from "formik";
import { BaseSyntheticEvent } from "react";

export const Step0Method = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div>
        <strong>{t("Chose payment method")}</strong>
      </div>
      <FormikField name="paymentMethod" className="aq-mb-3">
        {({ field, form, meta }: FieldProps) => {
          const onRadioChange = (val: string) => {
            field.onChange(val);
            form.setFieldValue(field.name, val);
          };
          return (
            <FormGroup>
              <Radio
                id={`${field.name}-pp`}
                name={field.name}
                value="paypal"
                checked={field.value === "paypal"}
                onChange={onRadioChange}
                label="Paypal"
              />
              <Radio
                id={`${field.name}-bank`}
                name={field.name}
                value="bank"
                checked={field.value === "bank"}
                onChange={onRadioChange}
                label={t("Bank")}
              />
              <ErrorMessage name={field.name} />
            </FormGroup>
          );
        }}
      </FormikField>
      <FormikField name="termsAcceptance" className="aq-mb-3">
        {({ field, form, meta }: FieldProps) => {
          const onCheckChange = (e: BaseSyntheticEvent) => {
            field.onChange(e);
            form.setFieldValue(field.name, e.target.checked);
          };
          return (
            <FormGroup>
              <Checkbox
                id="termsAcceptance"
                name={field.name}
                onChange={onCheckChange}
                checked={field.value}
                label={t("accept conditions and continue request")}
                onBlur={field.onBlur}
              />
              <ErrorMessage name={field.name} />
            </FormGroup>
          );
        }}
      </FormikField>
    </div>
  );
};