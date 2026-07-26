import DashboardLayout from "../components/DashboardLayout";
import ProfileCard from "../components/profile/ProfileCard";
import PersonalInfo from "../components/profile/PersonalInfo";
import PasswordSection from "../components/profile/PasswordSection";
import StatisticsCard from "../components/profile/StatisticsCard";


export default function Profile() {
    return (
        <DashboardLayout>
            <h1 className="page-title">
                My Profile
            </h1>
            <div className="profile-grid">
                <ProfileCard />
                <StatisticsCard />
            </div>
            <PersonalInfo />
            <PasswordSection />
        </DashboardLayout>
    );
}