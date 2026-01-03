
import { initializeMLModel, predictWithML, extractMLFeatures } from './mlModel';

interface MLScanResult {
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

let isModelInitialized = false;

export const scanURLWithML = async (url: string): Promise<MLScanResult> => {
  // Initialize model if not already done
  if (!isModelInitialized) {
    await initializeMLModel();
    isModelInitialized = true;
  }

  // Extract features for ML model
  const mlFeatures = extractMLFeatures(url);
  
  // Get ML prediction (0 = safe, 1 = phishing)
  const mlPrediction = predictWithML(mlFeatures);
  
  // Extract readable features
  const urlObj = new URL(url);
  const domain = urlObj.hostname;
  const path = urlObj.pathname;
  const queryString = urlObj.search;
  
  const suspiciousWords = [
    'login', 'signin', 'verify', 'verification', 'secure', 'account',
    'payment', 'update', 'confirm', 'paypal', 'banking', 'security',
    'limited', 'appleid', 'wallet', 'alert', 'purchase', 'transaction'
  ];
  
  const features = {
    domainLength: domain.length,
    hasSubdomain: (domain.match(/\./g) || []).length > 1,
    pathLength: path.length,
    hasHTTPS: urlObj.protocol === 'https:',
    queryParams: queryString ? queryString.split("&").length : 0,
    hasSuspiciousWords: suspiciousWords.some(word => domain.toLowerCase().includes(word)),
    hasExcessivePunctuation: (domain.match(/[-_!@#$%^&*()]/g) || []).length > 2
  };

  // Calculate confidence based on how far the prediction is from 0.5
  const confidence = Math.abs(mlPrediction - 0.5) * 2;
  
  // Determine if URL is safe (threshold: 0.5)
  const isSafe = mlPrediction < 0.5;
  
  console.log(`🧠 ML Analysis: ${url}`);
  console.log(`📊 Prediction: ${mlPrediction.toFixed(3)} (${isSafe ? 'SAFE' : 'PHISHING'})`);
  console.log(`🎯 Confidence: ${(confidence * 100).toFixed(1)}%`);

  return {
    isSafe,
    score: mlPrediction,
    confidence,
    mlPrediction,
    features
  };
};
