import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true); // Par défaut mode sombre

  useEffect(() => {
    // Vérifier le thème au chargement
    const theme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (theme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      // Par défaut mode sombre (theme === 'dark' ou pas de préférence)
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="relative overflow-hidden w-10 h-10 p-0 rounded-full border border-border/50 hover:border-border hover:bg-muted/50 transition-all duration-300"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Icône Soleil */}
        <Sun 
          className={`absolute w-4 h-4 text-foreground transition-all duration-500 transform ${
            isDark 
              ? 'scale-0 rotate-90 opacity-0' 
              : 'scale-100 rotate-0 opacity-100'
          }`} 
        />
        
        {/* Icône Lune */}
        <Moon 
          className={`absolute w-4 h-4 text-foreground transition-all duration-500 transform ${
            isDark 
              ? 'scale-100 rotate-0 opacity-100' 
              : 'scale-0 -rotate-90 opacity-0'
          }`} 
        />
      </div>
    </Button>
  );
};

export default ThemeToggle;