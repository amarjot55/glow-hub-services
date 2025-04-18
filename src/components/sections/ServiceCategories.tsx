
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ServiceCategory } from "@/types";

type CategoryItem = {
  id: ServiceCategory;
  name: string;
  icon: string;
  description: string;
};

const categories: CategoryItem[] = [
  {
    id: ServiceCategory.HAIR,
    name: "Hair Styling",
    icon: "✂️",
    description: "Cuts, coloring, styling, extensions, and more",
  },
  {
    id: ServiceCategory.MAKEUP,
    name: "Makeup",
    icon: "💄",
    description: "Occasion makeup, bridal, tutorials, and more",
  },
  {
    id: ServiceCategory.NAILS,
    name: "Nail Care",
    icon: "💅",
    description: "Manicures, pedicures, nail art, and gel polish",
  },
  {
    id: ServiceCategory.FACIAL,
    name: "Facials",
    icon: "✨",
    description: "Cleansing, massages, masks, and treatments",
  },
  {
    id: ServiceCategory.MASSAGE,
    name: "Massage",
    icon: "💆‍♀️",
    description: "Relaxing, therapeutic, and deep tissue massages",
  },
  {
    id: ServiceCategory.EYEBROWS,
    name: "Eyebrow & Lashes",
    icon: "👁️",
    description: "Threading, waxing, tinting, and extensions",
  },
  {
    id: ServiceCategory.WAXING,
    name: "Waxing",
    icon: "🧴",
    description: "Hair removal services for all body parts",
  },
  {
    id: ServiceCategory.OTHER,
    name: "Other Services",
    icon: "🌟",
    description: "Specialized beauty and wellness treatments",
  },
];

export default function ServiceCategories() {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto md:px-6">
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-glow-800 md:text-4xl">
            Explore Our Services
          </h2>
          <p className="text-lg text-gray-600">
            Discover a wide range of beauty services you can book right to your doorstep
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/services?category=${category.id}`}
              className="group"
            >
              <Card className="overflow-hidden transition-all border-glow-100 hover:shadow-md hover:border-glow-200 h-full">
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="flex items-center justify-center w-16 h-16 mb-4 text-2xl bg-glow-50 rounded-full group-hover:bg-glow-100 transition-colors">
                    {category.icon}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-glow-800">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
