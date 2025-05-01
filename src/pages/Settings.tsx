import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Heading from "../ui/Heading";

function Settings() {
  return (
    <>
      <Heading as="h1">Settings</Heading>
      <UpdateSettingsForm />
    </>
  );
}

export default Settings;
