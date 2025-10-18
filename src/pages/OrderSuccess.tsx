import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, ShoppingBag, Home } from 'lucide-react';

const OrderSuccess = () => {
  const { shopUrl, orderId } = useParams<{ shopUrl: string; orderId: string }>();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full animate-scale-in">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-20 h-20 bg-success/10 rounded-full flex items-center justify-center animate-fade-in">
            <CheckCircle2 className="w-12 h-12 text-success" />
          </div>
          <CardTitle className="text-3xl">Commande confirmée !</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div className="space-y-2">
            <p className="text-muted-foreground">
              Votre commande{' '}
              <span className="font-semibold text-foreground">
                #{orderId}
              </span>{' '}
              a été enregistrée avec succès.
            </p>
            <p className="text-sm text-muted-foreground">
              Le vendeur vous contactera bientôt pour confirmer les détails de livraison et le paiement.
            </p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-left">
            <h4 className="font-semibold text-sm">Prochaines étapes :</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Le vendeur va vérifier votre commande</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Vous recevrez un appel pour confirmation</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Votre commande sera préparée et livrée</span>
              </li>
            </ul>
          </div>

          <div className="space-y-2 pt-4">
            <Button 
              onClick={() => navigate(`/shop/${shopUrl}`)} 
              className="w-full"
              size="lg"
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Continuer mes achats
            </Button>
            <Button 
              onClick={() => navigate('/')} 
              variant="outline"
              className="w-full"
            >
              <Home className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSuccess;
