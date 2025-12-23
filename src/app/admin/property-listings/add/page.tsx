"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, X, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { useTheme } from "../../_components/ThemeProvider";
import { PropertyFormData } from "@/types/property";
import BasicInfoSection from "./components/BasicInfoSection";
import LocationSection from "./components/LocationSection";
import MediaSection from "./components/MediaSection";
import AvailabilitySection from "./components/AvailabilitySection";
import ContactSection from "./components/ContactSection";
import LegalSection from "./components/LegalSection";
import AmenitiesSection from "./components/AmenitiesSection";
import TypeSpecificFields from "./components/TypeSpecificFields";
import AdminSection from "./components/AdminSection";
import SEOSection from "./components/SEOSection";
import FormSidebar, { sections } from "./components/FormSidebar";
import { validateSection, validateForm, ValidationErrors } from "./utils/validation";

export default function AddPropertyPage() {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState("basic");
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const [formData, setFormData] = useState<PropertyFormData>({
    // Section 1: Basic Property Info
    propertyName: "",
    workspaceType: "",
    brandOperatorName: "",
    shortDescription: "",
    detailedDescription: "",
    
    // Section 2: Location Details
    country: "",
    state: "",
    city: "",
    areaLocality: "",
    fullAddress: "",
    pincode: "",
    googleMapLink: "",
    latitude: "",
    longitude: "",
    
    // Section 3: Media Uploads
    coverImage: null,
    galleryImages: [],
    floorPlan: null,
    videoLink: "",
    
    // Section 4: Availability & Timings
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
    
    // Section 5: Contact Details
    contactPersonName: "",
    phoneNumber: "",
    emailId: "",
    
    // Section 6: Legal & Compliance
    gstRegistered: "no",
    gstNumber: "",
    
    // Section 7: Common Amenities
    wifi: "no",
    acNonAc: "",
    powerBackup: "no",
    lift: "no",
    parking: "no",
    securityCctv: "no",
    pantryCafeteria: "no",
    
    // Section 8: Type-Specific Fields
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
    
    // Section 9: Admin Controls
    propertyStatus: "draft",
    verificationStatus: "pending",
    featuredProperty: "no",
    priorityRanking: "",
    
    // Section 10: SEO
    seoTitle: "",
    seoDescription: "",
  });

  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [floorPlanPreview, setFloorPlanPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Mark field as touched
    setTouchedFields((prev) => new Set(prev).add(name));
    
    // Clear error for this field when user starts typing
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate entire form
    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      // Scroll to first error
      const firstErrorField = Object.keys(formErrors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
      if (errorElement) {
        // Find which section contains this field
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
    console.log("Property data:", formData);
    console.log("Required fields validation passed");
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/admin/property-listings");
    }, 1000);
  };

  const handleNext = () => {
    // Validate current section before moving to next
    const sectionErrors = validateSection(activeSection, formData);
    
    if (Object.keys(sectionErrors).length > 0) {
      setErrors(sectionErrors);
      // Scroll to first error
      const firstErrorField = Object.keys(sectionErrors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
        (errorElement as HTMLElement).focus();
      }
      return;
    }
    
    // Clear errors for current section
    setErrors({});
    
    // Move to next section
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

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-950" : "bg-gray-50"}`}>
      {/* Header */}
      <div className={`border-b ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-1 md:py-3">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => router.push("/admin/property-listings")}
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
                Add New Property
              </h1>
              <p className={`text-xs md:text-sm mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Step {sections.findIndex((s) => s.id === activeSection) + 1} of {sections.length}: {sections.find((s) => s.id === activeSection)?.label}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className={`sticky top-6 rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
                <FormSidebar activeSection={activeSection} onSectionChange={setActiveSection} isDarkMode={isDarkMode} />
              </div>
            </div>

            {/* Main Form Content */}
            <div className="lg:col-span-3">
              <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
                <div className="p-4 md:p-6 space-y-6">
                  {/* Validation Error Banner */}
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

                {/* Form Actions */}
                <div className={`px-4 md:px-6 py-4 border-t flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 ${isDarkMode ? "border-gray-800 bg-gray-800/50" : "border-gray-200 bg-gray-50"}`}>
                  <div className="flex items-center gap-3">
                    {/* Previous Button - Show if not first section */}
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
                    {/* Cancel Button */}
                    <button
                      type="button"
                      onClick={() => router.push("/admin/property-listings")}
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
                    
                    {/* Next or Submit Button */}
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
                        {isSubmitting ? "Creating..." : "Create Property"}
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
