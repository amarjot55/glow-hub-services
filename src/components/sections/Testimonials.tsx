
import { Card, CardContent } from "@/components/ui/card";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  image: string;
  content: string;
  service: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Aditi Bansal",
    location: "Gurugram",
    image: "https://api.dicebear.com/9.x/notionists/svg?seed=Aditi%20Bansal&backgroundColor=fde2e4,fad2e1,e2ece9,dfe7fd",
    content: "I booked a makeup artist for my sister's mehendi and wedding, and the experience was fantastic! The artist arrived on time, was super professional, and did an amazing job on all the bridesmaids. Will definitely use GlowHub again!",
    service: "Bridal Makeup",
    rating: 5
  },
  {
    id: "t2",
    name: "Arjun Khanna",
    location: "New Delhi",
    image: "https://api.dicebear.com/9.x/notionists/svg?seed=Arjun%20Khanna&backgroundColor=fde2e4,fad2e1,e2ece9,dfe7fd",
    content: "As someone who dreads going to salons, having a haircut at home was a game-changer. My stylist was skilled, made me feel comfortable, and cleaned up afterward. Perfect service!",
    service: "Men's Haircut",
    rating: 5
  },
  {
    id: "t3",
    name: "Simran Kaur",
    location: "Noida",
    image: "https://api.dicebear.com/9.x/notionists/svg?seed=Simran%20Kaur&backgroundColor=fde2e4,fad2e1,e2ece9,dfe7fd",
    content: "I've been using GlowHub for monthly manicures, and it's so convenient. My regular nail tech is amazing - she's always on time and does beautiful work. Love not having to drive to a salon!",
    service: "Gel Manicure",
    rating: 4
  },
  {
    id: "t4",
    name: "Pooja Reddy",
    location: "Mumbai",
    image: "https://api.dicebear.com/9.x/notionists/svg?seed=Pooja%20Reddy&backgroundColor=fde2e4,fad2e1,e2ece9,dfe7fd",
    content: "The facial service I booked was absolutely luxurious. The esthetician brought all professional equipment and products, and my skin looked amazing afterward. It felt like a spa came to me!",
    service: "Deep Cleansing Facial",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-glow-50">
      <div className="container px-4 mx-auto md:px-6">
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-glow-800 md:text-4xl">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600">
            Sample reviews shown for this prototype
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-glow-100 h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-xs text-glow-600">{testimonial.service}</span>
                </div>
                
                <p className="flex-1 mb-6 text-gray-600 text-sm italic">"{testimonial.content}"</p>
                
                <div className="flex items-center mt-auto">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full mr-3 border-2 border-glow-100"
                  />
                  <div>
                    <h4 className="font-medium text-glow-800">{testimonial.name}</h4>
                    <p className="text-xs text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
