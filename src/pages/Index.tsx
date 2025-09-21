import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Users, Shield, MapPin, MessageSquare, FileText, Eye, TreePine } from "lucide-react";
import heroImage from "@/assets/hero-elephant.jpg";
import elephantIcon from "@/assets/elephant-icon.png";
import LoginForm from "@/components/LoginForm";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'dashboard'>('landing');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [language, setLanguage] = useState('english');

  const translations = {
    english: {
      title: "Matriarch",
      subtitle: "Protecting Communities, Preserving Wildlife",
      description: "Real-time elephant alerts, community reporting, and coordination tools to reduce human-elephant conflict across Chhattisgarh.",
      getStarted: "Get Started",
      learnMore: "Learn More",
      forLocals: "For Locals",
      forVolunteers: "For Volunteers", 
      forOfficials: "For Forest Officials",
      localsDesc: "Get real-time alerts, report incidents, apply for compensation",
      volunteersDesc: "Bridge communities and officials, assist in patrols and mapping",
      officialsDesc: "Monitor alerts, coordinate responses, manage compensation claims",
      alertSystem: "Color-Coded Alert System",
      safeZone: "Safe Zone",
      warningZone: "Warning Zone", 
      dangerZone: "Danger Zone",
      features: "Key Features",
      realTimeAlerts: "Real-time Elephant Alerts",
      incidentReporting: "Incident Reporting",
      communityMapping: "Community Mapping",
      compensation: "Compensation System",
      patrolLogging: "Patrol Logging",
      communication: "Group Communication"
    },
    hindi: {
      title: "मैट्रिआर्क",
      subtitle: "समुदायों की सुरक्षा, वन्यजीवों का संरक्षण",
      description: "छत्तीसगढ़ में मानव-हाथी संघर्ष को कम करने के लिए रियल-टाइम हाथी अलर्ट, सामुदायिक रिपोर्टिंग और समन्वय उपकरण।",
      getStarted: "शुरू करें",
      learnMore: "और जानें",
      forLocals: "स्थानीय लोगों के लिए",
      forVolunteers: "स्वयंसेवकों के लिए",
      forOfficials: "वन अधिकारियों के लिए",
      localsDesc: "रियल-टाइम अलर्ट प्राप्त करें, घटनाओं की रिपोर्ट करें, मुआवजे के लिए आवेदन करें",
      volunteersDesc: "समुदायों और अधिकारियों के बीच सेतु, गश्त और मैपिंग में सहायता करें",
      officialsDesc: "अलर्ट की निगरानी करें, प्रतिक्रिया का समन्वय करें, मुआवजा दावों का प्रबंधन करें",
      alertSystem: "रंग-कोडित अलर्ट सिस्टम",
      safeZone: "सुरक्षित क्षेत्र",
      warningZone: "चेतावनी क्षेत्र",
      dangerZone: "खतरे का क्षेत्र",
      features: "मुख्य विशेषताएं",
      realTimeAlerts: "रियल-टाइम हाथी अलर्ट",
      incidentReporting: "घटना रिपोर्टिंग",
      communityMapping: "सामुदायिक मैपिंग",
      compensation: "मुआवजा प्रणाली",
      patrolLogging: "गश्त लॉगिंग",
      communication: "समूह संचार"
    },
    chhattisgarhi: {
      title: "मैट्रिआर्क",
      subtitle: "समुदाय के रक्षा, जंगली जानवर के बचाव",
      description: "छत्तीसगढ़ म मनखे-हाथी के लड़ाई ल कम करे बर रियल-टाइम हाथी अलर्ट, समुदायिक रिपोर्टिंग अउ समन्वय के साधन।",
      getStarted: "सुरू करव",
      learnMore: "अउ जानव",
      forLocals: "लोकल मनखे बर",
      forVolunteers: "स्वयंसेवक मन बर",
      forOfficials: "जंगल अफसर मन बर",
      localsDesc: "रियल-टाइम अलर्ट पावव, घटना के रिपोर्ट करव, मुआवजा बर अरजी करव",
      volunteersDesc: "समुदाय अउ अफसर मन के बीच जोड़व, गस्त अउ मैपिंग म मदद करव",
      officialsDesc: "अलर्ट के निगरानी करव, जवाब के समन्वय करव, मुआवजा दावा के व्यवस्था करव",
      alertSystem: "रंग-कोड अलर्ट सिस्टम",
      safeZone: "सुरक्षित इलाका",
      warningZone: "चेतावनी इलाका",
      dangerZone: "खतरा के इलाका",
      features: "मुख्य विशेषता मन",
      realTimeAlerts: "रियल-टाइम हाथी अलर्ट",
      incidentReporting: "घटना रिपोर्टिंग",
      communityMapping: "समुदायिक मैपिंग",
      compensation: "मुआवजा व्यवस्था",
      patrolLogging: "गस्त लॉगिंग",
      communication: "समूह संपर्क"
    }
  };

  const t = translations[language as keyof typeof translations];

  if (currentView === 'login') {
    return (
      <LoginForm 
        selectedRole={selectedRole}
        language={language}
        onBack={() => setCurrentView('landing')}
        onLogin={() => setCurrentView('dashboard')}
      />
    );
  }

  if (currentView === 'dashboard') {
    return <Dashboard selectedRole={selectedRole} language={language} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={elephantIcon} alt="Elephant Icon" className="w-8 h-8" />
            <h1 className="text-xl font-bold text-foreground">{t.title}</h1>
          </div>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="hindi">हिन्दी</SelectItem>
              <SelectItem value="chhattisgarhi">छत्तीसगढ़ी</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Elephant in Chhattisgarh Forest" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/50" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-5xl font-bold mb-4 text-foreground">{t.title}</h2>
            <p className="text-2xl mb-6 text-primary font-semibold">{t.subtitle}</p>
            <p className="text-lg mb-8 text-muted-foreground max-w-2xl">{t.description}</p>
            <div className="flex gap-4">
              <Button 
                size="lg" 
                className="gradient-forest text-primary-foreground hover:opacity-90"
                onClick={() => setCurrentView('login')}
              >
                <TreePine className="w-5 h-5 mr-2" />
                {t.getStarted}
              </Button>
              <Button size="lg" variant="outline">
                {t.learnMore}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">Who Can Use This App?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-8 h-8 text-primary" />
                  <CardTitle className="text-xl">{t.forLocals}</CardTitle>
                </div>
                <CardDescription className="text-base">{t.localsDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => {
                    setSelectedRole('local');
                    setCurrentView('login');
                  }}
                >
                  Sign Up as Local
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-8 h-8 text-primary" />
                  <CardTitle className="text-xl">{t.forVolunteers}</CardTitle>
                </div>
                <CardDescription className="text-base">{t.volunteersDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => {
                    setSelectedRole('volunteer');
                    setCurrentView('login');
                  }}
                >
                  Sign Up as Volunteer
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Eye className="w-8 h-8 text-primary" />
                  <CardTitle className="text-xl">{t.forOfficials}</CardTitle>
                </div>
                <CardDescription className="text-base">{t.officialsDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => {
                    setSelectedRole('official');
                    setCurrentView('login');
                  }}
                >
                  Sign Up as Official
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Alert System */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">{t.alertSystem}</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-success/20 gradient-alert-safe">
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-full bg-success/20 mx-auto mb-4 flex items-center justify-center alert-pulse-safe">
                  <Shield className="w-8 h-8 text-success-foreground" />
                </div>
                <CardTitle className="text-success-foreground">{t.safeZone}</CardTitle>
                <CardDescription className="text-success-foreground/80">
                  No elephants detected within 5km radius. Normal activities can continue.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-warning/20 gradient-alert-warning">
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-full bg-warning/20 mx-auto mb-4 flex items-center justify-center alert-pulse-warning">
                  <AlertTriangle className="w-8 h-8 text-warning-foreground" />
                </div>
                <CardTitle className="text-warning-foreground">{t.warningZone}</CardTitle>
                <CardDescription className="text-warning-foreground/80">
                  Elephants detected 2-5km away. Stay alert and avoid forest areas.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-destructive/20 gradient-alert-danger">
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-full bg-destructive/20 mx-auto mb-4 flex items-center justify-center alert-pulse-danger">
                  <AlertTriangle className="w-8 h-8 text-destructive-foreground" />
                </div>
                <CardTitle className="text-destructive-foreground">{t.dangerZone}</CardTitle>
                <CardDescription className="text-destructive-foreground/80">
                  Elephants within 2km! Stay indoors and follow safety protocols immediately.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">{t.features}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: AlertTriangle, title: t.realTimeAlerts, desc: "Instant notifications when elephants are detected near your location" },
              { icon: FileText, title: t.incidentReporting, desc: "Report sightings, crop damage, and incidents with photo evidence" },
              { icon: MapPin, title: t.communityMapping, desc: "Add new landmarks, fields, and water bodies to improve accuracy" },
              { icon: Shield, title: t.compensation, desc: "Apply for government compensation with streamlined process" },
              { icon: Eye, title: t.patrolLogging, desc: "Log patrol routes and findings for better coordination" },
              { icon: MessageSquare, title: t.communication, desc: "Group chat for patrol teams and emergency coordination" }
            ].map((feature, index) => (
              <Card key={index} className="hover:shadow-md transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <feature.icon className="w-6 h-6 text-primary" />
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                  <CardDescription>{feature.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src={elephantIcon} alt="Elephant Icon" className="w-6 h-6" />
            <span className="font-semibold text-foreground">{t.title}</span>
          </div>
          <p className="text-muted-foreground">
            Reducing human-elephant conflict through technology and community cooperation
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;