import { useTranslation } from "react-i18next";
import {
  CSSGrid,
  Form,
  Formik,
  FormikField,
  FormLabel,
  FieldProps,
  FormGroup,
  ErrorMessage,
  Text,
  Title,
  Input,
  Select,
} from "@appquality/appquality-design-system";
import { useSelector, shallowEqual } from "react-redux";
import FiscalTypeArea from "./components/FiscalTypeArea";
import FiscalAddress from "./components/FiscalAddress";
import * as yup from "yup";
import dateFormatter from "../../../utils/dateFormatter";
import { useDispatch } from "react-redux";
import { updateFiscalProfile } from "../../../redux/user/actions/updateFiscalProfile";
import { HalfColumnButton } from "src/pages/profile/HalfColumnButton";
import { SkeletonTab } from "src/features/profile/SkeletonTab";

export const TabFiscalEdit = () => {
  const { t } = useTranslation();
  const fiscalData = useSelector(
    (state: GeneralState) => state.user.fiscal.data,
    shallowEqual
  );
  const userData = useSelector(
    (state: GeneralState) => state.user.user,
    shallowEqual
  );
  const isProfileLoading = useSelector(
    (state: GeneralState) => state.user.loadingProfile,
    shallowEqual
  );
  const dispatch = useDispatch();

  let street, streetNumber, streetData;
  if (fiscalData?.address?.street) {
    streetData = fiscalData?.address?.street.split(",");
    street = streetData[0];
    if (streetData.length > 1) streetNumber = streetData[1];
  }

  const initialUserValues: FiscalFormValues = {
    gender: fiscalData?.gender || "",
    fiscalId: fiscalData?.fiscalId || "",
    type: fiscalData?.type || "",
    fiscalTypeSelect:
      fiscalData?.type === "non-italian" ? "" : fiscalData?.type,
    fiscalTypeRadio:
      fiscalData?.type === "non-italian"
        ? "non-italian"
        : ["withholding", "witholding-extra", "other"].includes(
            fiscalData?.type || ""
          )
        ? "italian"
        : undefined,
    birthPlaceCity: fiscalData?.birthPlace?.city,
    birthPlaceProvince: fiscalData?.birthPlace?.province,
    countryCode: fiscalData?.address?.country,
    provinceCode: fiscalData?.address?.province,
    city: fiscalData?.address?.city,
    street: street,
    streetNumber: streetNumber,
    zipCode: fiscalData?.address?.cityCode,
  };

  const validationSchema = {
    gender: yup
      .string()
      .oneOf(["male", "female"])
      .required(t("This is a required field")),
    countryCode: yup.string().required(t("You need to select a country")),
    provinceCode: yup
      .string()
      .required(t("Your address need to have a province code")),
    city: yup.string().required(t("You need to select a city")),
    street: yup.string().required(t("You need to select a street")),
    streetNumber: yup
      .string()
      .required(t("You need to select a street with a street code")),
    zipCode: yup.string().required(t("Your address need a zip code")),
    fiscalTypeRadio: yup
      .string()
      .oneOf(["non-italian", "italian"])
      .required(t("This is a required field")),
    fiscalTypeSelect: yup
      .string()
      .oneOf(["withholding", "witholding-extra", "other"])
      .when("fiscalTypeRadio", {
        is: "italian",
        then: yup.string().required(t("This is a required field")),
      }),
    type: yup
      .string()
      .oneOf(["non-italian", "withholding", "witholding-extra", "other"])
      .required(t("This is a required field")),
    birthPlaceCity: yup.string().when("fiscalTypeRadio", {
      is: "italian",
      then: yup.string().required(t("This is a required field")),
    }),
    birthPlaceProvince: yup.string().when("fiscalTypeRadio", {
      is: "italian",
      then: yup.string().when("birthPlaceCity", (birthPlaceCity) => {
        if (yup.string().required().isValidSync(birthPlaceCity)) {
          return yup
            .string()
            .required(
              t(
                "This value is invalid, you need to select a city with a province"
              )
            );
        }
        return yup.string();
      }),
    }),
    fiscalId: yup
      .string()
      .required(t("This is a required field"))
      .when("fiscalTypeRadio", {
        is: "italian",
        then: yup
          .string()
          .min(16, t("Should be exactly 16 characters"))
          .max(16, t("Should be exactly 16 characters")),
      }),
  };

  const genderOptions = [
    { value: "male", label: t("Male") },
    { value: "female", label: t("Female") },
  ];

  if (isProfileLoading) return <SkeletonTab />;
  return (
    <Formik
      enableReinitialize
      initialValues={initialUserValues}
      validationSchema={yup.object(validationSchema)}
      onSubmit={async (values, helpers) => {
        const submitValues = {
          address: {
            country: values.countryCode,
            province: values.provinceCode,
            city: values.city,
            street: `${values.street}, ${values.streetNumber}`,
            cityCode: values.zipCode,
          },
          type: values.type,
          birthPlace: {
            city: values.birthPlaceCity,
            province: values.birthPlaceProvince,
          },
          fiscalId: values.fiscalId,
          gender: values.gender,
        };
        dispatch(
          updateFiscalProfile(submitValues as UserData, {
            verifiedMessage: (
              <>
                <b>{t("Valid tax profile")}</b>
                <br />
                {t(
                  'You can view your profile summary and make changes if necessary in the "Tax" section of your profile.'
                )}
              </>
            ),
            unverifiedMessage: (
              <>
                <b>{t("Invalid tax profile.")}</b>
                <br />
                {t(
                  "There was an error validating your fiscal profile, please check your data."
                )}
              </>
            ),
          })
        );
        helpers.setSubmitting(false);
        helpers.resetForm({ values });
      }}
    >
      {({ isValid, isValidating, dirty }) => (
        <Form id="baseProfileForm">
          <CSSGrid gutter="50px" rowGap="1rem" min="220px">
            <div className="user-info">
              <Title size="xs" className="aq-mb-2">
                {t("Informations")}
              </Title>
              <FormGroup>
                <FormLabel htmlFor="name" label={t("Name")} isDisabled />
                <Input id="name" type="text" disabled value={userData.name} />
              </FormGroup>
              <FormGroup>
                <FormLabel htmlFor="surname" label={t("Surname")} isDisabled />
                <Input
                  id="surname"
                  type="text"
                  disabled
                  value={userData.surname}
                />
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
                        value={{ label: "", value: field.value }}
                        onChange={(v) => {
                          form.setFieldTouched(field.name);
                          if (!v || !v.value) {
                            form.setFieldValue(field.name, "", true);
                            return;
                          }
                          form.setFieldValue(field.name, v.value, true);
                        }}
                        options={genderOptions}
                      />
                      <Text small className="aq-mt-1">
                        <span className="aq-text-secondary">
                          {t(
                            "For tax reasons we are obliged to tie this choice to binary options only"
                          )}
                        </span>
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
                  value={dateFormatter(userData.birthDate)}
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
              <CSSGrid min="50%" gutter="0" fill>
                <HalfColumnButton
                  type="success"
                  htmlType="submit"
                  flat
                  disabled={!isValid || isValidating || !dirty}
                >
                  {t("Save")}
                </HalfColumnButton>
              </CSSGrid>
            </div>
          </CSSGrid>
        </Form>
      )}
    </Formik>
  );
};
