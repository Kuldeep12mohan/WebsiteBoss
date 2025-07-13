import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Globe,
  ArrowLeft,
  Save,
  Download,
  Eye,
  Plus,
  X,
  Upload,
  Palette,
  Image as ImageIcon,
  User,
  Settings,
  Sparkles,
  Heart,
  Star,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { templateService } from "@/services/templateService";
import { projectService } from "@/services/projectService";
import { ThemeToggle } from "@/components/theme-toggle";

const TemplateEditor = () => {
  const { templateId, projectId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [customData, setCustomData] = useState({
    businessName: "",
    tagline: "",
    description: "",
    phone: "",
    email: "",
    address: "",
    logo: "",
    heroImage: "",
    primaryColor: "#3B82F6",
    secondaryColor: "#EF4444",
    products: [],
    services: [],
    socialMedia: {
      facebook: "",
      instagram: "",
      twitter: "",
    },
  });

  useEffect(() => {
    loadTemplateData();
  }, [templateId, projectId]);

  const loadTemplateData = async () => {
    try {
      if (projectId) {
        const project = await projectService.getProject(projectId);
        setTemplate(project.template);
        setCustomData(project.customData || customData);
      } else if (templateId) {
        const templateData = await templateService.getTemplate(templateId);
        setTemplate(templateData);
      }
    } catch (error) {
      console.error("Failed to load template:", error);
      toast({
        title: "Error",
        description: "Failed to load template. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file, field) => {
    try {
      const result = await projectService.uploadImage(file);
      setCustomData((prev) => ({
        ...prev,
        [field]: result.url,
      }));
      toast({
        title: "Success",
        description: "Image uploaded successfully!",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    }
  };

  const addProduct = () => {
    setCustomData((prev) => ({
      ...prev,
      products: [
        ...prev.products,
        { name: "", description: "", price: "", image: "" },
      ],
    }));
  };

  const updateProduct = (index, field, value) => {
    setCustomData((prev) => ({
      ...prev,
      products: prev.products.map((product, i) =>
        i === index ? { ...product, [field]: value } : product
      ),
    }));
  };

  const removeProduct = (index) => {
    setCustomData((prev) => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index),
    }));
  };

  const addService = () => {
    setCustomData((prev) => ({
      ...prev,
      services: [...prev.services, { name: "", description: "" }],
    }));
  };

  const updateService = (index, field, value) => {
    setCustomData((prev) => ({
      ...prev,
      services: prev.services.map((service, i) =>
        i === index ? { ...service, [field]: value } : service
      ),
    }));
  };

  const removeService = (index) => {
    setCustomData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (projectId) {
        await projectService.updateProject(projectId, { customData });
        toast({
          title: "Success",
          description: "Project updated successfully!",
        });
      } else {
        const project = await projectService.createProject(templateId, {
          name: customData.businessName || `${template.name} Website`,
          customData,
        });
        navigate(`/editor/project/${project.id}`);
        toast({
          title: "Success",
          description: "Project created successfully!",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = () => {
    navigate(`/preview/${projectId || "new"}`, {
      state: { template, customData },
    });
  };

  const handleDownload = async () => {
    if (!projectId) {
      toast({
        title: "Save first",
        description: "Please save your project before downloading.",
        variant: "destructive",
      });
      return;
    }

    try {
      await projectService.downloadProject(projectId);
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Failed to download project. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
            <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-blue-600" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
            Loading your template...
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            Preparing the magic ✨
          </p>
        </div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="h-12 w-12 text-red-600" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg font-medium mb-4">
            Template not found
          </p>
          <Button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Enhanced Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-6">
              <Button
                variant="ghost"
                onClick={() => navigate("/dashboard")}
                className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl px-4 py-2 transition-all duration-200"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="font-medium">Back</span>
              </Button>

              <Separator orientation="vertical" className="h-8" />

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Globe className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    WebsiteBoss
                  </span>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      {template.industry}
                    </Badge>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      •
                    </span>
                    <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                      {template.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <ThemeToggle />

              <Button
                variant="outline"
                onClick={handlePreview}
                className="border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 dark:border-blue-800 dark:hover:border-blue-700 dark:hover:bg-blue-900/20 transition-all duration-200"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>

              {projectId && (
                <Button
                  variant="outline"
                  onClick={handleDownload}
                  className="border-2 border-green-200 hover:border-green-300 hover:bg-green-50 dark:border-green-800 dark:hover:border-green-700 dark:hover:bg-green-900/20 transition-all duration-200"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              )}

              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6"
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? "Saving..." : "Save Project"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full px-4 py-2 mb-4">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Template Editor
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Customize Your Website
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Make your website unique by customizing colors, content, and images.
            Your changes are saved automatically.
          </p>
        </div>

        <Tabs defaultValue="basic" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-2 shadow-lg">
            <TabsTrigger
              value="basic"
              className="flex items-center space-x-2 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md dark:data-[state=active]:bg-gray-700 transition-all duration-200"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Basic Info</span>
            </TabsTrigger>
            <TabsTrigger
              value="design"
              className="flex items-center space-x-2 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md dark:data-[state=active]:bg-gray-700 transition-all duration-200"
            >
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">Design</span>
            </TabsTrigger>
            <TabsTrigger
              value="content"
              className="flex items-center space-x-2 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md dark:data-[state=active]:bg-gray-700 transition-all duration-200"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Content</span>
            </TabsTrigger>
            <TabsTrigger
              value="social"
              className="flex items-center space-x-2 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md dark:data-[state=active]:bg-gray-700 transition-all duration-200"
            >
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Social</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <Card className="border-0 shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-t-lg">
                <CardTitle className="flex items-center space-x-2 text-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="dark:text-white">Business Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="businessName"
                      className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center space-x-2"
                    >
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Business Name</span>
                    </Label>
                    <Input
                      id="businessName"
                      value={customData.businessName}
                      onChange={(e) =>
                        setCustomData((prev) => ({
                          ...prev,
                          businessName: e.target.value,
                        }))
                      }
                      placeholder="Enter your business name"
                      className="border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200 h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="tagline"
                      className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                    >
                      Tagline
                    </Label>
                    <Input
                      id="tagline"
                      value={customData.tagline}
                      onChange={(e) =>
                        setCustomData((prev) => ({
                          ...prev,
                          tagline: e.target.value,
                        }))
                      }
                      placeholder="Your business tagline"
                      className="border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200 h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                  >
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={customData.description}
                    onChange={(e) =>
                      setCustomData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Describe your business and what makes it special"
                    rows={4}
                    className="border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200 resize-none"
                  />
                </div>

                <Separator className="my-6" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                    >
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={customData.phone}
                      onChange={(e) =>
                        setCustomData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      placeholder="+1 (555) 123-4567"
                      className="border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200 h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={customData.email}
                      onChange={(e) =>
                        setCustomData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      placeholder="hello@yourbusiness.com"
                      className="border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200 h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="address"
                      className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                    >
                      Address
                    </Label>
                    <Input
                      id="address"
                      value={customData.address}
                      onChange={(e) =>
                        setCustomData((prev) => ({
                          ...prev,
                          address: e.target.value,
                        }))
                      }
                      placeholder="123 Business St, City, State"
                      className="border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200 h-12"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="design" className="space-y-6">
            <Card className="border-0 shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-t-lg">
                <CardTitle className="flex items-center space-x-2 text-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <Palette className="h-4 w-4 text-white" />
                  </div>
                  <span className="dark:text-white">Design & Branding</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center space-x-2">
                      <ImageIcon className="h-4 w-4 text-blue-500" />
                      <span>Logo</span>
                    </Label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center hover:border-blue-400 transition-colors duration-200">
                      {customData.logo ? (
                        <div className="space-y-4">
                          <img
                            src={customData.logo}
                            alt="Logo"
                            className="w-32 h-20 object-cover rounded-lg mx-auto shadow-md"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setCustomData((prev) => ({ ...prev, logo: "" }))
                            }
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            Remove Logo
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg mx-auto flex items-center justify-center">
                            <Upload className="h-8 w-8 text-gray-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Upload your logo
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              PNG, JPG up to 5MB
                            </p>
                          </div>
                        </div>
                      )}
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file, "logo");
                        }}
                        className="mt-4"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center space-x-2">
                      <ImageIcon className="h-4 w-4 text-purple-500" />
                      <span>Hero Image</span>
                    </Label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center hover:border-purple-400 transition-colors duration-200">
                      {customData.heroImage ? (
                        <div className="space-y-4">
                          <img
                            src={customData.heroImage}
                            alt="Hero"
                            className="w-full h-32 object-cover rounded-lg shadow-md"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setCustomData((prev) => ({
                                ...prev,
                                heroImage: "",
                              }))
                            }
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            Remove Image
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg mx-auto flex items-center justify-center">
                            <Upload className="h-8 w-8 text-gray-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Upload hero image
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              PNG, JPG up to 5MB
                            </p>
                          </div>
                        </div>
                      )}
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file, "heroImage");
                        }}
                        className="mt-4"
                      />
                    </div>
                  </div>
                </div>

                <Separator className="my-8" />

                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                    <Palette className="h-5 w-5 text-purple-500" />
                    <span>Color Scheme</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label
                        htmlFor="primaryColor"
                        className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                      >
                        Primary Color
                      </Label>
                      <div className="flex items-center space-x-4">
                        <div
                          className="w-16 h-12 rounded-lg border-2 border-gray-200 dark:border-gray-600 shadow-inner"
                          style={{ backgroundColor: customData.primaryColor }}
                        ></div>
                        <Input
                          id="primaryColor"
                          type="color"
                          value={customData.primaryColor}
                          onChange={(e) =>
                            setCustomData((prev) => ({
                              ...prev,
                              primaryColor: e.target.value,
                            }))
                          }
                          className="w-20 h-12 border-2 border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer"
                        />
                        <Input
                          value={customData.primaryColor}
                          onChange={(e) =>
                            setCustomData((prev) => ({
                              ...prev,
                              primaryColor: e.target.value,
                            }))
                          }
                          placeholder="#3B82F6"
                          className="flex-1 h-12 border-2 border-gray-200 dark:border-gray-600 rounded-lg"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label
                        htmlFor="secondaryColor"
                        className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                      >
                        Secondary Color
                      </Label>
                      <div className="flex items-center space-x-4">
                        <div
                          className="w-16 h-12 rounded-lg border-2 border-gray-200 dark:border-gray-600 shadow-inner"
                          style={{ backgroundColor: customData.secondaryColor }}
                        ></div>
                        <Input
                          id="secondaryColor"
                          type="color"
                          value={customData.secondaryColor}
                          onChange={(e) =>
                            setCustomData((prev) => ({
                              ...prev,
                              secondaryColor: e.target.value,
                            }))
                          }
                          className="w-20 h-12 border-2 border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer"
                        />
                        <Input
                          value={customData.secondaryColor}
                          onChange={(e) =>
                            setCustomData((prev) => ({
                              ...prev,
                              secondaryColor: e.target.value,
                            }))
                          }
                          placeholder="#EF4444"
                          className="flex-1 h-12 border-2 border-gray-200 dark:border-gray-600 rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card className="border-0 shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-t-lg">
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center space-x-2 text-xl">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Settings className="h-4 w-4 text-white" />
                    </div>
                    <span className="dark:text-white">Products & Services</span>
                  </CardTitle>
                  <Button
                    onClick={addProduct}
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-lg"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                {customData.products.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Plus className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      No products added yet
                    </p>
                    <Button onClick={addProduct} variant="outline">
                      Add Your First Product
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {customData.products.map((product, index) => (
                      <div
                        key={index}
                        className="border-2 border-gray-200 dark:border-gray-600 rounded-xl p-6 space-y-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700"
                      >
                        <div className="flex justify-between items-center">
                          <h4 className="font-semibold text-lg text-gray-900 dark:text-white flex items-center space-x-2">
                            <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {index + 1}
                            </div>
                            <span>Product {index + 1}</span>
                          </h4>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeProduct(index)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            placeholder="Product name"
                            value={product.name}
                            onChange={(e) =>
                              updateProduct(index, "name", e.target.value)
                            }
                            className="border-2 border-gray-200 dark:border-gray-600 rounded-lg h-12"
                          />
                          <Input
                            placeholder="Price (e.g., $29.99)"
                            value={product.price}
                            onChange={(e) =>
                              updateProduct(index, "price", e.target.value)
                            }
                            className="border-2 border-gray-200 dark:border-gray-600 rounded-lg h-12"
                          />
                          {template.name != "education-template-1" && (
                            <Input
                              placeholder="SKU"
                              value={product.sku}
                              onChange={(e) =>
                                updateProduct(index, "sku", e.target.value)
                              }
                              className="border-2 border-gray-200 dark:border-gray-600 rounded-lg h-12"
                            />
                          )}
                        </div>
                        <Textarea
                          placeholder="Product description"
                          value={product.description}
                          onChange={(e) =>
                            updateProduct(index, "description", e.target.value)
                          }
                          rows={3}
                          className="border-2 border-gray-200 dark:border-gray-600 rounded-lg resize-none"
                        />
                        <div className="space-y-3">
                          <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Product Image
                          </Label>
                          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                            {product.image ? (
                              <div className="space-y-3">
                                <img
                                  src={product.image}
                                  alt="Product"
                                  className="w-24 h-24 object-cover rounded-lg mx-auto shadow-md"
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    updateProduct(index, "image", "")
                                  }
                                  className="text-red-600 hover:text-red-700"
                                >
                                  Remove Image
                                </Button>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Upload product image
                                </p>
                              </div>
                            )}
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  try {
                                    const result =
                                      await projectService.uploadImage(file);
                                    updateProduct(index, "image", result.url);
                                  } catch (error) {
                                    toast({
                                      title: "Upload failed",
                                      description: "Failed to upload image.",
                                      variant: "destructive",
                                    });
                                  }
                                }
                              }}
                              className="mt-3"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-t-lg">
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center space-x-2 text-xl">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                      <Star className="h-4 w-4 text-white" />
                    </div>
                    <span className="dark:text-white">Services</span>
                  </CardTitle>
                  <Button
                    onClick={addService}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Service
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                {customData.services.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Star className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      No services added yet
                    </p>
                    <Button onClick={addService} variant="outline">
                      Add Your First Service
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {customData.services.map((service, index) => (
                      <div
                        key={index}
                        className="border-2 border-gray-200 dark:border-gray-600 rounded-xl p-6 space-y-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
                      >
                        <div className="flex justify-between items-center">
                          <h4 className="font-semibold text-lg text-gray-900 dark:text-white flex items-center space-x-2">
                            <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {index + 1}
                            </div>
                            <span>Service {index + 1}</span>
                          </h4>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeService(index)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <Input
                          placeholder="Service name"
                          value={service.name}
                          onChange={(e) =>
                            updateService(index, "name", e.target.value)
                          }
                          className="border-2 border-gray-200 dark:border-gray-600 rounded-lg h-12"
                        />
                        <Textarea
                          placeholder="Service description"
                          value={service.description}
                          onChange={(e) =>
                            updateService(index, "description", e.target.value)
                          }
                          rows={3}
                          className="border-2 border-gray-200 dark:border-gray-600 rounded-lg resize-none"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social" className="space-y-6">
            <Card className="border-0 shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-pink-50 to-red-50 dark:from-pink-900/20 dark:to-red-900/20 rounded-t-lg">
                <CardTitle className="flex items-center space-x-2 text-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-red-600 rounded-lg flex items-center justify-center">
                    <Heart className="h-4 w-4 text-white" />
                  </div>
                  <span className="dark:text-white">Social Media Links</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label
                      htmlFor="facebook"
                      className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center space-x-2"
                    >
                      <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">f</span>
                      </div>
                      <span>Facebook Page</span>
                    </Label>
                    <Input
                      id="facebook"
                      value={customData.socialMedia.facebook}
                      onChange={(e) =>
                        setCustomData((prev) => ({
                          ...prev,
                          socialMedia: {
                            ...prev.socialMedia,
                            facebook: e.target.value,
                          },
                        }))
                      }
                      placeholder="https://facebook.com/your-page"
                      className="border-2 border-gray-200 dark:border-gray-600 rounded-xl h-12 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="instagram"
                      className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center space-x-2"
                    >
                      <div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">📷</span>
                      </div>
                      <span>Instagram Profile</span>
                    </Label>
                    <Input
                      id="instagram"
                      value={customData.socialMedia.instagram}
                      onChange={(e) =>
                        setCustomData((prev) => ({
                          ...prev,
                          socialMedia: {
                            ...prev.socialMedia,
                            instagram: e.target.value,
                          },
                        }))
                      }
                      placeholder="https://instagram.com/your-account"
                      className="border-2 border-gray-200 dark:border-gray-600 rounded-xl h-12 focus:border-purple-500"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="twitter"
                      className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center space-x-2"
                    >
                      <div className="w-5 h-5 bg-blue-400 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">𝕏</span>
                      </div>
                      <span>Twitter/X Profile</span>
                    </Label>
                    <Input
                      id="twitter"
                      value={customData.socialMedia.twitter}
                      onChange={(e) =>
                        setCustomData((prev) => ({
                          ...prev,
                          socialMedia: {
                            ...prev.socialMedia,
                            twitter: e.target.value,
                          },
                        }))
                      }
                      placeholder="https://twitter.com/your-account"
                      className="border-2 border-gray-200 dark:border-gray-600 rounded-xl h-12 focus:border-blue-400"
                    />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 mt-8">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-blue-500" />
                    <span>Pro Tip</span>
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Adding social media links helps build trust with your
                    customers and makes it easy for them to connect with you on
                    their favorite platforms.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TemplateEditor;
