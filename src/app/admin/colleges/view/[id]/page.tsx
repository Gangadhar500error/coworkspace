"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { useTheme } from "../../../_components/ThemeProvider";
import { ArrowLeft, Building2, User, Mail, Phone, MapPin, FileText, Award, Tag } from "lucide-react";

interface CollegeData {
  id: number;
  role: string;
  name: string;
  username: string;
  email: string;
  mobileNo: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  skype: string;
  collegeType: string;
  approvedBy: string;
  nirfRanking: string;
  uploadFile: string;
  brochure: string;
  utmId: string;
  utmMedium: string;
  utmSource: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
}

// Dummy data - in real app, fetch from API based on id
const getCollegeData = (id: string | string[] | undefined): CollegeData => {
  const collegeId = typeof id === 'string' ? parseInt(id) : 1;
  
  const dummyData: Record<number, CollegeData> = {
    1: {
      id: 1,
      role: "Admin",
      name: "Harvard University",
      username: "harvard_edu",
      email: "contact@harvard.edu",
      mobileNo: "+1-617-495-1000",
      country: "USA",
      state: "Massachusetts",
      city: "Boston",
      zipCode: "02138",
      skype: "harvard.university",
      collegeType: "Private",
      approvedBy: "UGC",
      nirfRanking: "5",
      uploadFile: "harvard_logo.png",
      brochure: "harvard_brochure.pdf",
      utmId: "UTM123456",
      utmMedium: "email",
      utmSource: "newsletter",
      utmCampaign: "summer_2024",
      utmTerm: "college_admission",
      utmContent: "banner_ad",
    },
    2: {
      id: 2,
      role: "Editor",
      name: "MIT",
      username: "mit_official",
      email: "info@mit.edu",
      mobileNo: "+1-617-253-1000",
      country: "USA",
      state: "Massachusetts",
      city: "Boston",
      zipCode: "02139",
      skype: "mit.official",
      collegeType: "Private",
      approvedBy: "AICTE",
      nirfRanking: "1",
      uploadFile: "mit_logo.png",
      brochure: "mit_brochure.pdf",
      utmId: "UTM123457",
      utmMedium: "social",
      utmSource: "facebook",
      utmCampaign: "spring_2024",
      utmTerm: "engineering",
      utmContent: "post_ad",
    },
  };

  return dummyData[collegeId as keyof typeof dummyData] || dummyData[1];
};

export default function ViewCollegePage() {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const params = useParams();
  const [collegeData, setCollegeData] = useState<CollegeData | null>(null);

  useEffect(() => {
    const data = getCollegeData(params.id);
    setCollegeData(data);
  }, [params.id]);

  if (!collegeData) {
    return (
      <div className={`flex items-center justify-center min-h-[400px] ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
        Loading...
      </div>
    );
  }

  const InfoCard = ({ icon: Icon, label, value }: { icon: any; label: string; value: string | React.ReactNode }) => (
    <div className={`p-4 rounded-lg border ${isDarkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
          <Icon className={`w-5 h-5 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-xs font-medium mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
            {label}
          </p>
          <div className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            {value || "—"}
          </div>
        </div>
      </div>
    </div>
  );

  const SectionHeader = ({ title, icon: Icon }: { title: string; icon: any }) => (
    <div className="flex items-center gap-2 mb-6">
      <Icon className={`w-5 h-5 ${isDarkMode ? "text-[#FF5A22]" : "text-[#FF5A22]"}`} />
      <h2 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
        {title}
      </h2>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          View College
        </h1>
        <button
          onClick={() => router.back()}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
            isDarkMode
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-green-100 hover:bg-green-200 text-green-800"
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      {/* College Information Section */}
      <div className={`rounded-xl border p-6 shadow-sm ${isDarkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}`}>
        <SectionHeader title="College Information" icon={Building2} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InfoCard icon={User} label="Role" value={collegeData.role} />
          <InfoCard icon={Building2} label="College Name" value={collegeData.name} />
          <InfoCard icon={User} label="Username" value={collegeData.username} />
          <InfoCard icon={Mail} label="Email" value={collegeData.email} />
          <InfoCard icon={Phone} label="Mobile No" value={collegeData.mobileNo} />
          <InfoCard icon={MapPin} label="Country" value={collegeData.country} />
          <InfoCard icon={MapPin} label="State/Region" value={collegeData.state} />
          <InfoCard icon={MapPin} label="City" value={collegeData.city} />
          <InfoCard icon={MapPin} label="Zip/Postal Code" value={collegeData.zipCode} />
          <InfoCard icon={Phone} label="Skype" value={collegeData.skype} />
          <InfoCard icon={Building2} label="College Type" value={collegeData.collegeType} />
          <InfoCard icon={Award} label="Approved By" value={collegeData.approvedBy} />
        </div>

        {/* Additional Information */}
        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <InfoCard icon={Award} label="NIRF Ranking" value={collegeData.nirfRanking} />
            <InfoCard 
              icon={FileText} 
              label="Upload File" 
              value={collegeData.uploadFile ? (
                <a 
                  href="#" 
                  className={`text-[#FF5A22] hover:underline ${isDarkMode ? "text-[#FF5A22]" : "text-[#FF5A22]"}`}
                >
                  {collegeData.uploadFile}
                </a>
              ) : "—"} 
            />
            <InfoCard 
              icon={FileText} 
              label="Brochure" 
              value={collegeData.brochure ? (
                <a 
                  href="#" 
                  className={`text-[#FF5A22] hover:underline ${isDarkMode ? "text-[#FF5A22]" : "text-[#FF5A22]"}`}
                >
                  {collegeData.brochure}
                </a>
              ) : "—"} 
            />
          </div>
        </div>
      </div>

      {/* UTM Details Section */}
      <div className={`rounded-xl border p-6 shadow-sm ${isDarkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}`}>
        <SectionHeader title="UTM Details" icon={Tag} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InfoCard icon={Tag} label="UTM ID" value={collegeData.utmId} />
          <InfoCard icon={Tag} label="UTM Medium" value={collegeData.utmMedium} />
          <InfoCard icon={Tag} label="UTM Source" value={collegeData.utmSource} />
          <InfoCard icon={Tag} label="UTM Campaign" value={collegeData.utmCampaign} />
          <InfoCard icon={Tag} label="UTM Term" value={collegeData.utmTerm} />
          <InfoCard icon={Tag} label="UTM Content" value={collegeData.utmContent} />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-4">
        <button
          onClick={() => router.back()}
          className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
            isDarkMode
              ? "bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200"
          }`}
        >
          Back
        </button>
        <button
          onClick={() => router.push(`/admin/colleges/edit/${collegeData.id}`)}
          className="px-6 py-2.5 rounded-lg font-medium transition-all duration-200 bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white"
        >
          Edit College
        </button>
      </div>
    </motion.div>
  );
}

