
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ServiceCategory } from "@/types";
import { Plus, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ServiceForm {
  name: string;
  category: ServiceCategory;
  description: string;
  duration: string;
  price: string;
  inHomeService: boolean;
}

export default function ServicesSetup() {
  const navigate = useNavigate();
  const [services, setServices] = useState<ServiceForm[]>([
    {
      name: "",
      category: ServiceCategory.HAIR,
      description: "",
      duration: "",
      price: "",
      inHomeService: false,
    },
  ]);

  const handleChange = (index: number, field: keyof ServiceForm, value: any) => {
    const updatedServices = [...services];
    updatedServices[index] = { ...updatedServices[index], [field]: value };
    setServices(updatedServices);
  };

  const addService = () => {
    setServices([
      ...services,
      {
        name: "",
        category: ServiceCategory.HAIR,
        description: "",
        duration: "",
        price: "",
        inHomeService: false,
      },
    ]);
  };

  const removeService = (index: number) => {
    if (services.length > 1) {
      setServices(services.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to the backend
    toast({
      title: "Services saved!",
      description: "Your services have been configured successfully",
    });
    navigate("/provider/dashboard");
  };

  return (
    <Layout>
      <div className="container px-4 py-16 mx-auto md:px-6">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Configure Your Services</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {services.map((service, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">Service {index + 1}</h3>
                      {services.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeService(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`name-${index}`}>Service Name</Label>
                        <Input
                          id={`name-${index}`}
                          value={service.name}
                          onChange={(e) => handleChange(index, "name", e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`category-${index}`}>Category</Label>
                        <Select
                          value={service.category}
                          onValueChange={(value) => handleChange(index, "category", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(ServiceCategory).map((category) => (
                              <SelectItem key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`description-${index}`}>Description</Label>
                        <Textarea
                          id={`description-${index}`}
                          value={service.description}
                          onChange={(e) => handleChange(index, "description", e.target.value)}
                          required
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor={`duration-${index}`}>Duration (minutes)</Label>
                          <Input
                            id={`duration-${index}`}
                            type="number"
                            value={service.duration}
                            onChange={(e) => handleChange(index, "duration", e.target.value)}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`price-${index}`}>Price ($)</Label>
                          <Input
                            id={`price-${index}`}
                            type="number"
                            value={service.price}
                            onChange={(e) => handleChange(index, "price", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={addService}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another Service
                </Button>

                <Button type="submit" className="w-full">
                  Save Services
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
