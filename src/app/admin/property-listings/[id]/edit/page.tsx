"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from "../../../_components/ThemeProvider";
import {
  ArrowLeft,
  Save,
  X,
  Upload,
  Image as ImageIcon,
  MapPin,
  Building2,
  Home,
  DollarSign,
  Calendar,
  FileText,
  Plus,
  Trash2,
  Video,
  Link as LinkIcon,
  Tag,
  CheckSquare,
  Square,
  User,
  Phone,
  Mail,
  Clock,
  Wifi,
  Monitor,
  Users,
  Briefcase,
  PhoneCall,
  Shield,
  Coffee,
  Car,
  Lock,
  Printer,
  Mail as MailIcon,
  Waves,
} from "lucide-react";
import Image from "next/image";
import { mockPropertyManagers } from "@/data/property-managers";
import { ConferenceRoom } from "@/types/property";
import { getPropertyBySlug } from "@/data/properties";

const PROPERTY_TYPES = ["Residential", "Commercial", "Industrial", "Land", "Other", "Cowork Space"] as const;
const LISTING_TYPES = ["Sale", "Rent", "Lease"] as const;
const STATUS_OPTIONS = ["Available", "Sold", "Rented", "Pending", "Off Market"] as const;
const CURRENCIES = ["USD", "EUR", "GBP", "CAD", "AUD"] as const;
const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;

