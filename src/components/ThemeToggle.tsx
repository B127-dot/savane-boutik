import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Vérifier le thème au chargement
    const theme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (theme === 'dark' || (!theme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
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
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="relative overflow-hidden w-10 h-10 p-0 rounded-full border border-border hover:border-primary/50 transition-all duration-300"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Icône Soleil */}
        <Sun 
          className={`absolute w-5 h-5 text-primary transition-all duration-500 transform ${
            isDark 
              ? 'scale-0 rotate-90 opacity-0' 
              : 'scale-100 rotate-0 opacity-100'
          }`} 
        />
        
        {/* Icône Lune */}
        <Moon 
          className={`absolute w-5 h-5 text-primary transition-all duration-500 transform ${
            isDark 
              ? 'scale-100 rotate-0 opacity-100' 
              : 'scale-0 -rotate-90 opacity-0'
          }`} 
        />
      </div>
      
      {/* Effet de glow au hover */}
      <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </Button>
  );
};

export default ThemeToggle;