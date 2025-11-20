interface ElegantFooterProps {
  logo?: string;
  shopName: string;
  aboutText?: string;
  phone?: string;
  whatsapp?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
}

const ElegantFooter = ({ shopName }: ElegantFooterProps) => {
  return (
    <footer className="w-full bg-background border-t border-border py-12">
      <div className="container mx-auto px-4 text-center space-y-4">
        <h3 className="font-serif text-2xl text-foreground">{shopName}</h3>
        <p className="text-muted-foreground">
          Thème "Élégant" - Footer à venir
        </p>
        <p className="text-sm text-muted-foreground">
          © 2025 {shopName}. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default ElegantFooter;
