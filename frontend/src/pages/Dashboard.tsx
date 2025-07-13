import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, LogOut, Plus, Eye, Download, Edit, Sparkles, TrendingUp, Clock, Star, ArrowRight, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { templateService } from "@/services/templateService";
import { projectService } from "@/services/projectService";
import { ThemeToggle } from "@/components/theme-toggle";
import { Navbar } from "@/components/Navbar";

interface Template {
  id: string;
  name: string;
  industry: string;
  description: string;
  preview_image: string;
}

interface Project {
  id: string;
  name: string;
  template_name: string;
  industry: string;
  created_at: string;
  updated_at: string;
}

const Dashboard = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      navigate('/signin');
      return;
    }

    setUser(JSON.parse(userData));
    loadDashboardData();
  }, [navigate]);

  const loadDashboardData = async () => {
    try {
      const [templatesData, projectsData] = await Promise.all([
        templateService.getTemplates(),
        projectService.getUserProjects()
      ]);
      setTemplates(templatesData);
      setProjects(projectsData);
    } catch (error) {
      toast({
        title: "Error loading data",
        description: "Failed to load dashboard data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleTemplateSelect = (template: Template) => {
    navigate(`/editor/${template.id}`);
  };

  const handleProjectEdit = (project: Project) => {
    navigate(`/editor/project/${project.id}`);
  };

  const handleProjectPreview = (project: Project) => {
    navigate(`/preview/${project.id}`);
  };

  const handleProjectDownload = async (project: Project) => {
    try {
      await projectService.downloadProject(project.id);
      toast({
        title: "Download started",
        description: "Your project files are being prepared for download.",
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Failed to download project. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
            <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-blue-600" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">Loading your dashboard...</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Preparing your workspace ✨</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      {/* Enhanced Header */}
     <Navbar/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Welcome Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full px-6 py-3 mb-6">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">Dashboard</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome back, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{user?.name}</span>!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Continue building amazing websites with our professional templates and powerful customization tools.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-2xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-bold">Total Projects</p>
                  <p className="text-3xl font-bold">{projects.length}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Globe className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-2xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Templates Available</p>
                  <p className="text-3xl font-bold">{templates.length}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Star className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* <Card className="border-0 shadow-xl bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-2xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Quick Actions</p>
                  <p className="text-lg font-semibold">Ready to build</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Zap className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card> */}
        </div>

        {/* Projects Section */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Your Projects</h2>
              <p className="text-gray-600 dark:text-gray-300">Manage and continue working on your website projects</p>
            </div>
          </div>
          
          {projects.length === 0 ? (
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden">
              <CardContent className="p-12 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Plus className="h-12 w-12 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">No projects yet</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
                  You haven't created any projects yet. Choose a template below to get started and build your first website.
                </p>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl px-8" onClick={()=>navigate("/templates")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Project
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden hover:scale-105">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700/50 dark:to-blue-900/20">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <Globe className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="h-3 w-3" />
                        <span>{getTimeAgo(project.updated_at)}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.name}
                    </CardTitle>
                    <CardDescription className="dark:text-gray-300">
                      <span className="inline-flex items-center space-x-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span>{project.template_name}</span>
                      </span>
                      <span className="block text-xs mt-1 text-blue-600 dark:text-blue-400 font-medium">
                        {project.industry}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleProjectEdit(project)}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl group"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        <span>Edit</span>
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleProjectPreview(project)}
                        className="border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 dark:border-gray-600 dark:hover:border-blue-500 dark:hover:bg-blue-900/20 transition-all duration-200 rounded-xl"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleProjectDownload(project)}
                        className="border-2 border-gray-200 hover:border-green-400 hover:bg-green-50 dark:border-gray-600 dark:hover:border-green-500 dark:hover:bg-green-900/20 transition-all duration-200 rounded-xl"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Templates Section */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Choose a Template</h2>
              <p className="text-gray-600 dark:text-gray-300">Start a new project with our professional templates</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.slice(0, 6).map((template) => (
              <Card key={template.id} className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden hover:scale-105" onClick={() => handleTemplateSelect(template)}>
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-t-2xl flex items-center justify-center overflow-hidden">
                  <img
                    src={template.preview_image || '/placeholder.svg'}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full">
                      {template.industry}
                    </span>
                  </div>
                  <CardTitle className="text-lg dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {template.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">{template.description}</p>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl group">
                    <Plus className="h-4 w-4 mr-2" />
                    <span>Use This Template</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {templates.length > 6 && (
            <div className="text-center mt-8">
              <Button
                variant="outline"
                onClick={() => navigate('/templates')}
                className="border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 dark:border-blue-800 dark:hover:border-blue-600 dark:hover:bg-blue-900/20 transition-all duration-200 rounded-xl px-8"
              >
                View All Templates
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;