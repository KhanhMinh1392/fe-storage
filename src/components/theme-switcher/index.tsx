'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { MButton } from '../button';
import Icon from '../icon';

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleSwitchTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleChangeTheme = () => {
      const newColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme(newColorScheme);
    };
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleChangeTheme);

    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleChangeTheme);
    };
  }, [setTheme]);

  if (!mounted) return null;

  return (
    <MButton isIconOnly color="none" size="icon" onClick={handleSwitchTheme} aria-label="Switch theme">
      <Icon name={theme === 'light' ? 'moon' : 'sun'} />
    </MButton>
  );
}
