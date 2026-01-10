import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, QrCode } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShopQRCodeProps {
  shopUrl: string;
  shopName: string;
}

const ShopQRCode = ({ shopUrl, shopName }: ShopQRCodeProps) => {
  const { toast } = useToast();
  const fullUrl = `https://burkinashop.com/${shopUrl}`;

  const downloadQRCode = () => {
    const svg = document.getElementById('shop-qr-code');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `qrcode-${shopUrl}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();

      toast({
        title: "QR Code téléchargé",
        description: "Le QR Code a été enregistré en PNG",
      });
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="w-5 h-5" />
          QR Code de votre Boutique
        </CardTitle>
        <CardDescription>
          Partagez ce QR Code pour que vos clients scannent et accèdent à votre boutique
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="p-6 bg-white rounded-lg border-2 border-border">
            <QRCodeSVG
              id="shop-qr-code"
              value={fullUrl}
              size={200}
              level="H"
              includeMargin={true}
              imageSettings={{
                src: "/favicon.jpg",
                height: 30,
                width: 30,
                excavate: true,
              }}
            />
          </div>
          
          <div className="text-center space-y-2">
            <p className="text-sm font-medium">{shopName}</p>
            <p className="text-xs text-muted-foreground">{fullUrl}</p>
          </div>

          <Button onClick={downloadQRCode} className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Télécharger en PNG
          </Button>
        </div>

        <div className="p-4 bg-accent/10 rounded-lg space-y-2">
          <p className="text-sm font-medium">💡 Comment utiliser ce QR Code ?</p>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
            <li>Imprimez-le sur vos cartes de visite</li>
            <li>Affichez-le dans votre magasin physique</li>
            <li>Partagez-le sur vos réseaux sociaux</li>
            <li>Ajoutez-le à vos supports marketing</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShopQRCode;
