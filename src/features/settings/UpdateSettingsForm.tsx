import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useEditSettings } from "./useUpdateSettings";
import { useGetSettings } from "./useGetSettings";
import { SettingsAPIData } from "./blueprints";
import Empty from "../../ui/Empty";

function UpdateSettingsForm() {
  const { isPending, settings } = useGetSettings();

  const { isPending: isEditing, updateSettings } = useEditSettings();

  if (isPending) return <Spinner />;

  if (!settings) return <Empty resourceName="settings"/>

  const handleBlur = (id: string, value: number) => {
    if (settings && settings[id as keyof SettingsAPIData] !== value) {
      updateSettings({ [id]: value });
    }
  };

  return (
    <>
      <Form>
        <FormRow label="Minimum nights/booking">
          <Input
            type="number"
            id="min_booking_length"
            defaultValue={settings.min_booking_length}
            onBlur={(e) => handleBlur(e.target.id, Number(e.target.value))}
            disabled={isEditing}
          />
        </FormRow>
        <FormRow label="Maximum nights/booking">
          <Input
            type="number"
            id="max_booking_length"
            defaultValue={settings.max_booking_length}
            onBlur={(e) => handleBlur(e.target.id, Number(e.target.value))}
            disabled={isEditing}
          />
        </FormRow>
        <FormRow label="Maximum guests/booking">
          <Input
            type="number"
            id="max_guests_per_booking"
            defaultValue={settings.max_guests_per_booking}
            onBlur={(e) => handleBlur(e.target.id, Number(e.target.value))}
            disabled={isEditing}
          />
        </FormRow>
        <FormRow label="Breakfast price">
          <Input
            type="number"
            id="breakfast_price"
            defaultValue={settings.breakfast_price}
            onBlur={(e) => handleBlur(e.target.id, Number(e.target.value))}
            disabled={isEditing}
          />
        </FormRow>
      </Form>
    </>
  );
}

export default UpdateSettingsForm;
