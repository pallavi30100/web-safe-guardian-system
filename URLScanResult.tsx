
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle, AlertCircle, Brain, Target } from "lucide-react";

interface URLScanResultProps {
  result: {
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
  };
  url: string;
}

const URLScanResult = ({ result, url }: URLScanResultProps) => {
  const { isSafe, score, confidence, mlPrediction, features } = result;
  
  const riskLevel = score < 0.3 ? 'Low' : score < 0.7 ? 'Medium' : 'High';
  const riskColor = score < 0.3 ? 'text-green-600' : score < 0.7 ? 'text-yellow-600' : 'text-red-600';

  const StatusIcon = isSafe ? CheckCircle : score < 0.7 ? AlertTriangle : AlertCircle;
  const statusColor = isSafe ? 'text-green-500' : score < 0.7 ? 'text-yellow-500' : 'text-red-500';

  return (
    <div className="space-y-6">
      <Alert className={`border-l-4 ${isSafe ? 'border-l-green-500 bg-green-50' : 'border-l-red-500 bg-red-50'}`}>
        <StatusIcon className={`h-5 w-5 ${statusColor}`} />
        <AlertDescription className="font-medium">
          {isSafe 
            ? `✅ AI Analysis: URL appears safe (${(confidence * 100).toFixed(1)}% confidence)`
            : `🚨 AI Warning: Potential phishing detected (${(confidence * 100).toFixed(1)}% confidence)`
          }
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="h-5 w-5 mr-2 text-blue-600" />
              AI Analysis
            </CardTitle>
            <CardDescription>Neural network prediction for: {url}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">AI Prediction</span>
              <Badge variant={isSafe ? "default" : "destructive"}>
                {isSafe ? "🛡️ Safe" : "⚠️ Phishing"}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Risk Level</span>
                <span className={`text-sm font-bold ${riskColor}`}>{riskLevel}</span>
              </div>
              <Progress 
                value={score * 100} 
                className="h-3"
              />
              <p className="text-xs text-muted-foreground">
                ML Score: {mlPrediction.toFixed(3)} | Confidence: {(confidence * 100).toFixed(1)}%
              </p>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Model Confidence</span>
              <div className="flex items-center">
                <Target className="h-4 w-4 mr-1 text-blue-500" />
                <span className="font-bold text-blue-600">
                  {(confidence * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feature Analysis</CardTitle>
            <CardDescription>Detailed breakdown of analyzed features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Domain Length:</span>
                  <span className="font-medium">{features.domainLength} chars</span>
                </div>
                <div className="flex justify-between">
                  <span>Has Subdomain:</span>
                  <Badge variant={features.hasSubdomain ? "destructive" : "secondary"} className="text-xs">
                    {features.hasSubdomain ? "Yes" : "No"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Path Length:</span>
                  <span className="font-medium">{features.pathLength} chars</span>
                </div>
                <div className="flex justify-between">
                  <span>Uses HTTPS:</span>
                  <Badge variant={features.hasHTTPS ? "default" : "destructive"} className="text-xs">
                    {features.hasHTTPS ? "Yes" : "No"}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Query Params:</span>
                  <span className="font-medium">{features.queryParams}</span>
                </div>
                <div className="flex justify-between">
                  <span>Suspicious Words:</span>
                  <Badge variant={features.hasSuspiciousWords ? "destructive" : "secondary"} className="text-xs">
                    {features.hasSuspiciousWords ? "Found" : "None"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Excess Punctuation:</span>
                  <Badge variant={features.hasExcessivePunctuation ? "destructive" : "secondary"} className="text-xs">
                    {features.hasExcessivePunctuation ? "Yes" : "No"}
                  </Badge>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">🧠 AI Status:</span>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      Active
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default URLScanResult;
