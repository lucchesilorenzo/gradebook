import H2 from "@/components/common/H2";
import ProfilePersonalInfo from "./ProfilePersonalInfo";
import ProfileContacts from "./ProfileContacts";

export default function ProfileInfoTab() {
  return (
    <div className="space-y-6">
      <section>
        <H2>Personal Information</H2>
        <ProfilePersonalInfo />
      </section>

      <section>
        <H2>Contacts</H2>
        <ProfileContacts />
      </section>
    </div>
  );
}
