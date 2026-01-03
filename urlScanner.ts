
// This is a mock implementation of a URL scanner
// In a real application, this would connect to a real ML service 
// or use an ML model compiled to JavaScript/WASM

interface ScanResult {
  isSafe: boolean;
  score: number;
  features: URLFeatures;
}

interface URLFeatures {
  domainLength: number;
  hasSubdomain: boolean;
  pathLength: number;
  hasHTTPS: boolean;
  queryParams: number;
  hasSuspiciousWords: boolean;
  hasExcessivePunctuation: boolean;
}

const SUSPICIOUS_WORDS = [
  'login', 'signin', 'verify', 'verification', 'secure', 'account',
  'payment', 'update', 'confirm', 'paypal', 'banking', 'security',
  'limited', 'appleid', 'wallet', 'alert', 'purchase', 'transaction'
];

const analyzeURL = (urlString: string): URLFeatures => {
  try {
    // Create URL object to parse the URL properly
    const url = new URL(urlString);
    
    // Extract domain information
    const domain = url.hostname;
    const protocol = url.protocol;
    const path = url.pathname;
    const queryString = url.search;
    
    // Check if domain contains suspicious words
    const lowerDomain = domain.toLowerCase();
    const hasSuspiciousWords = SUSPICIOUS_WORDS.some(word => 
      lowerDomain.includes(word)
    );
    
    // Count dots in domain to determine if it's a subdomain
    const dotCount = (domain.match(/\./g) || []).length;
    const hasSubdomain = dotCount > 1;
    
    // Count query parameters
    const queryParams = queryString ? queryString.split("&").length : 0;
    
    // Check for excessive punctuation in domain
    const punctuationCount = (domain.match(/[-_!@#$%^&*()]/g) || []).length;
    const hasExcessivePunctuation = punctuationCount > 2;
    
    return {
      domainLength: domain.length,
      hasSubdomain,
      pathLength: path.length,
      hasHTTPS: protocol === 'https:',
      queryParams,
      hasSuspiciousWords,
      hasExcessivePunctuation
    };
  } catch (error) {
    console.error("Error parsing URL:", error);
    
    // Return default values if URL parsing fails
    return {
      domainLength: 0,
      hasSubdomain: false,
      pathLength: 0,
      hasHTTPS: false,
      queryParams: 0,
      hasSuspiciousWords: false,
      hasExcessivePunctuation: false
    };
  }
};

const calculateRiskScore = (features: URLFeatures): number => {
  let score = 0;
  
  // Higher domain length (over 20 chars) increases risk slightly
  if (features.domainLength > 20) score += 0.1;
  if (features.domainLength > 30) score += 0.1;
  
  // Subdomains increase risk
  if (features.hasSubdomain) score += 0.2;
  
  // Long paths increase risk
  if (features.pathLength > 20) score += 0.1;
  if (features.pathLength > 50) score += 0.2;
  
  // No HTTPS is a significant risk factor
  if (!features.hasHTTPS) score += 0.3;
  
  // Many query parameters increase risk
  if (features.queryParams > 3) score += 0.1;
  if (features.queryParams > 6) score += 0.1;
  
  // Suspicious words are a major red flag
  if (features.hasSuspiciousWords) score += 0.3;
  
  // Excessive punctuation is suspicious
  if (features.hasExcessivePunctuation) score += 0.2;
  
  // Clamp score between 0 and 1
  return Math.min(Math.max(score, 0), 0.95);
};

export const scanURL = async (url: string): Promise<ScanResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Analyze URL and calculate risk score
  const features = analyzeURL(url);
  const score = calculateRiskScore(features);
  
  // Determine if URL is safe based on score threshold
  const isSafe = score < 0.4;
  
  return {
    isSafe,
    score,
    features
  };
};
