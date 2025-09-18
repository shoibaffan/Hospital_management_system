import { useState } from "react";
import { Activity, Zap, Thermometer, Snowflake, Target, Waves, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import manualTherapyImg from "@/assets/manual-therapy.jpg";
import ultrasoundTherapyImg from "@/assets/ultrasound-therapy.jpg";
import heatTherapyImg from "@/assets/heat-therapy.jpg";
import coldTherapyImg from "@/assets/cold-therapy.jpg";
import dryNeedlingImg from "@/assets/dry-needling.jpg";
import electrotherapyImg from "@/assets/electrotherapy.jpg";

interface Therapy {
  id: string;
  name: string;
  icon: React.ElementType;
  image: string;
  shortDescription: string;
  detailedDescription: string;
  duration: string;
  benefits: string[];
  category: string;
}

const therapies: Therapy[] = [
  {
    id: "manual-therapy",
    name: "Manual Therapy",
    icon: Activity,
    image: manualTherapyImg,
    shortDescription: "Hands-on treatment techniques",
    detailedDescription: "Manual therapy involves skilled hand movements and techniques to diagnose and treat soft tissues and joint structures. It includes joint mobilization, soft tissue mobilization, and muscle energy techniques.",
    duration: "45-60 minutes",
    benefits: ["Improved joint mobility", "Pain reduction", "Enhanced circulation", "Muscle relaxation"],
    category: "Physical"
  },
  {
    id: "ultrasound",
    name: "Ultrasound Therapy",
    icon: Waves,
    image: ultrasoundTherapyImg,
    shortDescription: "Sound wave healing therapy",
    detailedDescription: "Therapeutic ultrasound uses high-frequency sound waves to stimulate tissue healing and reduce inflammation. The sound waves create gentle heat in deep tissues, promoting blood flow and cellular repair.",
    duration: "10-15 minutes",
    benefits: ["Tissue healing", "Inflammation reduction", "Pain relief", "Improved blood flow"],
    category: "Electrotherapy"
  },
  {
    id: "heat-therapy",
    name: "Heat Therapy",
    icon: Thermometer,
    image: heatTherapyImg,
    shortDescription: "Therapeutic heat application",
    detailedDescription: "Heat therapy involves applying controlled heat to affected areas to increase blood flow, relax muscles, and reduce pain. Methods include hot packs, infrared heat, and hydrotherapy.",
    duration: "15-20 minutes",
    benefits: ["Muscle relaxation", "Increased flexibility", "Pain relief", "Improved circulation"],
    category: "Thermal"
  },
  {
    id: "cold-therapy",
    name: "Cold Therapy",
    icon: Snowflake,
    image: coldTherapyImg,
    shortDescription: "Cryotherapy treatment",
    detailedDescription: "Cold therapy uses controlled cold application to reduce inflammation, numb pain, and decrease muscle spasms. Techniques include ice packs, cold baths, and cryotherapy chambers.",
    duration: "10-15 minutes",
    benefits: ["Inflammation reduction", "Pain numbing", "Swelling control", "Muscle spasm relief"],
    category: "Thermal"
  },
  {
    id: "needling",
    name: "Dry Needling",
    icon: Target,
    image: dryNeedlingImg,
    shortDescription: "Trigger point needling",
    detailedDescription: "Dry needling involves inserting thin needles into trigger points in muscles to release tension and improve function. It targets myofascial trigger points to reduce pain and restore movement.",
    duration: "20-30 minutes",
    benefits: ["Trigger point release", "Muscle function improvement", "Pain reduction", "Movement restoration"],
    category: "Manual"
  },
  {
    id: "electrotherapy",
    name: "Electrotherapy",
    icon: Zap,
    image: electrotherapyImg,
    shortDescription: "Electrical stimulation therapy",
    detailedDescription: "Electrotherapy uses electrical currents to stimulate nerves and muscles for pain relief and healing. Includes TENS, NMES, and interferential therapy to promote recovery and reduce discomfort.",
    duration: "15-25 minutes",
    benefits: ["Pain management", "Muscle strengthening", "Nerve stimulation", "Healing acceleration"],
    category: "Electrotherapy"
  }
];

const TreatmentManagement = () => {
  const [flippedCard, setFlippedCard] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Physical", "Electrotherapy", "Thermal", "Manual"];

  const filteredTherapies = selectedCategory === "All" 
    ? therapies 
    : therapies.filter(therapy => therapy.category === selectedCategory);

  const handleCardClick = (id: string) => {
    setFlippedCard(flippedCard === id ? null : id);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Treatment Therapies</h1>
        <p className="text-muted-foreground">Explore our comprehensive range of physiotherapy treatments</p>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80 text-muted-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Therapy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTherapies.map((therapy) => {
          const IconComponent = therapy.icon;
          const isFlipped = flippedCard === therapy.id;

          return (
            <div
              key={therapy.id}
              className="relative h-64 cursor-pointer perspective-1000"
              onClick={() => handleCardClick(therapy.id)}
            >
              <div
                className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
                  isFlipped ? "rotate-y-180" : ""
                }`}
              >
                {/* Front Side */}
                <div className="absolute inset-0 w-full h-full backface-hidden">
                  <div className="bg-card border border-border rounded-lg overflow-hidden h-full shadow-soft hover:shadow-md transition-shadow">
                    <div className="relative h-32 w-full overflow-hidden">
                      <img 
                        src={therapy.image} 
                        alt={therapy.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <h3 className="text-lg font-semibold text-white">{therapy.name}</h3>
                      </div>
                    </div>
                    <div className="p-4 text-center">
                      <p className="text-muted-foreground text-sm">Click to learn more</p>
                    </div>
                  </div>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
                  <div className="bg-card border border-border rounded-lg p-6 h-full shadow-soft">
                    <div className="h-full flex flex-col">
                      <h3 className="text-lg font-semibold text-foreground mb-3">{therapy.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3 flex-1 overflow-y-auto">
                        {therapy.detailedDescription}
                      </p>
                      <div className="space-y-2">
                        <div className="text-xs">
                          <span className="font-medium text-foreground">Duration: </span>
                          <span className="text-muted-foreground">{therapy.duration}</span>
                        </div>
                        <div className="text-xs">
                          <span className="font-medium text-foreground">Benefits: </span>
                          <span className="text-muted-foreground">{therapy.benefits.join(", ")}</span>
                        </div>
                        <Button 
                          className="w-full mt-3 bg-primary hover:bg-primary-hover"
                          size="sm"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Book Therapy
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TreatmentManagement;