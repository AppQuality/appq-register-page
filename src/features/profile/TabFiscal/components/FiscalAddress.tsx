import {
  Button,
  BSGrid,
  BSCol,
  FormLabel,
  FormikField,
  Text,
  PlacesAutocomplete,
  FormGroup,
  ErrorMessage,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import residenceModalStore from "../../../../redux/addResidenceAddressModal";
import { FieldProps, useFormikContext } from "formik";

const FiscalAddress = () => {
  const { t } = useTranslation();
  const { open: openModal, address } = residenceModalStore();
  const { setValues, setTouched, values, errors } =
    useFormikContext<FiscalFormValues>();
  const formattedAddress = `${values.street || ""} ${values.city || ""} ${
    values.zipCode || ""
  } ${values.provinceCode || ""}, ${values.countryCode || ""}`;
  return (
    <FormGroup>
      <FormLabel htmlFor="" label={t("Fiscal Address")} />
      <PlacesAutocomplete
        placesProps={{
          apiKey: process.env.REACT_APP_GOOGLE_APIKEY || "",
          selectProps: {
            value: {
              label: formattedAddress,
              value: formattedAddress,
            },
          },
        }}
        onBlur={(e) =>
          setTouched({
            countryCode: true,
            provinceCode: true,
            city: true,
            zipCode: true,
            street: true,
          })
        }
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
          const zipCode = fields.find(
            (field) => field.types.indexOf("postal_code") >= 0
          );
          const street = fields.find(
            (field) => field.types.indexOf("route") >= 0
          );
          const streetNumber = fields.find(
            (field) => field.types.indexOf("street_number") >= 0
          );
          setValues(
            (prevState) => ({
              ...prevState,
              countryCode: country?.short_name,
              provinceCode: province?.short_name,
              city: city?.long_name,
              zipCode: zipCode?.long_name,
              street: street?.long_name,
              streetNumber: streetNumber?.long_name,
            }),
            true
          );
        }}
      />
      <Text className="aq-mt-3">
        {(errors.countryCode ||
          errors.provinceCode ||
          errors.city ||
          errors.zipCode ||
          errors.street) && (
          <div>
            <Text color="danger">
              Please add the following fields to your address:
            </Text>
            <ul style={{ listStyle: "disc" }}>
              {errors.countryCode && (
                <li>
                  <ErrorMessage name="countryCode" />
                </li>
              )}
              {errors.provinceCode && (
                <li>
                  <ErrorMessage name="provinceCode" />
                </li>
              )}
              {errors.city && (
                <li>
                  <ErrorMessage name="city" />
                </li>
              )}
              {errors.zipCode && (
                <li>
                  <ErrorMessage name="zipCode" />
                </li>
              )}
              {errors.street && (
                <li>
                  <ErrorMessage name="street" />
                </li>
              )}
            </ul>
          </div>
        )}
        {t("Problems?")}
        <Button
          as="a"
          type="link"
          htmlType="button"
          flat={true}
          onClick={openModal}
        >
          {t("Contact us")}
        </Button>
      </Text>
    </FormGroup>
  );
};
export default FiscalAddress;