import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  AlertTriangle, 
  MapPin, 
  MessageSquare, 
  FileText, 
  Camera, 
  Phone,
  Shield,
  Eye,
  Users,
  Bell,
  TreePine,
  Upload,
  Send,
  LogOut
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import elephantIcon from "@/assets/elephant-icon.png";

interface DashboardProps {
  selectedRole: string;
  language: string;
}

const Dashboard = ({ selectedRole, language }: DashboardProps) => {
  const [alertLevel, setAlertLevel] = useState<'safe' | 'warning' | 'danger'>('safe');
  const [activeTab, setActiveTab] = useState('alerts');
  const { toast } = useToast();

  const translations = {
    english: {
      dashboard: "Dashboard",
      alerts: "Alerts",
      reports: "Reports", 
      patrol: "Patrol",
      map: "Map",
      chat: "Chat",
      compensation: "Compensation",
      currentStatus: "Current Status",
      safeZone: "Safe Zone",
      warningZone: "Warning Zone",
      dangerZone: "Danger Zone",
      nearbyAlerts: "Nearby Alerts",
      quickReport: "Quick Report",
      reportIncident: "Report Incident",
      incidentType: "Incident Type",
      location: "Location",
      description: "Description",
      attachPhoto: "Attach Photo/Video",
      submit: "Submit Report",
      patrolLog: "Patrol Log",
      startPatrol: "Start Patrol",
      endPatrol: "End Patrol",
      addCheckpoint: "Add Checkpoint",
      elephantSighting: "Elephant Sighting",
      cropDamage: "Crop Damage",
      accident: "Accident/Injury",
      illegalActivity: "Illegal Activity",
      forestFire: "Forest Fire",
      other: "Other",
      sendMessage: "Send Message",
      typeMessage: "Type your message...",
      emergencyContact: "Emergency Contact",
      callForestDept: "Call Forest Department",
      logout: "Logout"
    },
    hindi: {
      dashboard: "डैशबोर्ड",
      alerts: "अलर्ट",
      reports: "रिपोर्ट्स",
      patrol: "गश्त",
      map: "मैप",
      chat: "चैट", 
      compensation: "मुआवजा",
      currentStatus: "वर्तमान स्थिति",
      safeZone: "सुरक्षित क्षेत्र",
      warningZone: "चेतावनी क्षेत्र", 
      dangerZone: "खतरे का क्षेत्र",
      nearbyAlerts: "नजदीकी अलर्ट",
      quickReport: "त्वरित रिपोर्ट",
      reportIncident: "घटना की रिपोर्ट करें",
      incidentType: "घटना का प्रकार",
      location: "स्थान",
      description: "विवरण",
      attachPhoto: "फोटो/वीडियो संलग्न करें",
      submit: "रिपोर्ट जमा करें",
      patrolLog: "गश्त लॉग",
      startPatrol: "गश्त शुरू करें",
      endPatrol: "गश्त समाप्त करें",
      addCheckpoint: "चेकपॉइंट जोड़ें",
      elephantSighting: "हाथी देखा गया",
      cropDamage: "फसल क्षति",
      accident: "दुर्घटना/चोट",
      illegalActivity: "अवैध गतिविधि",
      forestFire: "जंगल की आग",
      other: "अन्य",
      sendMessage: "संदेश भेजें",
      typeMessage: "अपना संदेश टाइप करें...",
      emergencyContact: "आपातकालीन संपर्क",
      callForestDept: "वन विभाग को कॉल करें",
      logout: "लॉग आउट"
    },
    chhattisgarhi: {
      dashboard: "डैशबोर्ड",
      alerts: "अलर्ट",
      reports: "रिपोर्ट मन",
      patrol: "गस्त",
      map: "मैप",
      chat: "बात-चीत",
      compensation: "मुआवजा",
      currentStatus: "अभी के हालत",
      safeZone: "सुरक्षित इलाका",
      warningZone: "चेतावनी इलाका",
      dangerZone: "खतरा के इलाका", 
      nearbyAlerts: "लगे-पास के अलर्ट",
      quickReport: "जल्दी रिपोर्ट",
      reportIncident: "घटना के रिपोर्ट करव",
      incidentType: "घटना के किसम",
      location: "जगह",
      description: "ब्योरा",
      attachPhoto: "फोटो/वीडियो लगावव",
      submit: "रिपोर्ट जमा करव",
      patrolLog: "गस्त लॉग",
      startPatrol: "गस्त सुरू करव",
      endPatrol: "गस्त खतम करव", 
      addCheckpoint: "चेकपॉइंट जोड़व",
      elephantSighting: "हाथी दिखिस",
      cropDamage: "फसल के नुकसान",
      accident: "दुर्घटना/चोट",
      illegalActivity: "गैर-कानूनी काम",
      forestFire: "जंगल म आग",
      other: "अउ",
      sendMessage: "संदेश भेजव",
      typeMessage: "अपन संदेश लिखव...",
      emergencyContact: "आपातकाल संपर्क",
      callForestDept: "जंगल विभाग ल फोन करव",
      logout: "लॉग आउट"
    }
  };

  const t = translations[language as keyof typeof translations];

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Report Submitted",
      description: "Your incident report has been sent to forest officials",
    });
  };

  const handleEmergencyCall = () => {
    toast({
      title: "Emergency Call",
      description: "Connecting to Forest Department Emergency Line...",
    });
  };

  const roleIcons = {
    local: Users,
    volunteer: Shield,
    official: Eye
  };

  const RoleIcon = roleIcons[selectedRole as keyof typeof roleIcons] || Users;

  const getAlertInfo = () => {
    switch (alertLevel) {
      case 'safe':
        return {
          color: 'success',
          text: t.safeZone,
          description: 'No elephants detected within 5km radius',
          bgClass: 'gradient-alert-safe',
          pulseClass: 'alert-pulse-safe'
        };
      case 'warning':
        return {
          color: 'warning',
          text: t.warningZone,
          description: 'Elephants detected 2-5km away',
          bgClass: 'gradient-alert-warning',
          pulseClass: 'alert-pulse-warning'
        };
      case 'danger':
        return {
          color: 'destructive',
          text: t.dangerZone,
          description: 'Elephants within 2km! Stay safe!',
          bgClass: 'gradient-alert-danger',
          pulseClass: 'alert-pulse-danger'
        };
    }
  };

  const alertInfo = getAlertInfo();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={elephantIcon} alt="Elephant Icon" className="w-8 h-8" />
            <h1 className="text-xl font-bold text-foreground">{t.dashboard}</h1>
            <Badge variant="outline" className="gap-2">
              <RoleIcon className="w-3 h-3" />
              {selectedRole}
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <LogOut className="w-4 h-4" />
              {t.logout}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Alert Status Card */}
        <Card className={`mb-6 border-2 ${alertInfo.bgClass} ${alertInfo.pulseClass}`}>
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl text-white">{t.currentStatus}</CardTitle>
                <CardDescription className="text-white/90 text-lg font-semibold">
                  {alertInfo.text}
                </CardDescription>
                <p className="text-white/80 text-sm">{alertInfo.description}</p>
              </div>
            </div>
            <div className="flex justify-center gap-2">
              <Button 
                size="sm" 
                variant={alertLevel === 'safe' ? 'default' : 'outline'}
                onClick={() => setAlertLevel('safe')}
                className="min-w-0"
              >
                Safe
              </Button>
              <Button 
                size="sm" 
                variant={alertLevel === 'warning' ? 'default' : 'outline'}
                onClick={() => setAlertLevel('warning')}
                className="min-w-0"
              >
                Warning
              </Button>
              <Button 
                size="sm" 
                variant={alertLevel === 'danger' ? 'default' : 'outline'}
                onClick={() => setAlertLevel('danger')}
                className="min-w-0"
              >
                Danger
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              {t.alerts}
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              {t.reports}
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {t.map}
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              {t.chat}
            </TabsTrigger>
            {selectedRole !== 'local' && (
              <TabsTrigger value="patrol" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                {t.patrol}
              </TabsTrigger>
            )}
            {selectedRole === 'local' && (
              <TabsTrigger value="compensation" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                {t.compensation}
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="alerts" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    {t.nearbyAlerts}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 rounded-lg border border-warning/20 bg-warning/5">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold">Elephant Sighting</span>
                      <Badge variant="outline" className="text-warning border-warning">Warning</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">2.5km from Surguja Village - 15 mins ago</p>
                  </div>
                  <div className="p-3 rounded-lg border border-muted bg-muted/5">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold">Crop Damage Report</span>
                      <Badge variant="outline">Resolved</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Korba District - 2 hours ago</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    {t.emergencyContact}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={handleEmergencyCall}
                    className="w-full gradient-forest text-primary-foreground hover:opacity-90"
                    size="lg"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    {t.callForestDept}
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2 text-center">
                    24/7 Emergency Helpline
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  {t.reportIncident}
                </CardTitle>
                <CardDescription>
                  Report elephant sightings, crop damage, accidents, or other incidents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleReportSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="incident-type">{t.incidentType}</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select incident type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sighting">{t.elephantSighting}</SelectItem>
                        <SelectItem value="crop-damage">{t.cropDamage}</SelectItem>
                        <SelectItem value="accident">{t.accident}</SelectItem>
                        <SelectItem value="illegal">{t.illegalActivity}</SelectItem>
                        <SelectItem value="fire">{t.forestFire}</SelectItem>
                        <SelectItem value="other">{t.other}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">{t.location}</Label>
                    <Input id="location" placeholder="Enter location or GPS coordinates" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">{t.description}</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Describe what happened in detail..." 
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{t.attachPhoto}</Label>
                    <Button type="button" variant="outline" className="w-full">
                      <Upload className="w-4 h-4 mr-2" />
                      {t.attachPhoto}
                    </Button>
                  </div>

                  <Button type="submit" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    {t.submit}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Chhattisgarh Elephant Alert Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-semibold text-muted-foreground">Interactive Map Coming Soon</p>
                    <p className="text-sm text-muted-foreground">Real-time elephant locations and alert zones</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Group Communication
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-64 border rounded-lg p-4 bg-muted/5">
                    <div className="space-y-3">
                      <div className="bg-primary/10 p-3 rounded-lg max-w-xs">
                        <p className="text-sm">Alert: Elephant herd spotted near Surguja village</p>
                        <span className="text-xs text-muted-foreground">Forest Officer - 5 mins ago</span>
                      </div>
                      <div className="bg-muted p-3 rounded-lg max-w-xs ml-auto">
                        <p className="text-sm">Confirmed. Starting patrol from checkpoint A1</p>
                        <span className="text-xs text-muted-foreground">Volunteer Team - 3 mins ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder={t.typeMessage} />
                    <Button>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {selectedRole !== 'local' && (
            <TabsContent value="patrol" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    {t.patrolLog}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <TreePine className="w-4 h-4 mr-2" />
                      {t.startPatrol}
                    </Button>
                    <Button variant="outline" className="flex-1">
                      {t.endPatrol}
                    </Button>
                  </div>
                  <Button variant="outline" className="w-full">
                    <MapPin className="w-4 h-4 mr-2" />
                    {t.addCheckpoint}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {selectedRole === 'local' && (
            <TabsContent value="compensation" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Compensation Claims
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button className="w-full">
                      <Camera className="w-4 h-4 mr-2" />
                      File New Compensation Claim
                    </Button>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Recent Claims</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-muted/5 rounded">
                          <span className="text-sm">Crop Damage - Claim #C001</span>
                          <Badge variant="outline" className="text-warning border-warning">Pending</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;