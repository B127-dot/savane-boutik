import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Users, Phone, Calendar, Tag, MessageCircle, Search, Trash2, Copy, Gift } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CapturedLead {
  id: string;
  phone: string;
  name?: string;
  discountCode: string;
  discountPercent: number;
  capturedAt: number;
  source: string;
  contacted?: boolean;
}

interface CapturedLeadsTabProps {
  shopName: string;
}

const CapturedLeadsTab = ({ shopName }: CapturedLeadsTabProps) => {
  const [leads, setLeads] = useState<CapturedLead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // Load leads from localStorage
  useEffect(() => {
    const savedLeads = localStorage.getItem('capturedLeads');
    if (savedLeads) {
      setLeads(JSON.parse(savedLeads));
    }
  }, []);

  // Filter leads based on search
  const filteredLeads = leads.filter(lead => 
    lead.phone.includes(searchTerm) || 
    (lead.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    lead.discountCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Statistics
  const totalLeads = leads.length;
  const todayLeads = leads.filter(l => 
    Date.now() - l.capturedAt < 24 * 60 * 60 * 1000
  ).length;
  const contactedLeads = leads.filter(l => l.contacted).length;

  const handleContactViaWhatsApp = (lead: CapturedLead) => {
    const message = encodeURIComponent(
      `Bonjour${lead.name ? ` ${lead.name}` : ''} ! 👋\n\n` +
      `Merci de votre intérêt pour ${shopName} !\n\n` +
      `🎁 Voici votre code promo exclusif : *${lead.discountCode}*\n` +
      `💰 Il vous donne droit à *${lead.discountPercent}% de réduction* sur votre prochaine commande !\n\n` +
      `N'hésitez pas à l'utiliser lors de votre achat. Le code est valable 48h.\n\n` +
      `À très bientôt ! 🛍️`
    );

    // Mark as contacted
    const updatedLeads = leads.map(l => 
      l.id === lead.id ? { ...l, contacted: true } : l
    );
    setLeads(updatedLeads);
    localStorage.setItem('capturedLeads', JSON.stringify(updatedLeads));

    // Open WhatsApp
    const phoneClean = lead.phone.replace(/[^0-9]/g, '');
    const phoneWithCountry = phoneClean.startsWith('226') ? phoneClean : `226${phoneClean}`;
    window.open(`https://wa.me/${phoneWithCountry}?text=${message}`, '_blank');

    toast({
      title: "WhatsApp ouvert",
      description: `Message préparé pour ${lead.name || lead.phone}`,
    });
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code copié",
      description: `Le code ${code} a été copié`,
    });
  };

  const handleDeleteLead = (leadId: string) => {
    const updatedLeads = leads.filter(l => l.id !== leadId);
    setLeads(updatedLeads);
    localStorage.setItem('capturedLeads', JSON.stringify(updatedLeads));
    toast({
      title: "Lead supprimé",
      description: "Le lead a été supprimé avec succès",
    });
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-body text-muted-foreground">Total leads</p>
                <p className="text-2xl font-display font-bold text-foreground">
                  {totalLeads}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-body text-muted-foreground">Aujourd'hui</p>
                <p className="text-2xl font-display font-bold text-foreground">
                  {todayLeads}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-body text-muted-foreground">Contactés</p>
                <p className="text-2xl font-display font-bold text-foreground">
                  {contactedLeads}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2 font-display">
                <Gift className="w-5 h-5 text-primary" />
                Leads Capturés (Popup Exit Intent)
              </CardTitle>
              <CardDescription className="font-body">
                Clients ayant laissé leur numéro WhatsApp en échange d'un code promo
              </CardDescription>
            </div>
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Leads List */}
      {filteredLeads.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Users className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-display font-semibold mb-2">
              {searchTerm ? 'Aucun résultat' : 'Aucun lead capturé'}
            </h3>
            <p className="font-body text-muted-foreground max-w-md mx-auto">
              {searchTerm 
                ? 'Essayez de modifier votre recherche'
                : 'Les numéros WhatsApp capturés via le popup de sortie apparaîtront ici'
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredLeads.map((lead) => (
            <Card key={lead.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Lead Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-display font-semibold text-foreground">
                          {lead.name || 'Client anonyme'}
                        </h4>
                        {lead.contacted && (
                          <Badge variant="secondary" className="text-xs">
                            Contacté
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm font-body text-muted-foreground flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {lead.phone}
                      </p>
                      <p className="text-xs font-body text-muted-foreground mt-1">
                        <Calendar className="w-3 h-3 inline mr-1" />
                        {formatDate(lead.capturedAt)}
                      </p>
                    </div>
                  </div>

                  {/* Discount Code */}
                  <div className="flex items-center gap-2 sm:gap-4">
                    <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-lg">
                      <Tag className="w-4 h-4 text-primary" />
                      <span className="font-mono font-semibold text-sm">{lead.discountCode}</span>
                      <Badge variant="outline" className="text-xs">
                        -{lead.discountPercent}%
                      </Badge>
                      <button
                        onClick={() => handleCopyCode(lead.discountCode)}
                        className="p-1 hover:bg-background rounded transition-colors"
                        title="Copier le code"
                      >
                        <Copy className="w-3 h-3 text-muted-foreground" />
                      </button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleContactViaWhatsApp(lead)}
                      className="gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="hidden sm:inline">WhatsApp</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteLead(lead.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CapturedLeadsTab;
