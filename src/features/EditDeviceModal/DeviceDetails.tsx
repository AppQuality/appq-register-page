import { useFormikContext, Field } from "formik";
import {
  FieldProps,
  Select,
  SelectType,
} from "@appquality/appquality-design-system";
import { useEffect, useState } from "react";
import PCData from "./DeviceDetails/DeviceData/PCData";
import OtherDeviceData from "./DeviceDetails/DeviceData/OtherDeviceData";
import { useTranslation } from "react-i18next";
import API from "../../utils/api";

export default ({ edit }: { edit: boolean }) => {
  const { values } = useFormikContext<DeviceFormInterface>();
  const { t } = useTranslation();
  const [osPlatforms, setOsPlatforms] = useState<SelectType.Option[]>([]);
  const [osVersions, setOsVersions] = useState<SelectType.Option[]>([]);

  useEffect(() => {
    const getOsPlatforms = async () => {
      const platformsResults = await API.getOsPlatforms({
        deviceType: values.device_type,
        query: {
          filterBy: {
            manufacturer: values.manufacturer,
            model: values.model,
          },
        },
      });
      const options = platformsResults.map((item) => ({
        value: item.name || "",
        label: item.name || "",
      }));
      setOsPlatforms(options);
    };
    const getOsVersions = async () => {
      const versionsResults = await API.getOsVersions({
        deviceType: values.device_type,
        query: {
          filterBy: {
            platform: values.operating_system_platform,
          },
        },
      });
      const options = versionsResults.map((item) => ({
        value: item.id?.toString() || "",
        label: item.name || "",
      }));
      setOsVersions(options);
    };
    if (values.device || values.pc_type) {
      // manufacturer AND model already selected
      // fetch os_platform values
      getOsPlatforms();
      if (values.operating_system_platform !== "") {
        // if the platform has been selected i want the versions
        // fetch os_version
        getOsVersions();
      }
    }
  }, [values]);
  return (
    <div>
      {values.device_type === 2 ? ( // id of PC device type
        <PCData edit={edit} />
      ) : (
        <OtherDeviceData edit={edit} />
      )}
      <Field name="operating_system_platform">
        {({
          field, // { name, value, onChange, onBlur }
          form,
          meta,
        }: FieldProps) => (
          <Select
            name={field.name}
            label={t("Operating system")}
            isDisabled={edit || (!values.model && !values.pc_type)}
            options={osPlatforms}
            menuTargetQuery="body"
            onChange={(v) => {
              if (v == null) {
                v = { label: "", value: "" };
              }
              field.onChange(v.value);
              form.setFieldValue(field.name, v.value, true);
            }}
            value={{
              label: field.value,
              value: field.value,
            }}
          />
        )}
      </Field>
      <Field name="operating_system_version">
        {/* enabled if the rest is completed */}
        {({
          field, // { name, value, onChange, onBlur }
          form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
          meta,
        }: FieldProps) => (
          <Select
            name={field.name}
            isDisabled={!values.operating_system_platform}
            label={t("Operating system version")}
            options={osVersions}
            value={{
              label: values.operating_system_version || "",
              value: values.operating_system_id?.toString() || "0",
            }}
            menuTargetQuery="body"
            onChange={(v) => {
              if (v == null) {
                v = { label: "", value: "" };
              }
              field.onChange(v.value);
              form.setFieldValue("operating_system_version", v.label, true);
              form.setFieldValue("operating_system_id", v.value, true);
            }}
          />
        )}
      </Field>
    </div>
  );
};
