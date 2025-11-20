import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false); // Par défaut mode clair maintenant

  useEffect(() => {
    // Vérifier le thème au chargement
    const theme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (theme === 'dark' || (!theme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      // Mode clair par défaut
      setIsDark(false);
      document.documentElement.classList.remove('dark');
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
    <div className="flex items-center gap-0.5 p-0.5 rounded-md bg-muted/30 border border-border/30">
      <button 
        onClick={() => toggleTheme()}
        className={`p-1.5 rounded transition-all duration-200 ${
          !isDark ? 'bg-background shadow-sm' : 'hover:bg-muted/50'
        }`}
        aria-label="Mode clair"
      >
        <Sun className="w-3.5 h-3.5" />
      </button>
      <button 
        onClick={() => toggleTheme()}
        className={`p-1.5 rounded transition-all duration-200 ${
          isDark ? 'bg-background shadow-sm' : 'hover:bg-muted/50'
        }`}
        aria-label="Mode sombre"
      >
        <Moon className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default ThemeToggle;