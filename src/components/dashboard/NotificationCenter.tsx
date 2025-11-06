import { Bell, Package, ShoppingCart, AlertTriangle, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Link } from 'react-router-dom';

export interface Notification {
  id: string;
  type: 'order' | 'stock' | 'alert' | 'config';
  title: string;
  message: string;
  link: string;
  icon: React.ElementType;
  timestamp?: Date;
}

interface NotificationCenterProps {
  notifications: Notification[];
}

const NotificationCenter = ({ notifications }: NotificationCenterProps) => {
  const criticalCount = notifications.filter(n => n.type === 'alert' || n.type === 'order').length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className={`h-5 w-5 ${criticalCount > 0 ? 'animate-pulse' : ''}`} />
          {notifications.length > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-kpi-danger text-white border-2 border-background animate-pulse"
            >
              {notifications.length > 9 ? '9+' : notifications.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>
          {notifications.length > 0 && (
            <Badge variant="secondary">{notifications.length}</Badge>
          )}
        </div>
        <ScrollArea className="h-[400px]">
          {notifications.length > 0 ? (
            <div className="p-2 space-y-2">
              {notifications.map((notification) => {
                const Icon = notification.icon;
                return (
                  <Link key={notification.id} to={notification.link}>
                    <div className="p-3 rounded-lg hover:bg-accent transition-colors border">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-md ${
                          notification.type === 'alert' ? 'bg-kpi-danger/10 text-kpi-danger' :
                          notification.type === 'order' ? 'bg-primary/10 text-primary' :
                          notification.type === 'stock' ? 'bg-kpi-warning/10 text-kpi-warning' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {notification.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {notification.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Bell className="h-12 w-12 text-muted-foreground/50 mb-2" />
              <p className="text-sm text-muted-foreground">
                Aucune notification
              </p>
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
