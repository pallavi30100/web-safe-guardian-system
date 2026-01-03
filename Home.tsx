
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle, AlertCircle, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import URLScanResult from "../components/URLScanResult";
import { scanURLWithML } from "../utils/mlUrlScanner";

// Updated interface to match ML scanner
interface ScanResult {
  isSafe: boolean;
  score: number;
  confidence: number;
  mlPrediction: number;
  features: {
    domainLength: number;
    hasSubdomain: boolean;
    pathLength: number;
    hasHTTPS: boolean;
    queryParams: number;
    hasSuspiciousWords: boolean;
    hasExcessivePunctuation: boolean;
  };
}

const Home = () => {
  const [url, setUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const { toast } = useToast();

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a URL to scan",
        variant: "destructive",
      });
      return;
    }

    // Simple URL validation
    try {
      new URL(url);
    } catch (error) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL including http:// or https://",
        variant: "destructive",
      });
      return;
    }

    setIsScanning(true);

    try {
      // Use ML-powered scanner
      const result = await scanURLWithML(url);
      setScanResult(result);
      
      if (result.isSafe) {
        toast({
          title: "URL is safe",
          description: `ML model confidence: ${(result.confidence * 100).toFixed(1)}%`,
          duration: 5000,
        });
      } else {
        toast({
          title: "⚠️ Phishing detected by AI!",
          description: `High-risk URL detected with ${(result.confidence * 100).toFixed(1)}% confidence`,
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("ML scan error:", error);
      toast({
        title: "AI scan failed",
        description: "Unable to analyze the URL with ML model. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="page-container">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">AI-Powered Phishing Detection</h1>
          <p className="text-xl text-muted-foreground">
            Advanced machine learning model analyzes URLs in real-time
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="h-5 w-5 mr-2 text-blue-600" />
              AI URL Scanner
            </CardTitle>
            <CardDescription>
              Neural network trained on phishing patterns - analyzes URLs in your browser
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleScan} className="flex flex-col md:flex-row gap-4">
              <Input
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-grow url-input"
              />
              <Button type="submit" disabled={isScanning}>
                {isScanning ? "🧠 AI Analyzing..." : "🚀 Scan with AI"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {scanResult && <URLScanResult result={scanResult} url={url} />}

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2 text-blue-600" />
                Neural Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Custom neural network trained on URL patterns, running entirely in your browser for privacy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-warning" />
                Real-time Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Instant predictions with confidence scores based on domain structure and suspicious patterns.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-safe" />
                Privacy First
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                All analysis happens locally in your browser. No URLs are sent to external servers.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
