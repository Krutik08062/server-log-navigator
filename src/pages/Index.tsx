
import { useState } from 'react';
import { Upload, BarChart3, Activity, Globe, Shield, FileText, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import FileUpload from '@/components/FileUpload';
import Dashboard from '@/components/Dashboard';
import StatsCard from '@/components/StatsCard';

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    // Simulate analysis process
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      // Mock analysis data - in real app this would come from actual log parsing
      setAnalysisData({
        totalRequests: 15847,
        uniqueIPs: 1249,
        errorRate: 3.2,
        avgResponseTime: 245
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen animated-bg">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-2xl mb-8 pulse-glow">
              <BarChart3 className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-shadow">
              Log File <span className="gradient-text">Analyzer</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Transform your server logs into actionable insights with advanced analytics, 
              real-time monitoring, and beautiful visualizations.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="analytics-card text-center group">
              <Activity className="w-12 h-12 text-chart-2 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Real-time Analysis</h3>
              <p className="text-muted-foreground">Process logs instantly with advanced parsing algorithms</p>
            </Card>
            <Card className="analytics-card text-center group">
              <Globe className="w-12 h-12 text-chart-3 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Geo Mapping</h3>
              <p className="text-muted-foreground">Visualize traffic patterns across global locations</p>
            </Card>
            <Card className="analytics-card text-center group">
              <Shield className="w-12 h-12 text-chart-4 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Security Insights</h3>
              <p className="text-muted-foreground">Detect anomalies and suspicious activities</p>
            </Card>
          </div>

          {/* Quick Stats */}
          {analysisData && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 animate-fade-in">
              <StatsCard
                title="Total Requests"
                value={analysisData.totalRequests.toLocaleString()}
                icon={<FileText className="w-5 h-5" />}
                trend="+12.5%"
                color="primary"
              />
              <StatsCard
                title="Unique IPs"
                value={analysisData.uniqueIPs.toLocaleString()}
                icon={<Globe className="w-5 h-5" />}
                trend="+8.3%"
                color="success"
              />
              <StatsCard
                title="Error Rate"
                value={`${analysisData.errorRate}%`}
                icon={<Shield className="w-5 h-5" />}
                trend="-2.1%"
                color="warning"
              />
              <StatsCard
                title="Avg Response"
                value={`${analysisData.avgResponseTime}ms`}
                icon={<TrendingUp className="w-5 h-5" />}
                trend="-15ms"
                color="chart-2"
              />
            </div>
          )}

          {/* Main Content */}
          {!selectedFile ? (
            <div className="max-w-2xl mx-auto">
              <FileUpload onFileSelect={handleFileSelect} />
              
              <div className="mt-12 text-center">
                <h3 className="text-2xl font-semibold mb-4">Supported Log Formats</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Apache', 'Nginx', 'IIS', 'Custom'].map((format) => (
                    <div key={format} className="bg-muted/20 rounded-lg p-4 border border-border/30">
                      <span className="font-medium text-sm">{format}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-fade-in">
              {isAnalyzing ? (
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 animate-spin">
                    <BarChart3 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">Analyzing Your Logs</h3>
                  <p className="text-muted-foreground">Processing {selectedFile.name}...</p>
                </div>
              ) : (
                <Dashboard file={selectedFile} data={analysisData} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
