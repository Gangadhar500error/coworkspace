"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, X, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { useTheme } from "../../../_components/ThemeProvider";
import { PropertyFormData, Property } from "@/types/property";
import { getPropertyById } from "@/data/properties";
import BasicInfoSection from "@/app/admin/property-listings/add/components/BasicInfoSection";
import LocationSection from "@/app/admin/property-listings/add/components/LocationSection";
import MediaSection from "@/app/admin/property-listings/add/components/MediaSection";
import AvailabilitySection from "@/app/admin/property-listings/add/components/AvailabilitySection";
import ContactSection from "@/app/admin/property-listings/add/components/ContactSection";
import LegalSection from "@/app/admin/property-listings/add/components/LegalSection";
import AmenitiesSection from "@/app/admin/property-listings/add/components/AmenitiesSection";
import TypeSpecificFields from "@/app/admin/property-listings/add/components/TypeSpecificFields";
import AdminSection from "@/app/admin/property-listings/add/components/AdminSection";
import SEOSection from "@/app/admin/property-listings/add/components/SEOSection";
import FormSidebar, { sections } from "@/app/admin/property-listings/add/components/FormSidebar";
import { validateSection, validateForm, ValidationErrors } from "@/app/admin/property-listings/add/utils/validation";

export default function ManagerEditPropertyPage() {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const params = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("basic");
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [propertyId, setPropertyId] = useState<number | null>(null);

  const [formData, setFormData] = useState<PropertyFormData>({
    propertyName: "",
    workspaceType: "",
    brandOperatorName: "",
    shortDescription: "",
    detailedDescription: "",
    country: "",
    state: "",
    city: "",
    areaLocality: "",
    fullAddress: "",
    pincode: "",
    googleMapLink: "",
    latitude: "",
    longitude: "",
    coverImage: null,
    galleryImages: [],
    floorPlan: null,
    videoLink: "",
    openingTime: "",
    closingTime: "",
    workingDays: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    },
    available24x7: "no",
    contactPersonName: "",
    phoneNumber: "",
    emailId: "",
    gstRegistered: "no",
    gstNumber: "",
    wifi: "no",
    acNonAc: "",
    powerBackup: "no",
    lift: "no",
    parking: "no",
    securityCctv: "no",
    pantryCafeteria: "no",
    totalSeats: "",
    hotDesksCount: "",
    dedicatedDesksCount: "",
    dailyPrice: "",
    weeklyPrice: "",
    monthlyPrice: "",
    minimumBookingDuration: "",
    officeSizes: [],
    numberOfCabins: "",
    privateOfficeMonthlyRent: "",
    securityDeposit: "",
    furnished: "no",
    privateAccess: "no",
    roomName: "",
    seatingCapacity: "",
    roomLayout: "",
    hourlyPrice: "",
    halfDayPrice: "",
    fullDayPrice: "",
    projectorTv: "no",
    whiteboard: "no",
    videoConferencing: "no",
    businessAddress: "",
    virtualOfficeCity: "",
    addressProofProvided: "no",
    gstRegistrationSupport: "no",
    mailHandling: "no",
    virtualOfficeMonthlyPrice: "",
    yearlyPrice: "",
    propertyStatus: "draft",
    verificationStatus: "pending",
    featuredProperty: "no",
    priorityRanking: "",
    seoTitle: "",
    seoDescription: "",
  });

  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [floorPlanPreview, setFloorPlanPreview] = useState<string | null>(null);

  useEffect(() => {
    const propertyIdParam = params.id as string;
    if (propertyIdParam) {
      const property = getPropertyById(parseInt(propertyIdParam));
      if (property) {
        setPropertyId(property.id);
        setFormData({
          propertyName: property.propertyName || "",
          workspaceType: property.workspaceType || "",
          brandOperatorName: property.brandOperatorName || "",
          shortDescription: property.shortDescription || "",
          detailedDescription: property.detailedDescription || "",
          country: property.country || "",
          state: property.state || "",
          city: property.city || "",
          areaLocality: property.areaLocality || "",
          fullAddress: property.fullAddress || "",
          pincode: property.pincode || "",
          googleMapLink: property.googleMapLink || "",
          latitude: property.latitude?.toString() || "",
          longitude: property.longitude?.toString() || "",
          coverImage: null,
          galleryImages: [],
          floorPlan: null,
          videoLink: property.videoLink || "",
          openingTime: property.openingTime || "",
          closingTime: property.closingTime || "",
          workingDays: {
            monday: property.workingDays?.monday || false,
            tuesday: property.workingDays?.tuesday || false,
            wednesday: property.workingDays?.wednesday || false,
            thursday: property.workingDays?.thursday || false,
            friday: property.workingDays?.friday || false,
            saturday: property.workingDays?.saturday || false,
            sunday: property.workingDays?.sunday || false,
          },
          available24x7: property.available24x7 || "no",
          contactPersonName: property.contactPersonName || "",
          phoneNumber: property.phoneNumber || "",
          emailId: property.emailId || "",
          gstRegistered: property.gstRegistered || "no",
          gstNumber: property.gstNumber || "",
          wifi: property.amenities?.wifi || "no",
          acNonAc: property.amenities?.acNonAc === "ac" ? "ac" : property.amenities?.acNonAc === "non-ac" ? "non-ac" : "",
          powerBackup: property.amenities?.powerBackup || "no",
          lift: property.amenities?.lift || "no",
          parking: property.amenities?.parking || "no",
          securityCctv: property.amenities?.securityCctv || "no",
          pantryCafeteria: property.amenities?.pantryCafeteria || "no",
          totalSeats: property.coworkingFields?.totalSeats?.toString() || "",
          hotDesksCount: property.coworkingFields?.hotDesksCount?.toString() || "",
          dedicatedDesksCount: property.coworkingFields?.dedicatedDesksCount?.toString() || "",
          dailyPrice: property.coworkingFields?.dailyPrice?.toString() || "",
          weeklyPrice: property.coworkingFields?.weeklyPrice?.toString() || "",
          monthlyPrice: property.coworkingFields?.monthlyPrice?.toString() || "",
          minimumBookingDuration: property.coworkingFields?.minimumBookingDuration || "",
          officeSizes: property.privateOfficeFields?.officeSizes || [],
          numberOfCabins: property.privateOfficeFields?.numberOfCabins?.toString() || "",
          privateOfficeMonthlyRent: property.privateOfficeFields?.monthlyRent?.toString() || "",
          securityDeposit: property.privateOfficeFields?.securityDeposit?.toString() || "",
          furnished: property.privateOfficeFields?.furnished || "no",
          privateAccess: property.privateOfficeFields?.privateAccess || "no",
          roomName: property.meetingRoomFields?.roomName || "",
          seatingCapacity: property.meetingRoomFields?.seatingCapacity?.toString() || "",
          roomLayout: property.meetingRoomFields?.roomLayout || "",
          hourlyPrice: property.meetingRoomFields?.hourlyPrice?.toString() || "",
          halfDayPrice: property.meetingRoomFields?.halfDayPrice?.toString() || "",
          fullDayPrice: property.meetingRoomFields?.fullDayPrice?.toString() || "",
          projectorTv: property.meetingRoomFields?.projectorTv || "no",
          whiteboard: property.meetingRoomFields?.whiteboard || "no",
          videoConferencing: property.meetingRoomFields?.videoConferencing || "no",
          businessAddress: property.virtualOfficeFields?.businessAddress || "",
          virtualOfficeCity: property.virtualOfficeFields?.city || "",
          addressProofProvided: property.virtualOfficeFields?.addressProofProvided || "no",
          gstRegistrationSupport: property.virtualOfficeFields?.gstRegistrationSupport || "no",
          mailHandling: property.virtualOfficeFields?.mailHandling || "no",
          virtualOfficeMonthlyPrice: property.virtualOfficeFields?.monthlyPrice?.toString() || "",
          yearlyPrice: property.virtualOfficeFields?.yearlyPrice?.toString() || "",
          propertyStatus: property.propertyStatus || "draft",
          verificationStatus: property.verificationStatus || "pending",
          featuredProperty: property.featuredProperty || "no",
          priorityRanking: property.priorityRanking?.toString() || "",
          seoTitle: property.seoTitle || "",
          seoDescription: property.seoDescription || "",
        });

        if (property.coverImage) {
          setCoverImagePreview(property.coverImage);
        }
        if (property.galleryImages && property.galleryImages.length > 0) {
          setGalleryPreviews(property.galleryImages);
        }
        if (property.floorPlan) {
          setFloorPlanPreview(property.floorPlan);
        }
      } else {
        router.push("/manager/property-listing");
      }
      setLoading(false);
    }
  }, [params.id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setTouchedFields((prev) => new Set(prev).add(name));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleWorkingDayChange = (day: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      workingDays: {
        ...prev.workingDays,
        [day]: checked,
      },
    }));
  };

  const handleOfficeSizeChange = (size: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      officeSizes: checked
        ? [...prev.officeSizes, size]
        : prev.officeSizes.filter((s) => s !== size),
    }));
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked ? "yes" : "no",
    }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "coverImage" | "galleryImages" | "floorPlan"
  ) => {
    const files = e.target.files;
    if (!files) return;

    if (type === "coverImage" && files[0]) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, coverImage: file }));
      const reader = new FileReader();
      reader.onloadend = () => setCoverImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else if (type === "galleryImages") {
      const newFiles = Array.from(files);
      setFormData((prev) => ({
        ...prev,
        galleryImages: [...prev.galleryImages, ...newFiles].slice(0, 20),
      }));
      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () =>
          setGalleryPreviews((prev) => [...prev, reader.result as string]);
        reader.readAsDataURL(file);
      });
    } else if (type === "floorPlan" && files[0]) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, floorPlan: file }));
      const reader = new FileReader();
      reader.onloadend = () => setFloorPlanPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveCoverImage = () => {
    setFormData((prev) => ({ ...prev, coverImage: null }));
    setCoverImagePreview(null);
  };

  const handleRemoveFloorPlan = () => {
    setFormData((prev) => ({ ...prev, floorPlan: null }));
    setFloorPlanPreview(null);
  };

  const removeGalleryImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, i) => i !== index),
    }));
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    const sectionErrors = validateSection(activeSection, formData);
    if (Object.keys(sectionErrors).length > 0) {
      setErrors(sectionErrors);
      const firstErrorField = Object.keys(sectionErrors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
        (errorElement as HTMLElement).focus();
      }
      return;
    }
    setErrors({});
    const currentIndex = sections.findIndex((s) => s.id === activeSection);
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    const currentIndex = sections.findIndex((s) => s.id === activeSection);
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1].id);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      const firstErrorField = Object.keys(formErrors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
      if (errorElement) {
        const sectionMap: { [key: string]: string } = {
          propertyName: "basic",
          workspaceType: "basic",
          country: "location",
          state: "location",
          city: "location",
          areaLocality: "location",
          fullAddress: "location",
          contactPersonName: "contact",
          phoneNumber: "contact",
          emailId: "contact",
          gstNumber: "legal",
          totalSeats: "typeSpecific",
          dailyPrice: "typeSpecific",
          monthlyPrice: "typeSpecific",
          privateOfficeMonthlyRent: "typeSpecific",
          roomName: "typeSpecific",
          seatingCapacity: "typeSpecific",
          hourlyPrice: "typeSpecific",
          businessAddress: "typeSpecific",
          virtualOfficeCity: "typeSpecific",
          virtualOfficeMonthlyPrice: "typeSpecific",
          propertyStatus: "admin",
          verificationStatus: "admin",
        };
        const section = sectionMap[firstErrorField];
        if (section) {
          setActiveSection(section);
          setTimeout(() => {
            errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
            (errorElement as HTMLElement).focus();
          }, 100);
        }
      }
      return;
    }
    setIsSubmitting(true);
    console.log("Updated property data:", formData);
    console.log("Property ID:", propertyId);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/manager/property-listing");
    }, 1000);
  };

  const isFirstSection = activeSection === sections[0].id;
  const isLastSection = activeSection === sections[sections.length - 1].id;

  const renderActiveSection = () => {
    switch (activeSection) {
      case "basic":
        return <BasicInfoSection formData={formData} onChange={handleChange} errors={errors} isDarkMode={isDarkMode} />;
      case "location":
        return <LocationSection formData={formData} onChange={handleChange} errors={errors} isDarkMode={isDarkMode} />;
      case "media":
        return (
          <MediaSection
            formData={formData}
            onFileChange={handleFileChange}
            onRemoveGalleryImage={removeGalleryImage}
            onRemoveCoverImage={handleRemoveCoverImage}
            onRemoveFloorPlan={handleRemoveFloorPlan}
            onVideoLinkChange={handleChange}
            coverImagePreview={coverImagePreview}
            galleryPreviews={galleryPreviews}
            floorPlanPreview={floorPlanPreview}
            isDarkMode={isDarkMode}
          />
        );
      case "availability":
        return (
          <AvailabilitySection
            formData={formData}
            onChange={handleChange}
            onWorkingDayChange={handleWorkingDayChange}
            isDarkMode={isDarkMode}
          />
        );
      case "contact":
        return <ContactSection formData={formData} onChange={handleChange} errors={errors} isDarkMode={isDarkMode} />;
      case "legal":
        return <LegalSection formData={formData} onChange={handleChange} errors={errors} isDarkMode={isDarkMode} />;
      case "amenities":
        return <AmenitiesSection formData={formData} onChange={handleChange} isDarkMode={isDarkMode} />;
      case "typeSpecific":
        return (
          <TypeSpecificFields
            formData={formData}
            onChange={handleChange}
            onOfficeSizeChange={handleOfficeSizeChange}
            onCheckboxChange={handleCheckboxChange}
            errors={errors}
            isDarkMode={isDarkMode}
          />
        );
      case "admin":
        return <AdminSection formData={formData} onChange={handleChange} errors={errors} isDarkMode={isDarkMode} />;
      case "seo":
        return <SEOSection formData={formData} onChange={handleChange} isDarkMode={isDarkMode} />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? "bg-gray-950" : "bg-gray-50"}`}>
        <div className="text-center">
          <div className={`inline-block animate-spin rounded-full h-12 w-12 border-b-2 ${isDarkMode ? "border-white" : "border-gray-900"}`}></div>
          <p className={`mt-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Loading property data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-950" : "bg-gray-50"}`}>
      <div className={`border-b ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-1 md:py-3">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => router.push("/manager/property-listing")}
              className={`p-2 rounded-lg transition-all ${
                isDarkMode
                  ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                  : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className={`text-base md:text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Edit Property
              </h1>
              <p className={`text-xs md:text-sm mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Step {sections.findIndex((s) => s.id === activeSection) + 1} of {sections.length}: {sections.find((s) => s.id === activeSection)?.label}
              </p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <div className={`sticky top-6 rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
                <FormSidebar activeSection={activeSection} onSectionChange={setActiveSection} isDarkMode={isDarkMode} />
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
                <div className="p-4 md:p-6 space-y-6">
                  {Object.keys(errors).length > 0 && (
                    <div className={`p-4 rounded-lg border flex items-start gap-3 ${
                      isDarkMode 
                        ? "bg-red-500/10 border-red-500/30 text-red-400" 
                        : "bg-red-50 border-red-200 text-red-600"
                    }`}>
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">Please fix the following errors:</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          {Object.values(errors).map((error, index) => (
                            <li key={index}>{error}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {renderActiveSection()}
                </div>

                <div className={`px-4 md:px-6 py-4 border-t flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 ${isDarkMode ? "border-gray-800 bg-gray-800/50" : "border-gray-200 bg-gray-50"}`}>
                  <div className="flex items-center gap-3">
                    {!isFirstSection && (
                      <button
                        type="button"
                        onClick={handlePrevious}
                        className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                          isDarkMode
                            ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                        }`}
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </button>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => router.push("/manager/property-listing")}
                      className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${
                        isDarkMode
                          ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                          : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <X className="w-4 h-4" />
                        Cancel
                      </div>
                    </button>
                    
                    {isLastSection ? (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                          isSubmitting
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        } ${
                          isDarkMode
                            ? "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white shadow-lg shadow-[#FF5A22]/20"
                            : "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white shadow-md hover:shadow-lg"
                        }`}
                      >
                        <Save className="w-4 h-4" />
                        {isSubmitting ? "Updating..." : "Update Property"}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleNext}
                        className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                          isDarkMode
                            ? "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white shadow-lg shadow-[#FF5A22]/20"
                            : "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white shadow-md hover:shadow-lg"
                        }`}
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

