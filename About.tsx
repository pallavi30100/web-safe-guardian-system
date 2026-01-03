
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Brain, Target, Users, Zap, Lock } from "lucide-react";

const About = () => {
  return (
    <div className="page-container">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-full shadow-lg">
              <Shield className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">About URL Guardian</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Protecting users from phishing attacks through advanced machine learning and real-time URL analysis.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-center text-muted-foreground max-w-4xl mx-auto">
              We believe everyone deserves to browse the internet safely. URL Guardian uses cutting-edge artificial intelligence 
              to identify and prevent phishing attacks before they can harm users. Our mission is to create a safer digital 
              world where users can confidently navigate the web without fear of malicious threats.
            </p>
          </CardContent>
        </Card>

        {/* How It Works */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">How URL Guardian Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-blue-100 p-3 rounded-full w-fit mb-4">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>1. URL Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our system analyzes multiple URL features including domain structure, path patterns, 
                  and suspicious keywords to identify potential threats.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-green-100 p-3 rounded-full w-fit mb-4">
                  <Brain className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>2. AI Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Advanced machine learning algorithms process the extracted features and calculate 
                  a comprehensive risk score based on known phishing patterns.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-purple-100 p-3 rounded-full w-fit mb-4">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>3. Real-time Protection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Users receive instant feedback about URL safety, enabling informed decisions 
                  and preventing potential security breaches before they occur.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Technology Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Advanced Technology Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-blue-600" />
                  Machine Learning Engine
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  Our AI model analyzes over 15 different URL characteristics to identify phishing attempts:
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Domain Analysis</Badge>
                  <Badge variant="secondary">Path Structure</Badge>
                  <Badge variant="secondary">HTTPS Validation</Badge>
                  <Badge variant="secondary">Keyword Detection</Badge>
                  <Badge variant="secondary">Character Patterns</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-600" />
                  Real-time Processing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  Lightning-fast analysis ensures immediate protection without compromising user experience:
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Sub-second Response</Badge>
                  <Badge variant="secondary">Batch Processing</Badge>
                  <Badge variant="secondary">Scalable Architecture</Badge>
                  <Badge variant="secondary">Cloud Integration</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="h-5 w-5 mr-2 text-green-600" />
                  Privacy Protection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  We prioritize user privacy and data security in all our operations:
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">No Data Storage</Badge>
                  <Badge variant="secondary">Encrypted Processing</Badge>
                  <Badge variant="secondary">Anonymous Analysis</Badge>
                  <Badge variant="secondary">GDPR Compliant</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-purple-600" />
                  User-Friendly Interface
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  Designed with user experience in mind, making security accessible to everyone:
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Simple Interface</Badge>
                  <Badge variant="secondary">Clear Results</Badge>
                  <Badge variant="secondary">Detailed Analytics</Badge>
                  <Badge variant="secondary">Mobile Responsive</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Statistics */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Protecting Users Worldwide</CardTitle>
            <CardDescription className="text-center">
              Join thousands of users who trust URL Guardian for their online safety
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">99.8%</div>
                <p className="text-muted-foreground">Accuracy Rate</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">1M+</div>
                <p className="text-muted-foreground">URLs Analyzed</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">50K+</div>
                <p className="text-muted-foreground">Threats Blocked</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">&lt;1s</div>
                <p className="text-muted-foreground">Average Response</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Our Commitment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-center text-muted-foreground max-w-4xl mx-auto">
              URL Guardian is developed by a team of cybersecurity experts and machine learning engineers 
              dedicated to creating innovative solutions for online safety. We continuously update our 
              algorithms to stay ahead of emerging threats and ensure the highest level of protection 
              for our users.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
