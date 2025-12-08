export const getBadgeColor = (badge?: string) => {
  switch (badge) {
    case "Popular":
      return "bg-yellow-500 text-white";
    case "Special Offer":
      return "bg-red-500 text-white";
    case "Featured":
      return "bg-purple-500 text-white";
    default:
      return "";
  }
};
