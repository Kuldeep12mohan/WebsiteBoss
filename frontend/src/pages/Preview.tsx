
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Edit } from "lucide-react";
import { projectService } from "@/services/projectService";
import { templateService } from "@/services/templateService";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/theme-toggle";
import { Navbar } from "@/components/Navbar";

const Preview = () => {
  const { projectId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [htmlContent, setHtmlContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPreview();
  }, [projectId]);

  const loadPreview = async () => {
    try {
      if (projectId === 'new' && location.state) {
        // Generate preview from template and custom data
        const { template, customData } = location.state;
        const previewData = await templateService.generatePreview(template, customData);
        setHtmlContent(previewData.html);
      } else if (projectId) {
        // Load existing project
        const project = await projectService.getProject(projectId);
        
        // Create complete HTML with inlined CSS and JS
        const completeHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview</title>
    <style>
        ${project.css_content || ''}
    </style>
</head>
<body>
    ${project.html_content || ''}
    ${project.js_content ? `<script>${project.js_content}</script>` : ''}
</body>
</html>
        `;
        setHtmlContent(completeHtml);
      }
    } catch (error) {
      console.error('Failed to load preview:', error);
      toast({
        title: "Error",
        description: "Failed to load preview. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (projectId === 'new') {
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading preview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
    <Navbar/>

      {/* Preview Frame */}
      <div className="p-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-200 dark:bg-gray-700 px-4 py-2 flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex-1 bg-white dark:bg-gray-600 rounded px-3 py-1 text-sm text-gray-600 dark:text-gray-300">
                Preview - Your Website
              </div>
            </div>
            
            <div className="h-[calc(100vh-200px)]">
              <iframe
                srcDoc={htmlContent}
                className="w-full h-full border-0"
                title="Website Preview"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
