import { useTranslation } from "react-i18next";
import {
  Button,
  CSSGrid,
  Form,
  Formik,
  FormikField,
  FormLabel,
  FieldProps,
  FormGroup,
  ErrorMessage,
  Radio,
  Text,
  Title,
  Input,
  Select,
  Modal,
} from "@appquality/appquality-design-system";
import { useState, useEffect } from "react";
import UserStore from "../../../redux/user";
import FiscalTypeArea from "./components/FiscalTypeArea";
import { ChangeEvent } from "react";
import FiscalAddress from "./components/FiscalAddress";
import residenceModalStore from "../../../redux/addResidenceAddressModal";
import * as yup from "yup";

export const TabFiscalEdit = ({ setEdit }: TabCommonProps) => {
  const { t } = useTranslation();
  const { user } = UserStore();
  const { address } = residenceModalStore();

  const initialUserValues: FiscalFormValues = {
    gender: user.gender || "",
    fiscalId: user.fiscal?.fiscalId || "",
    fiscalTypeSelect: user.fiscal?.type || "",
    fiscalTypeRadio:
      user.fiscal?.type === "non-italian"
        ? "non-italian"
        : ["witholding", "witholding-extra", "other"].includes(
            user.fiscal?.type
          )
        ? "italian"
        : undefined,
    birthPlaceCity: user.fiscal?.birthPlace?.city,
    birthPlaceProvince: user.fiscal?.birthPlace?.province,
    countryCode: user.fiscal?.address?.country,
    provinceCode: user.fiscal?.address?.province,
    city: user.fiscal?.address?.city,
    street: user.fiscal?.address?.street,
    zipCode: user.fiscal?.address?.cityCode,
  };

  const validationSchema = {
    gender: yup.string().oneOf(["male", "female"]).required(),
    countryCode: yup.string().required(t("Country")),
    provinceCode: yup.string().required(t("Province/state")),
    city: yup.string().required(t("City")),
    street: yup.string().required(t("stret")),
    zipCode: yup.string().required(t("zip code")),
    fiscalTypeRadio: yup.string().oneOf(["non-italian", "italian"]).required(),
    fiscalTypeSelect: yup
      .string()
      .oneOf(["witholding", "witholding-extra", "other"])
      .required(),
    type: yup
      .string()
      .oneOf(["non-italian", "witholding", "witholding-extra", "other"])
      .required(),
    birthPlaceCity: yup.string().required(),
    birthPlaceProvince: yup.string().required(),
    fiscalId: yup.string().required(),
  };

  const genderOptions = [
    { value: "male", label: t("Male") },
    { value: "female", label: t("Female") },
  ];

  return (
    <Formik
      enableReinitialize
      initialValues={initialUserValues}
      validationSchema={yup.object(validationSchema)}
      onSubmit={(values) => {}}
    >
      <Form id="baseProfileForm" className="aq-m-3">
        <CSSGrid gutter="50px" rowGap="1rem" min="220px">
          <div className="user-info">
            <Title size="xs" className="aq-mb-2">
              {t("Informations")}
            </Title>
            <FormGroup>
              <FormLabel htmlFor="name" label={t("Name")} isDisabled />
              <Input id="name" type="text" disabled value={user.name} />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="surname" label={t("Surname")} />
              <Input id="surname" type="text" disabled value={user.surname} />
            </FormGroup>
            <FormikField name="gender">
              {({
                field, // { name, value, onChange, onBlur }
                form,
              }: FieldProps) => {
                return (
                  <FormGroup>
                    <Select
                      name={field.name}
                      label={t("Gender")}
                      value={genderOptions.filter(
                        (opt) => opt.value === field.value
                      )}
                      onBlur={(e: ChangeEvent) => {
                        form.setFieldTouched(field.name);
                      }}
                      onChange={(v) => {
                        if (v === null) {
                          v = { label: "", value: "" };
                        }
                        field.onChange(v.value);
                        form.setFieldValue(field.name, v.value, true);
                      }}
                      options={genderOptions}
                    />
                    <Text small className="aq-mt-1">
                      For tax reasons we are obliged to tie this choice to
                      binary options only
                    </Text>
                    <ErrorMessage name={field.name} />
                  </FormGroup>
                );
              }}
            </FormikField>
            <FormGroup className="aq-mb-3">
              <FormLabel
                htmlFor="birth_date"
                label={t("Birth Date")}
                isDisabled
              />
              <Input
                id="birth_date"
                type="text"
                disabled
                value={user.birthDate}
              />
            </FormGroup>
          </div>

          <div className="tax-residence">
            <Title size="xs" className="aq-mb-2">
              {t("Tax residence")}
            </Title>
            <FiscalTypeArea />
            <div className="aq-mb-3">
              <FiscalAddress />
            </div>
            <Button type="primary" htmlType="submit" flat={true}>
              {t("Save")}
            </Button>
          </div>
        </CSSGrid>
      </Form>
    </Formik>
  );
};