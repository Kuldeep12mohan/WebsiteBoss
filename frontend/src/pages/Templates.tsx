
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Eye } from "lucide-react";
import { templateService } from "@/services/templateService";
import { ThemeToggle } from "@/components/theme-toggle";
import { Navbar } from "@/components/Navbar";

interface Template {
  id: string;
  name: string;
  industry: string;
  description: string;
  preview_image: string;
}

const Templates = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");
  const navigate = useNavigate();

  const industries = [
    { value: "all", label: "All Industries" },
    { value: "cosmetics", label: "Cosmetics & Beauty" },
    { value: "pharmacy", label: "Pharmacy & Healthcare" },
    { value: "education", label: "Education & Learning" }
  ];

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const data = await templateService.getTemplates();
      setTemplates(data);
    } catch (error) {
      console.error("Failed to load templates:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTemplates = selectedIndustry === "all" 
    ? templates 
    : templates.filter(template => template.industry.toLowerCase() === selectedIndustry);

  const handleUseTemplate = (templateId: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
      return;
    }
    navigate(`/editor/${templateId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <Navbar/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Professional Website Templates
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose from our collection of industry-specific templates designed to help your business stand out online.
          </p>
        </div>

        {/* Filter Section */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            {industries.map((industry) => (
              <Button
                key={industry.value}
                variant={selectedIndustry === industry.value ? "default" : "outline"}
                onClick={() => setSelectedIndustry(industry.value)}
                className={selectedIndustry === industry.value ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                {industry.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg overflow-hidden">
                  <img
                    src={template.preview_image || '/placeholder.svg'}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                        {template.name}
                      </CardTitle>
                      <CardDescription className="text-blue-600 dark:text-blue-400 font-medium mt-1">
                        {template.industry}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{template.description}</p>
                  <div className="flex space-x-2">
                    <Button 
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleUseTemplate(template.id)}
                    >
                      Use Template
                    </Button>
                    <Button variant="outline" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredTemplates.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300">No templates found for the selected industry.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Templates;
