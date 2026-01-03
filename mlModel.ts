
// Simple neural network for phishing detection
class NeuralNetwork {
  private weights1: number[][];
  private weights2: number[];
  private bias1: number[];
  private bias2: number;

  constructor() {
    // Initialize small random weights
    this.weights1 = this.randomMatrix(7, 8); // 7 input features -> 8 hidden neurons
    this.weights2 = this.randomArray(8); // 8 hidden -> 1 output
    this.bias1 = this.randomArray(8);
    this.bias2 = Math.random() * 0.1 - 0.05;
  }

  private randomMatrix(rows: number, cols: number): number[][] {
    return Array(rows).fill(0).map(() => 
      Array(cols).fill(0).map(() => Math.random() * 0.1 - 0.05)
    );
  }

  private randomArray(size: number): number[] {
    return Array(size).fill(0).map(() => Math.random() * 0.1 - 0.05);
  }

  private sigmoid(x: number): number {
    return 1 / (1 + Math.exp(-x));
  }

  private relu(x: number): number {
    return Math.max(0, x);
  }

  predict(features: number[]): number {
    // Forward pass
    // Hidden layer
    const hidden = this.weights1[0].map((_, i) => {
      let sum = this.bias1[i];
      for (let j = 0; j < features.length; j++) {
        sum += features[j] * this.weights1[j][i];
      }
      return this.relu(sum);
    });

    // Output layer
    let output = this.bias2;
    for (let i = 0; i < hidden.length; i++) {
      output += hidden[i] * this.weights2[i];
    }

    return this.sigmoid(output);
  }

  train(trainingData: { features: number[], label: number }[], epochs: number = 100): void {
    const learningRate = 0.01;

    for (let epoch = 0; epoch < epochs; epoch++) {
      for (const sample of trainingData) {
        // Forward pass
        const hidden = this.weights1[0].map((_, i) => {
          let sum = this.bias1[i];
          for (let j = 0; j < sample.features.length; j++) {
            sum += sample.features[j] * this.weights1[j][i];
          }
          return this.relu(sum);
        });

        let output = this.bias2;
        for (let i = 0; i < hidden.length; i++) {
          output += hidden[i] * this.weights2[i];
        }
        const prediction = this.sigmoid(output);

        // Backward pass (simplified)
        const error = sample.label - prediction;
        const outputGradient = error * prediction * (1 - prediction);

        // Update output weights
        for (let i = 0; i < this.weights2.length; i++) {
          this.weights2[i] += learningRate * outputGradient * hidden[i];
        }
        this.bias2 += learningRate * outputGradient;

        // Update hidden weights (simplified)
        for (let i = 0; i < this.weights1.length; i++) {
          for (let j = 0; j < this.weights1[i].length; j++) {
            if (hidden[j] > 0) { // ReLU derivative
              const hiddenGradient = outputGradient * this.weights2[j];
              this.weights1[i][j] += learningRate * hiddenGradient * sample.features[i];
            }
          }
        }
      }
    }
  }
}

// Training data - phishing vs legitimate URLs
const getTrainingData = () => [
  // Legitimate URLs (label: 0)
  { features: [10, 0, 5, 1, 0, 0, 0], label: 0 }, // google.com
  { features: [11, 0, 6, 1, 0, 0, 0], label: 0 }, // github.com
  { features: [12, 0, 4, 1, 0, 0, 0], label: 0 }, // amazon.com
  { features: [13, 0, 8, 1, 1, 0, 0], label: 0 }, // stackoverflow.com
  { features: [9, 0, 3, 1, 0, 0, 0], label: 0 },  // apple.com
  { features: [8, 0, 7, 1, 0, 0, 0], label: 0 },  // meta.com
  { features: [14, 0, 5, 1, 2, 0, 0], label: 0 }, // microsoft.com
  
  // Phishing URLs (label: 1)
  { features: [35, 1, 25, 0, 5, 1, 1], label: 1 }, // secure-paypal-verify-account.suspicious.com
  { features: [42, 1, 30, 0, 8, 1, 1], label: 1 }, // apple-id-verification-required.fake.org
  { features: [38, 1, 22, 0, 6, 1, 1], label: 1 }, // amazon-security-update.phish.net
  { features: [45, 1, 35, 0, 10, 1, 1], label: 1 }, // banking-alert-login-immediately.scam.com
  { features: [33, 1, 28, 0, 7, 1, 0], label: 1 }, // paypal-limited-account.fake.co
  { features: [40, 1, 32, 0, 9, 1, 1], label: 1 }, // microsoft-security-verification.phishing.org
  { features: [36, 1, 26, 0, 4, 1, 1], label: 1 }, // google-account-suspended.malicious.net
];

let trainedModel: NeuralNetwork | null = null;

export const initializeMLModel = (): Promise<void> => {
  return new Promise((resolve) => {
    console.log("🤖 Training ML model for phishing detection...");
    
    trainedModel = new NeuralNetwork();
    const trainingData = getTrainingData();
    
    // Train the model
    trainedModel.train(trainingData, 200);
    
    console.log("✅ ML model training completed!");
    resolve();
  });
};

export const predictWithML = (features: number[]): number => {
  if (!trainedModel) {
    throw new Error("ML model not initialized. Call initializeMLModel() first.");
  }
  
  return trainedModel.predict(features);
};

// Feature extraction for ML model
export const extractMLFeatures = (url: string): number[] => {
  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname;
    const path = urlObj.pathname;
    const queryString = urlObj.search;
    
    const suspiciousWords = [
      'login', 'signin', 'verify', 'verification', 'secure', 'account',
      'payment', 'update', 'confirm', 'paypal', 'banking', 'security',
      'limited', 'appleid', 'wallet', 'alert', 'purchase', 'transaction'
    ];
    
    return [
      domain.length, // Feature 1: Domain length
      (domain.match(/\./g) || []).length > 1 ? 1 : 0, // Feature 2: Has subdomain
      path.length, // Feature 3: Path length
      urlObj.protocol === 'https:' ? 1 : 0, // Feature 4: HTTPS
      queryString ? queryString.split("&").length : 0, // Feature 5: Query params
      suspiciousWords.some(word => domain.toLowerCase().includes(word)) ? 1 : 0, // Feature 6: Suspicious words
      (domain.match(/[-_!@#$%^&*()]/g) || []).length > 2 ? 1 : 0 // Feature 7: Excessive punctuation
    ];
  } catch (error) {
    console.error("Error extracting ML features:", error);
    return [0, 0, 0, 0, 0, 0, 0];
  }
};
