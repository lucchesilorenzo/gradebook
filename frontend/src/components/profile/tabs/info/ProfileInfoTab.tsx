import H2 from "@/components/common/H2";
import ProfilePersonalInfo from "./ProfilePersonalInfo";
import ProfileContacts from "./ProfileContacts";
import ProfileStatus from "./ProfileStatus";

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

      <section>
        <H2>Account Status</H2>
        <ProfileStatus />
      </section>
    </div>
  );
}