export default function EditPropertyPage() {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const params = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("basic");

  const [formData, setFormData] = useState({
    // Basic Details
    title: "",
    area: "",
    description: "",
    isApproved: "no" as "yes" | "no",
    
    // Address
    address: "",
    latitude: "",
    longitude: "",
    
    // Workspace Types
    coworking: false,
    meetingRooms: false,
    virtualOffice: false,
    privateOffice: false,
    
    // Workspace Counts
    numberOfPrivateOffices: "",
    numberOfMeetingRooms: "",
    
    // Conference Rooms
    conferenceRooms: [] as ConferenceRoom[],
    
    // Amenities
    highSpeedWifi: false,
    projectorLed: false,
    eventsWorkshops: false,
    phoneBooth: false,
    accessControl: false,
    receptionDesk: false,
    scannerPrinter: false,
    cafeKitchen: false,
    parking: false,
    securitySystem: false,
    mailService: false,
    swimming: false,
    
    // Open Hours
    mondayFrom: "",
    mondayTo: "",
    tuesdayFrom: "",
    tuesdayTo: "",
    wednesdayFrom: "",
    wednesdayTo: "",
    thursdayFrom: "",
    thursdayTo: "",
    fridayFrom: "",
    fridayTo: "",
    saturdayFrom: "",
    saturdayTo: "",
    sundayFrom: "",
    sundayTo: "",
    
    // Contact Details
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    
    // Invoice Details
    companyName: "",
    billingAddress: "",
    
    // Media
    coverImage: null as File | null,
    images: [] as File[],
  });

  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);
  const [newConferenceRoom, setNewConferenceRoom] = useState({
    name: "",
    availableSeats: "",
    pricePerHour: "",
    pricePerDay: "",
  });

  // Load existing property data
  useEffect(() => {
    const slug = params.id as string;
    const property = getPropertyBySlug(slug);
    
    if (property) {
      setFormData({
        title: property.title || "",
        area: property.area?.toString() || "",
        description: property.description || "",
        isApproved: property.isApproved ? "yes" : "no",
        address: property.address || "",
        latitude: property.latitude?.toString() || "",
        longitude: property.longitude?.toString() || "",
        coworking: property.workspaceTypes?.coworking || false,
        meetingRooms: property.workspaceTypes?.meetingRooms || false,
        virtualOffice: property.workspaceTypes?.virtualOffice || false,
        privateOffice: property.workspaceTypes?.privateOffice || false,
        numberOfPrivateOffices: property.numberOfPrivateOffices?.toString() || "",
        numberOfMeetingRooms: property.numberOfMeetingRooms?.toString() || "",
        conferenceRooms: property.conferenceRooms || [],
        highSpeedWifi: property.coworkAmenities?.highSpeedWifi || false,
        projectorLed: property.coworkAmenities?.projectorLed || false,
        eventsWorkshops: property.coworkAmenities?.eventsWorkshops || false,
        phoneBooth: property.coworkAmenities?.phoneBooth || false,
        accessControl: property.coworkAmenities?.accessControl || false,
        receptionDesk: property.coworkAmenities?.receptionDesk || false,
        scannerPrinter: property.coworkAmenities?.scannerPrinter || false,
        cafeKitchen: property.coworkAmenities?.cafeKitchen || false,
        parking: property.coworkAmenities?.parking || false,
        securitySystem: property.coworkAmenities?.securitySystem || false,
        mailService: property.coworkAmenities?.mailService || false,
        swimming: property.coworkAmenities?.swimming || false,
        mondayFrom: property.openHours?.monday?.from || "",
        mondayTo: property.openHours?.monday?.to || "",
        tuesdayFrom: property.openHours?.tuesday?.from || "",
        tuesdayTo: property.openHours?.tuesday?.to || "",
        wednesdayFrom: property.openHours?.wednesday?.from || "",
        wednesdayTo: property.openHours?.wednesday?.to || "",
        thursdayFrom: property.openHours?.thursday?.from || "",
        thursdayTo: property.openHours?.thursday?.to || "",
        fridayFrom: property.openHours?.friday?.from || "",
        fridayTo: property.openHours?.friday?.to || "",
        saturdayFrom: property.openHours?.saturday?.from || "",
        saturdayTo: property.openHours?.saturday?.to || "",
        sundayFrom: property.openHours?.sunday?.from || "",
        sundayTo: property.openHours?.sunday?.to || "",
        contactName: property.contactName || "",
        contactEmail: property.contactEmail || "",
        contactPhone: property.contactPhone || "",
        companyName: property.companyName || "",
        billingAddress: property.billingAddress || "",
        coverImage: null,
        images: [],
      });
      
      if (property.coverImage) {
        setCoverImagePreview(property.coverImage);
      }
      if (property.images && property.images.length > 0) {
        setExistingImageUrls(property.images);
        setImagePreviews(property.images);
      }
    }
    setLoading(false);
  }, [params.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        coverImage: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newFiles = [...formData.images, ...files].slice(0, 20);
      setFormData((prev) => ({
        ...prev,
        images: newFiles,
      }));
      
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      images: newImages,
    }));
    setImagePreviews(newPreviews);
  };

  const handleRemoveCoverImage = () => {
    setFormData((prev) => ({
      ...prev,
      coverImage: null,
    }));
    setCoverImagePreview(null);
  };

  const handleAddConferenceRoom = () => {
    if (newConferenceRoom.name && newConferenceRoom.availableSeats && newConferenceRoom.pricePerHour) {
      setFormData((prev) => ({
        ...prev,
        conferenceRooms: [
          ...prev.conferenceRooms,
          {
            name: newConferenceRoom.name,
            availableSeats: parseInt(newConferenceRoom.availableSeats),
            pricePerHour: parseFloat(newConferenceRoom.pricePerHour),
            pricePerDay: parseFloat(newConferenceRoom.pricePerDay) || 0,
          },
        ],
      }));
      setNewConferenceRoom({
        name: "",
        availableSeats: "",
        pricePerHour: "",
        pricePerDay: "",
      });
    }
  };

  const handleRemoveConferenceRoom = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      conferenceRooms: prev.conferenceRooms.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Cowork Space updated:", formData);
      setIsSubmitting(false);
      router.push("/admin/property-listings");
    }, 1000);
  };

  const handleCancel = () => {
    router.push("/admin/property-listings");
  };

  const sections = [
    { id: "basic", label: "Basic Details", icon: Building2 },
    { id: "address", label: "Address", icon: MapPin },
    { id: "workspace-types", label: "Workspace Types", icon: Briefcase },
    { id: "workspace-counts", label: "Workspace Counts", icon: Users },
    { id: "pricing", label: "Pricing & Capacity", icon: DollarSign },
    { id: "amenities", label: "Amenities", icon: CheckSquare },
    { id: "hours", label: "Open Hours", icon: Clock },
    { id: "images", label: "Images", icon: ImageIcon },
    { id: "contact", label: "Contact Details", icon: Phone },
    { id: "invoice", label: "Invoice Details", icon: FileText },
  ];

  return (
    <div className="py-6 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={handleCancel}
            className={`p-2 rounded-lg transition-all ${
              isDarkMode
                ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Edit Cowork Space
            </h1>
            <p className={`mt-1 md:mt-2 text-xs md:text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Update cowork space property listing details
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className={`sticky top-6 rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
              <div className="p-4 space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? isDarkMode
                            ? "bg-[#FF5A22] text-white"
                            : "bg-[#FF5A22] text-white"
                          : isDarkMode
                          ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {section.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Form Content */}
          <div className="lg:col-span-3">
            <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
              <div className="p-4 md:p-6 space-y-6">
                {/* 🏢 Property Basic Details */}
                {activeSection === "basic" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <h2 className={`text-lg font-semibold pb-2 border-b flex items-center gap-2 ${isDarkMode ? "border-gray-800 text-white" : "border-gray-200 text-gray-900"}`}>
                      <Building2 className="w-5 h-5 text-[#FF5A22]" />
                      Property Basic Details
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Property Name */}
                      <div className="space-y-2 md:col-span-2">
                        <label className={`flex items-center gap-2 text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          <FileText className="w-4 h-4 text-[#FF5A22]" />
                          Property Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          required
                          className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
                            isDarkMode
                              ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                              : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                          }`}
                          placeholder="e.g., Downtown Cowork Space"
                        />
                      </div>

                      {/* Area */}
                      <div className="space-y-2">
                        <label className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          Area (in sq.ft.)
                        </label>
                        <input
                          type="number"
                          name="area"
                          value={formData.area}
                          onChange={handleChange}
                          min="0"
                          className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
                            isDarkMode
                              ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                              : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                          }`}
                          placeholder="Enter area in sq.ft."
                        />
                      </div>

                      {/* Is Approved */}
                      <div className="space-y-2">
                        <label className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          Is Approved <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="isApproved"
                          value={formData.isApproved}
                          onChange={handleChange}
                          required
                          className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
                            isDarkMode
                              ? "bg-gray-800 border-gray-700 text-white focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                              : "bg-white border-gray-300 text-gray-900 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                          }`}
                        >
                          <option value="no">No</option>
                          <option value="yes">Yes</option>
                        </select>
                      </div>

                      {/* Description */}
                      <div className="space-y-2 md:col-span-2">
                        <label className={`flex items-center gap-2 text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          <FileText className="w-4 h-4 text-indigo-500" />
                          Description
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          rows={6}
                          className={`w-full px-4 py-2.5 rounded-lg border transition-all resize-none ${
                            isDarkMode
                              ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                              : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                          }`}
                          placeholder="Describe the cowork space in detail..."
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 📍 Property Address */}
                {activeSection === "address" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <h2 className={`text-lg font-semibold pb-2 border-b flex items-center gap-2 ${isDarkMode ? "border-gray-800 text-white" : "border-gray-200 text-gray-900"}`}>
                      <MapPin className="w-5 h-5 text-[#FF5A22]" />
                      Property Address
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Property Address */}
                      <div className="space-y-2 md:col-span-2">
                        <label className={`flex items-center gap-2 text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          <MapPin className="w-4 h-4 text-red-500" />
                          Property Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                          className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
                            isDarkMode
                              ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                              : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                          }`}
                          placeholder="Enter full property address"
                        />
                      </div>

                      {/* Map Location */}
                      <div className="space-y-2 md:col-span-2">
                        <label className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          Map Location (drag marker to set position)
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                              Latitude
                            </label>
                            <input
                              type="text"
                              name="latitude"
                              value={formData.latitude}
                              onChange={handleChange}
                              className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
                                isDarkMode
                                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                              }`}
                              placeholder="e.g., 40.7128"
                            />
                          </div>
                          <div>
                            <label className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                              Longitude
                            </label>
                            <input
                              type="text"
                              name="longitude"
                              value={formData.longitude}
                              onChange={handleChange}
                              className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
                                isDarkMode
                                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                              }`}
                              placeholder="e.g., -74.0060"
                            />
                          </div>
                        </div>
                        <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                          Drag marker on map to set location coordinates
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 🧩 Workspace Types Available */}
                {activeSection === "workspace-types" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <h2 className={`text-lg font-semibold pb-2 border-b flex items-center gap-2 ${isDarkMode ? "border-gray-800 text-white" : "border-gray-200 text-gray-900"}`}>
                      <Briefcase className="w-5 h-5 text-[#FF5A22]" />
                      Workspace Types Available
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { key: "coworking", label: "Coworking", icon: Users },
                        { key: "meetingRooms", label: "Meeting Rooms", icon: Building2 },
                        { key: "virtualOffice", label: "Virtual Office", icon: PhoneCall },
                        { key: "privateOffice", label: "Private Office", icon: Home },
                      ].map(({ key, label, icon: Icon }) => (
                        <label
                          key={key}
                          className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                            formData[key as keyof typeof formData]
                              ? isDarkMode
                                ? "bg-[#FF5A22]/10 border-[#FF5A22] text-[#FF5A22]"
                                : "bg-[#FF5A22]/5 border-[#FF5A22] text-[#FF5A22]"
                              : isDarkMode
                              ? "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <input
                            type="checkbox"
                            name={key}
                            checked={formData[key as keyof typeof formData] as boolean}
                            onChange={handleChange}
                            className="w-4 h-4 rounded border-gray-300 text-[#FF5A22] focus:ring-[#FF5A22]"
                          />
                          <Icon className="w-5 h-5" />
                          <span className="text-sm font-medium">{label}</span>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* 🔢 Workspace Counts */}
                {activeSection === "workspace-counts" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <h2 className={`text-lg font-semibold pb-2 border-b flex items-center gap-2 ${isDarkMode ? "border-gray-800 text-white" : "border-gray-200 text-gray-900"}`}>
                      <Users className="w-5 h-5 text-[#FF5A22]" />
                      Workspace Counts
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Number of Private Offices */}
                      <div className="space-y-2">
                        <label className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          Number of Private Offices
                        </label>
                        <input
                          type="number"
                          name="numberOfPrivateOffices"
                          value={formData.numberOfPrivateOffices}
                          onChange={handleChange}
                          min="0"
                          className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
                            isDarkMode
                              ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                              : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                          }`}
                          placeholder="Enter number of private offices"
                        />
                      </div>

                      {/* Number of Meeting/Conference Rooms */}
                      <div className="space-y-2">
                        <label className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          Number of Meeting / Conference Rooms
                        </label>
                        <input
                          type="number"
                          name="numberOfMeetingRooms"
                          value={formData.numberOfMeetingRooms}
                          onChange={handleChange}
                          min="0"
                          className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
                            isDarkMode
                              ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                              : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                          }`}
                          placeholder="Enter number of meeting rooms"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 🪑 Workspace Pricing & Capacity */}
                {activeSection === "pricing" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <h2 className={`text-lg font-semibold pb-2 border-b flex items-center gap-2 ${isDarkMode ? "border-gray-800 text-white" : "border-gray-200 text-gray-900"}`}>
                      <DollarSign className="w-5 h-5 text-[#FF5A22]" />
                      Workspace Pricing & Capacity
                    </h2>

                    {/* Conference Rooms List */}
                    {formData.conferenceRooms.length > 0 && (
                      <div className="space-y-3">
                        <label className={`text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          Conference Rooms
                        </label>
                        {formData.conferenceRooms.map((room, index) => (
                          <div
                            key={index}
                            className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                  {room.name}
                                </h4>
                                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                  {room.availableSeats} seats
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveConferenceRoom(index)}
                                className={`p-1.5 rounded-lg transition-all ${
                                  isDarkMode
                                    ? "text-red-400 hover:bg-red-500/10"
                                    : "text-red-600 hover:bg-red-50"
                                }`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div>
                                <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>Per Hour:</span>
                                <span className={`ml-2 font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                  ${room.pricePerHour}
                                </span>
                              </div>
                              <div>
                                <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>Per Day:</span>
                                <span className={`ml-2 font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                  ${room.pricePerDay}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add Conference Room Form */}
                    <div className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
                      <h3 className={`text-sm font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        Add Conference Room
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                            Conference Room Name
                          </label>
                          <input
                            type="text"
                            value={newConferenceRoom.name}
                            onChange={(e) => setNewConferenceRoom({ ...newConferenceRoom, name: e.target.value })}
                            className={`w-full px-4 py-2 rounded-lg border transition-all mt-1 ${
                              isDarkMode
                                ? "bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                                : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                            }`}
                            placeholder="e.g., Conference Room A"
                          />
                        </div>
                        <div>
                          <label className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                            Available Seats <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            value={newConferenceRoom.availableSeats}
                            onChange={(e) => setNewConferenceRoom({ ...newConferenceRoom, availableSeats: e.target.value })}
                            min="1"
                            className={`w-full px-4 py-2 rounded-lg border transition-all mt-1 ${
                              isDarkMode
                                ? "bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                                : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                            }`}
                            placeholder="Number of seats"
                          />
                        </div>
                        <div>
                          <label className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                            Price Per Hour
                          </label>
                          <input
                            type="number"
                            value={newConferenceRoom.pricePerHour}
                            onChange={(e) => setNewConferenceRoom({ ...newConferenceRoom, pricePerHour: e.target.value })}
                            min="0"
                            step="0.01"
                            className={`w-full px-4 py-2 rounded-lg border transition-all mt-1 ${
                              isDarkMode
                                ? "bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                                : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                            }`}
                            placeholder="Price per hour"
                          />
                        </div>
                        <div>
                          <label className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                            Price Per Day
                          </label>
                          <input
                            type="number"
                            value={newConferenceRoom.pricePerDay}
                            onChange={(e) => setNewConferenceRoom({ ...newConferenceRoom, pricePerDay: e.target.value })}
                            min="0"
                            step="0.01"
                            className={`w-full px-4 py-2 rounded-lg border transition-all mt-1 ${
                              isDarkMode
                                ? "bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                                : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                            }`}
                            placeholder="Price per day"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <button
                            type="button"
                            onClick={handleAddConferenceRoom}
                            className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                              isDarkMode
                                ? "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white"
                                : "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white"
                            }`}
                          >
                            <Plus className="w-4 h-4" />
                            Add Conference Room
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 🛠 Amenities */}
                {activeSection === "amenities" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <h2 className={`text-lg font-semibold pb-2 border-b flex items-center gap-2 ${isDarkMode ? "border-gray-800 text-white" : "border-gray-200 text-gray-900"}`}>
                      <CheckSquare className="w-5 h-5 text-[#FF5A22]" />
                      Amenities
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {[
                        { key: "highSpeedWifi", label: "High-Speed WiFi", icon: Wifi },
                        { key: "projectorLed", label: "Projector / LED", icon: Monitor },
                        { key: "eventsWorkshops", label: "Events / Workshops", icon: Users },
                        { key: "phoneBooth", label: "Phone Booth", icon: PhoneCall },
                        { key: "accessControl", label: "Access Control", icon: Lock },
                        { key: "receptionDesk", label: "Reception Desk", icon: Building2 },
                        { key: "scannerPrinter", label: "Scanner / Printer", icon: Printer },
                        { key: "cafeKitchen", label: "Cafe / Kitchen", icon: Coffee },
                        { key: "parking", label: "Parking", icon: Car },
                        { key: "securitySystem", label: "Security System", icon: Shield },
                        { key: "mailService", label: "Mail Service", icon: MailIcon },
                        { key: "swimming", label: "Swimming", icon: Waves },
                      ].map(({ key, label, icon: Icon }) => (
                        <label
                          key={key}
                          className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                            formData[key as keyof typeof formData]
                              ? isDarkMode
                                ? "bg-blue-500/10 border-blue-500 text-blue-400"
                                : "bg-blue-50 border-blue-500 text-blue-600"
                              : isDarkMode
                              ? "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <input
                            type="checkbox"
                            name={key}
                            checked={formData[key as keyof typeof formData] as boolean}
                            onChange={handleChange}
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <Icon className="w-4 h-4" />
                          <span className="text-sm font-medium">{label}</span>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ⏰ Open Hours */}
                {activeSection === "hours" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <h2 className={`text-lg font-semibold pb-2 border-b flex items-center gap-2 ${isDarkMode ? "border-gray-800 text-white" : "border-gray-200 text-gray-900"}`}>
                      <Clock className="w-5 h-5 text-[#FF5A22]" />
                      Open Hours (Day-wise)
                    </h2>

                    <div className="space-y-3">
                      {DAYS_OF_WEEK.map((day) => {
                        const fromKey = `${day.toLowerCase()}From` as keyof typeof formData;
                        const toKey = `${day.toLowerCase()}To` as keyof typeof formData;
                        return (
                          <div key={day} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
                            <div className="md:col-span-1">
                              <label className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                {day}
                              </label>
                            </div>
                            <div>
                              <label className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                From
                              </label>
                              <input
                                type="time"
                                name={fromKey}
                                value={formData[fromKey] as string}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 rounded-lg border transition-all mt-1 ${
                                  isDarkMode
                                    ? "bg-gray-800 border-gray-700 text-white focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                                    : "bg-white border-gray-300 text-gray-900 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                                }`}
                              />
                            </div>
                            <div>
                              <label className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                To
                              </label>
                              <input
                                type="time"
                                name={toKey}
                                value={formData[toKey] as string}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 rounded-lg border transition-all mt-1 ${
                                  isDarkMode
                                    ? "bg-gray-800 border-gray-700 text-white focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                                    : "bg-white border-gray-300 text-gray-900 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                                }`}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* 🖼 Images */}
                {activeSection === "images" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <h2 className={`text-lg font-semibold pb-2 border-b flex items-center gap-2 ${isDarkMode ? "border-gray-800 text-white" : "border-gray-200 text-gray-900"}`}>
                      <ImageIcon className="w-5 h-5 text-[#FF5A22]" />
                      Images
                    </h2>

                    {/* Cover Image */}
                    <div className="space-y-3">
                      <label className={`flex items-center gap-2 text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        <ImageIcon className="w-4 h-4 text-blue-500" />
                        Cover Image (Single Upload)
                      </label>
                      {coverImagePreview ? (
                        <div className="relative w-full max-w-md">
                          <div className="aspect-video rounded-lg overflow-hidden border-2 border-gray-300 dark:border-gray-700">
                            <Image
                              src={coverImagePreview}
                              alt="Cover preview"
                              width={600}
                              height={400}
                              className="w-full h-full object-cover"
                              unoptimized
                            />
                          </div>
                          <button
                            type="button"
                            onClick={handleRemoveCoverImage}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500 text-white"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <label className="flex w-full max-w-md aspect-video rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex-col items-center justify-center cursor-pointer hover:border-[#FF5A22] transition-colors">
                          <Upload className="w-8 h-8 text-gray-400 mb-2" />
                          <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                            Upload Cover Image
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleCoverImageChange}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>

                    {/* Image Gallery */}
                    <div className="space-y-3">
                      <label className={`flex items-center gap-2 text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        <ImageIcon className="w-4 h-4 text-purple-500" />
                        Image Gallery (Multiple Upload)
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {imagePreviews.map((preview, index) => {
                          const isExistingUrl = typeof preview === 'string' && preview.startsWith('http');
                          return (
                            <div key={index} className="relative group">
                              <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-300 dark:border-gray-700">
                                <Image
                                  src={preview}
                                  alt={`Gallery ${index + 1}`}
                                  width={200}
                                  height={200}
                                  className="w-full h-full object-cover"
                                  unoptimized
                                />
                              </div>
                              {!isExistingUrl && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveImage(index)}
                                  className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          );
                        })}
                        {imagePreviews.length < 20 && (
                          <label className="aspect-square rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center cursor-pointer hover:border-[#FF5A22] transition-colors">
                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                            <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                              Add Image
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handleImageChange}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>
                      <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        Upload up to 20 images. Recommended: JPG or PNG, max 5MB each
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* 📞 Contact Details */}
                {activeSection === "contact" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <h2 className={`text-lg font-semibold pb-2 border-b flex items-center gap-2 ${isDarkMode ? "border-gray-800 text-white" : "border-gray-200 text-gray-900"}`}>
                      <Phone className="w-5 h-5 text-[#FF5A22]" />
                      Contact Details
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Contact Name */}
                      <div className="space-y-2">
                        <label className={`flex items-center gap-2 text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          <User className="w-4 h-4 text-blue-500" />
                          Contact Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="contactName"
                          value={formData.contactName}
                          onChange={handleChange}
                          required
                          className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
                            isDarkMode
                              ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                              : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                          }`}
                          placeholder="Enter contact name"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label className={`flex items-center gap-2 text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          <Mail className="w-4 h-4 text-green-500" />
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="contactEmail"
                          value={formData.contactEmail}
                          onChange={handleChange}
                          required
                          className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
                            isDarkMode
                              ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                              : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                          }`}
                          placeholder="Enter email address"
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-2 md:col-span-2">
                        <label className={`flex items-center gap-2 text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          <Phone className="w-4 h-4 text-purple-500" />
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="contactPhone"
                          value={formData.contactPhone}
                          onChange={handleChange}
                          required
                          className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
                            isDarkMode
                              ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                              : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                          }`}
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 🧾 Invoice Related Details */}
                {activeSection === "invoice" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <h2 className={`text-lg font-semibold pb-2 border-b flex items-center gap-2 ${isDarkMode ? "border-gray-800 text-white" : "border-gray-200 text-gray-900"}`}>
                      <FileText className="w-5 h-5 text-[#FF5A22]" />
                      Invoice Related Details
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Company Name */}
                      <div className="space-y-2">
                        <label className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          Company Name
                        </label>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
                            isDarkMode
                              ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                              : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                          }`}
                          placeholder="Enter company name"
                        />
                      </div>

                      {/* Billing Address */}
                      <div className="space-y-2 md:col-span-2">
                        <label className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          Billing Address
                        </label>
                        <textarea
                          name="billingAddress"
                          value={formData.billingAddress}
                          onChange={handleChange}
                          rows={3}
                          className={`w-full px-4 py-2.5 rounded-lg border transition-all resize-none ${
                            isDarkMode
                              ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                              : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                          }`}
                          placeholder="Enter billing address"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Form Actions */}
              <div className={`px-4 md:px-6 py-4 border-t flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 ${isDarkMode ? "border-gray-800 bg-gray-800/50" : "border-gray-200 bg-gray-50"}`}>
                <button
                  type="button"
                  onClick={handleCancel}
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
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${
                    isSubmitting
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  } ${
                    isDarkMode
                      ? "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white shadow-lg shadow-[#FF5A22]/20"
                      : "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white shadow-md hover:shadow-lg"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Save className="w-4 h-4" />
                    {isSubmitting ? "Updating..." : "Update"}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
