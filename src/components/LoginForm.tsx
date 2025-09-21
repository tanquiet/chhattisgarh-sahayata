import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Users, Shield, Eye, TreePine } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import elephantIcon from "@/assets/elephant-icon.png";

interface LoginFormProps {
  selectedRole: string;
  language: string;
  onBack: () => void;
  onLogin: () => void;
}

const LoginForm = ({ selectedRole, language, onBack, onLogin }: LoginFormProps) => {
  const [activeTab, setActiveTab] = useState(selectedRole || 'local');
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    address: '',
    mobile: '',
    email: '',
    role: '',
    area: '',
    departmentId: '',
    designation: '',
    checkpoints: ''
  });
  const { toast } = useToast();

  const translations = {
    english: {
      title: "Join Elephant Guard",
      subtitle: "Create your account to help protect communities and wildlife",
      login: "Already have an account?",
      loginButton: "Sign In",
      signup: "Create Account",
      name: "Full Name",
      age: "Age",
      gender: "Gender",
      address: "Address",
      mobile: "Mobile Number",
      email: "Email Address",
      role: "Role",
      area: "Area of Operation",
      departmentId: "Department ID",
      designation: "Designation",
      checkpoints: "Assigned Checkpoints",
      male: "Male",
      female: "Female",
      other: "Other",
      locals: "Locals",
      volunteers: "Volunteers",
      officials: "Forest Officials",
      localsDesc: "Report incidents and receive alerts",
      volunteersDesc: "Bridge communities and officials",
      officialsDesc: "Monitor and coordinate responses"
    },
    hindi: {
      title: "एलिफेंट गार्ड में शामिल हों",
      subtitle: "समुदायों और वन्यजीवों की सुरक्षा में मदद के लिए अपना खाता बनाएं",
      login: "पहले से खाता है?",
      loginButton: "साइन इन करें",
      signup: "खाता बनाएं",
      name: "पूरा नाम",
      age: "उम्र",
      gender: "लिंग",
      address: "पता",
      mobile: "मोबाइल नंबर",
      email: "ईमेल पता",
      role: "भूमिका",
      area: "कार्य क्षेत्र",
      departmentId: "विभाग आईडी",
      designation: "पदनाम",
      checkpoints: "निर्दिष्ट चेकपॉइंट्स",
      male: "पुरुष",
      female: "महिला",
      other: "अन्य",
      locals: "स्थानीय लोग",
      volunteers: "स्वयंसेवक",
      officials: "वन अधिकारी",
      localsDesc: "घटनाओं की रिपोर्ट करें और अलर्ट प्राप्त करें",
      volunteersDesc: "समुदायों और अधिकारियों के बीच सेतु",
      officialsDesc: "निगरानी और प्रतिक्रिया समन्वय"
    },
    chhattisgarhi: {
      title: "एलिफेंट गार्ड म शामिल होवव",
      subtitle: "समुदाय अउ जंगली जानवर के सुरक्षा म मदद बर अपन खाता बनावव",
      login: "पहिली ले खाता हे?",
      loginButton: "साइन इन करव",
      signup: "खाता बनावव",
      name: "पूरा नाम",
      age: "उमर",
      gender: "लिंग",
      address: "पता",
      mobile: "मोबाइल नंबर",
      email: "ईमेल पता",
      role: "भूमिका",
      area: "काम के इलाका",
      departmentId: "विभाग आईडी",
      designation: "पदनाम",
      checkpoints: "दिए गए चेकपॉइंट मन",
      male: "मरद",
      female: "माई",
      other: "अउ",
      locals: "लोकल मनखे",
      volunteers: "स्वयंसेवक मन",
      officials: "जंगल अफसर मन",
      localsDesc: "घटना के रिपोर्ट करव अउ अलर्ट पावव",
      volunteersDesc: "समुदाय अउ अफसर मन के बीच जोड़व",
      officialsDesc: "निगरानी अउ जवाब के समन्वय"
    }
  };

  const t = translations[language as keyof typeof translations];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Account Created Successfully!",
      description: "Welcome to Elephant Guard Chhattisgarh",
    });
    onLogin();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const roleIcons = {
    local: Users,
    volunteer: Shield,
    official: Eye
  };

  const RoleIcon = roleIcons[activeTab as keyof typeof roleIcons] || Users;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <img src={elephantIcon} alt="Elephant Icon" className="w-8 h-8" />
            <h1 className="text-xl font-bold text-foreground">Elephant Guard</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-primary/10">
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 rounded-full gradient-forest mx-auto mb-4 flex items-center justify-center">
                <TreePine className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-3xl mb-2">{t.title}</CardTitle>
              <CardDescription className="text-lg">{t.subtitle}</CardDescription>
            </CardHeader>

            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="local" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {t.locals}
                  </TabsTrigger>
                  <TabsTrigger value="volunteer" className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    {t.volunteers}
                  </TabsTrigger>
                  <TabsTrigger value="official" className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    {t.officials}
                  </TabsTrigger>
                </TabsList>

                <div className="mb-6 p-4 rounded-lg bg-muted/50 border border-primary/10">
                  <div className="flex items-center gap-3 mb-2">
                    <RoleIcon className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">
                      {activeTab === 'local' && t.locals}
                      {activeTab === 'volunteer' && t.volunteers}
                      {activeTab === 'official' && t.officials}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {activeTab === 'local' && t.localsDesc}
                    {activeTab === 'volunteer' && t.volunteersDesc}
                    {activeTab === 'official' && t.officialsDesc}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Common Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t.name} *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age">{t.age} *</Label>
                      <Input
                        id="age"
                        type="number"
                        value={formData.age}
                        onChange={(e) => handleInputChange('age', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">{t.gender} *</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">{t.male}</SelectItem>
                        <SelectItem value="female">{t.female}</SelectItem>
                        <SelectItem value="other">{t.other}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">{t.address} *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="mobile">{t.mobile} *</Label>
                      <Input
                        id="mobile"
                        type="tel"
                        value={formData.mobile}
                        onChange={(e) => handleInputChange('mobile', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t.email} *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Role-specific Fields */}
                  {activeTab === 'volunteer' && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="role">{t.role}</Label>
                        <Input
                          id="role"
                          value={formData.role}
                          onChange={(e) => handleInputChange('role', e.target.value)}
                          placeholder="e.g., Community Organizer, Patrol Assistant"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="area">{t.area}</Label>
                        <Input
                          id="area"
                          value={formData.area}
                          onChange={(e) => handleInputChange('area', e.target.value)}
                          placeholder="e.g., Surguja District, Korba Region"
                        />
                      </div>
                    </>
                  )}

                  {activeTab === 'official' && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="departmentId">{t.departmentId} *</Label>
                        <Input
                          id="departmentId"
                          value={formData.departmentId}
                          onChange={(e) => handleInputChange('departmentId', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="designation">{t.designation} *</Label>
                        <Input
                          id="designation"
                          value={formData.designation}
                          onChange={(e) => handleInputChange('designation', e.target.value)}
                          placeholder="e.g., Forest Range Officer, ACF"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="checkpoints">{t.checkpoints}</Label>
                        <Input
                          id="checkpoints"
                          value={formData.checkpoints}
                          onChange={(e) => handleInputChange('checkpoints', e.target.value)}
                          placeholder="e.g., Checkpoint A1, B3, C7"
                        />
                      </div>
                    </>
                  )}

                  <Button type="submit" className="w-full gradient-forest text-primary-foreground hover:opacity-90" size="lg">
                    <TreePine className="w-5 h-5 mr-2" />
                    {t.signup}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-muted-foreground">
                    {t.login}{" "}
                    <Button variant="link" className="p-0 h-auto text-primary">
                      {t.loginButton}
                    </Button>
                  </p>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;