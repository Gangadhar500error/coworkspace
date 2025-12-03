"use client";

const pricingPlans = [
  {
    id: 1,
    title: "Flex",
    description: "No memberships required.",
    features: [
      { text: "Day Pass", price: "₹500/day", type: "diamond" },
      { text: "Meeting Room", price: "₹1,500/hr", type: "diamond" },
      { text: "Virtual/Mailbox", price: "₹2,000/mo", type: "diamond" },
      { text: "Podcast", price: "₹2,500/hr", type: "diamond" },
    ],
    buttonText: "Book On Demand →",
    buttonStyle: "solid",
    borderStyle: "teal",
  },
  {
    id: 2,
    title: "Seat",
    price: "₹6,999/month",
    features: [
      { text: "9am-5pm access", type: "checkmark" },
      { text: "Any open seat in shared area", type: "checkmark" },
      { text: "₹2,000 monthly credits", type: "diamond" },
      { text: "24/7 Access + ₹2,000", type: "diamond" },
    ],
    buttonText: "Join Today →",
    buttonStyle: "outline",
  },
  {
    id: 3,
    title: "Desk",
    price: "₹12,999/month",
    features: [
      { text: "24-7-365 access", type: "checkmark" },
      { text: "Your own private desk", type: "checkmark" },
      { text: "₹3,000 monthly credits", type: "checkmark" },
      { text: "Sit/stand desk upgrade + ₹1,500", type: "diamond" },
    ],
    buttonText: "Join Today →",
    buttonStyle: "outline",
  },
  {
    id: 4,
    title: "Office",
    price: "Starting @ ₹25,000/month",
    features: [
      { text: "24-7-365 access", type: "checkmark" },
      { text: "Your own private office", type: "checkmark" },
      { text: "₹5,000 monthly credits", type: "checkmark" },
      { text: "Various sizes for 1-15 people", type: "diamond" },
    ],
    additionalInfo: "♦ 2 offices remaining at Pasadena",
    buttonText: "Join Today →",
    buttonStyle: "outline",
  },
];

export default function Pricing() {
  return (
    <section className="relative w-full bg-white lg:pb-14 pb-5 overflow-hidden">
      {/* Dotted Grid Background Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, #d1d5db 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="container-custom relative z-10 px-4 md:px-6 lg:px-8">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-12 lg:mb-16">
          {/* Left Text Block */}
          <div className="flex items-center">
            <p className="text-lg md:text-xl text-gray-900 leading-relaxed font-body max-w-lg">
              CoworkSpace offers flexible workspace solutions designed for modern professionals. Our{" "}
              <span className="underline decoration-[#008385] decoration-2 underline-offset-3">
                month-to-month
              </span>{" "}
              pricing is simple and straightforward, perfect for both individuals and teams.
            </p>
          </div>

          {/* Right Text Block */}
          <div className="flex items-center lg:justify-end">
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-[1.1] font-display">
              No contracts necessary.
            </h2>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-lg p-6 md:p-7 transition-all hover:shadow-md flex flex-col ${
                plan.borderStyle === "teal"
                  ? "border-2 border-[#008385]"
                  : "border border-gray-200"
              }`}
            >
              {/* Card Title */}
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 font-display">
                {plan.title}
              </h3>

              {/* Description or Price */}
              {plan.description ? (
                <p className="text-sm text-gray-600 mb-5 font-body">{plan.description}</p>
              ) : plan.price ? (
                <p className="text-xl md:text-2xl font-bold text-[#008385] mb-5 font-body">
                  {plan.price}
                </p>
              ) : null}

              {/* Features List */}
              <ul className="flex-1 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 mb-2 last:mb-0">
                    {feature.type === "checkmark" ? (
                      <span className="text-[#008385] text-base font-bold mt-0.5 flex-shrink-0">✓</span>
                    ) : (
                      <span className="text-gray-900 text-base font-bold mt-0.5 flex-shrink-0">♦</span>
                    )}
                    <span className="text-gray-900 text-sm leading-normal font-body flex-1">
                      {feature.text}
                      {feature.price && (
                        <span className="text-[#008385] font-bold ml-1">
                          {" "}{feature.price}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Additional Info */}
              {plan.additionalInfo && (
                <p className="text-sm text-[#008385] mb-6 font-body">
                  <span className="text-gray-900 font-bold">♦</span> {plan.additionalInfo}
                </p>
              )}

              {/* Button */}
              <button
                className={`w-full py-2.5 px-4 rounded-md font-semibold text-sm transition-colors duration-200 font-body mt-auto ${
                  plan.buttonStyle === "solid"
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "bg-white text-gray-900 border border-gray-900 hover:bg-gray-50"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
