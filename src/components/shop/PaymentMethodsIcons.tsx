import React from 'react';
import { Wallet, Banknote, CreditCard } from 'lucide-react';

// =============================================
// PAYMENT METHODS ICONS - West Africa Mobile Money
// =============================================

interface PaymentIconProps {
  className?: string;
  size?: number;
}

// Orange Money Icon (Stylized)
export const OrangeMoneyIcon: React.FC<PaymentIconProps> = ({ className = '', size = 40 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 48 48" 
    fill="none" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="48" height="48" rx="8" fill="#FF6600"/>
    <circle cx="24" cy="24" r="14" fill="white"/>
    <circle cx="24" cy="24" r="10" fill="#FF6600"/>
    <text x="24" y="28" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">OM</text>
  </svg>
);

// Moov Money Icon (Stylized)
export const MoovMoneyIcon: React.FC<PaymentIconProps> = ({ className = '', size = 40 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 48 48" 
    fill="none" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="48" height="48" rx="8" fill="#0066B3"/>
    <path d="M12 32 L18 20 L24 28 L30 16 L36 32" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="24" cy="14" r="4" fill="#FFD700"/>
  </svg>
);

// Wave Icon (Stylized)
export const WaveIcon: React.FC<PaymentIconProps> = ({ className = '', size = 40 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 48 48" 
    fill="none" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="48" height="48" rx="8" fill="#1DC9B7"/>
    <path d="M10 28 Q16 18, 24 28 Q32 38, 38 28" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round"/>
    <path d="M10 20 Q16 10, 24 20 Q32 30, 38 20" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.5"/>
  </svg>
);

// Coris Money Icon (Stylized)
export const CorisMoneyIcon: React.FC<PaymentIconProps> = ({ className = '', size = 40 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 48 48" 
    fill="none" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="48" height="48" rx="8" fill="#E31E24"/>
    <circle cx="24" cy="24" r="12" stroke="white" strokeWidth="3" fill="none"/>
    <path d="M20 24 L23 27 L28 20" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Cash on Delivery Icon
export const CashIcon: React.FC<PaymentIconProps> = ({ className = '', size = 40 }) => (
  <div 
    className={`flex items-center justify-center bg-gradient-to-br from-green-500 to-green-600 rounded-lg ${className}`}
    style={{ width: size, height: size }}
  >
    <Banknote className="text-white" size={size * 0.5} />
  </div>
);

// Generic Card Icon
export const CardIcon: React.FC<PaymentIconProps> = ({ className = '', size = 40 }) => (
  <div 
    className={`flex items-center justify-center bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg ${className}`}
    style={{ width: size, height: size }}
  >
    <CreditCard className="text-white" size={size * 0.5} />
  </div>
);

// Payment Method Renderer
interface PaymentMethodIconProps extends PaymentIconProps {
  methodId: string;
}

export const PaymentMethodIcon: React.FC<PaymentMethodIconProps> = ({ methodId, ...props }) => {
  switch (methodId) {
    case 'orange-money':
      return <OrangeMoneyIcon {...props} />;
    case 'moov-money':
      return <MoovMoneyIcon {...props} />;
    case 'wave':
      return <WaveIcon {...props} />;
    case 'coris-money':
      return <CorisMoneyIcon {...props} />;
    case 'cash':
      return <CashIcon {...props} />;
    default:
      return <CardIcon {...props} />;
  }
};

// Payment Methods Grid Component
interface PaymentMethodsGridProps {
  methods?: string[];
  size?: number;
  className?: string;
}

export const PaymentMethodsGrid: React.FC<PaymentMethodsGridProps> = ({ 
  methods = ['orange-money', 'moov-money', 'wave', 'cash'],
  size = 40,
  className = ''
}) => {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {methods.map((methodId) => (
        <PaymentMethodIcon 
          key={methodId} 
          methodId={methodId} 
          size={size}
          className="transition-transform hover:scale-110"
        />
      ))}
    </div>
  );
};

export default PaymentMethodsGrid;
