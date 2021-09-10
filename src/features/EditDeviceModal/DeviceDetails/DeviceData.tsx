import { Select, SelectType } from "@appquality/appquality-design-system";
import deviceStore from "../../../redux/devices";
import userDeviceStore from "../../../redux/userDevices";
import { useEffect } from "react";

export default ({ disabled, current }: { disabled: boolean; current: any }) => {
  const { devices } = deviceStore();
  if (!devices) return null;
  const { fetch: fetchManufacturer, select: selectManufacturer } = devices;

  let models: SelectType.Option[] = [];
  useEffect(() => {
    fetchManufacturer();
    if ("manufacturer" in current.device) {
      selectManufacturer(current.device.manufacturer);
    }
  }, []);
  useEffect(() => {
    if ("manufacturer" in current.device) {
      const currentManufacturer = devices.items.find(
        (m: ManufacturerDeviceItem) =>
          m.manufacturer === current.device.manufacturer
      );
      if (currentManufacturer) {
        models = currentManufacturer.models.map((mod: any) => {
          return { label: mod.model, value: mod.id };
        });
      }
    }
  }, [current]);

  if (current.type === "PC" && "pc_type" in current.device) {
    return <>PC</>;
  } else if ("manufacturer" in current.device && "model" in current.device) {
    const manufacturers: SelectType.Option[] = devices.items.map(
      (m: ManufacturerDeviceItem) => {
        return { label: m.manufacturer, value: m.manufacturer };
      }
    );
    return (
      <div style={{ height: " 200px" }}>
        <Select
          name="manufacturer"
          label="Manufacturer"
          options={manufacturers}
          isClearable={false}
          onChange={(o) => o.value && selectManufacturer(o.value)}
          isLoading={devices.loading}
          isDisabled={disabled || devices.loading}
          value={{
            label: devices.current || "",
            value: devices.current || "",
          }}
        ></Select>
        <Select
          name="model"
          label="Model"
          options={models}
          isClearable={false}
          onChange={(o) => o.value && selectManufacturer(o.value)}
          isLoading={devices.loading}
          isDisabled={disabled || !models.length}
          value={{
            label: "",
            value: "",
          }}
        ></Select>
      </div>
    );
  }
  return null;
};