import { Wifi, Phone, Printer, Users, Coffee, Lock } from "lucide-react";

export default function FeatureIconStrip() {
  const features = [
    { icon: Wifi, text: "high-speed wifi" },
    { icon: Phone, text: "private phone booths" },
    { icon: Printer, text: "printing & scanning" },
    { icon: Users, text: "meeting rooms" },
    { icon: Coffee, text: "free coffee & snacks" },
    { icon: Lock, text: "24/7 secure access" },
  ];

  return (
    <section className="bg-white border-y border-gray-200 py-8 md:py-12">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-3">
                <feature.icon className="w-6 h-6 text-orange-600" />
              </div>
              <p className="text-sm font-medium text-gray-700 font-body">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
