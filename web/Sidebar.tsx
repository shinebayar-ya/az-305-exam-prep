import { Download, Layers, Library, Moon, NotebookPen, Sun, Target } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from './components/ui/button';
import { exportStudy, localDay } from './storage';

const navItems = [
  { path: '/practice', label: 'Дадлага', Icon: Target },
  { path: '/topics', label: 'Сэдэв ба тэмдэглэл', Icon: NotebookPen },
  { path: '/materials', label: 'Материал', Icon: Library },
];
// Downloads every stored table (notes, quiz history, legacy plan data) as one JSON file.
async function downloadBackup() {
  const blob = new Blob([JSON.stringify(await exportStudy(), null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `az305-progress-${localDay()}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function Sidebar() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('az305:theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {}
    return typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  function toggleTheme() {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    try {
      localStorage.setItem('az305:theme', next);
    } catch {}
  }
  const [exportFailed, setExportFailed] = useState(false);
  function backup() {
    setExportFailed(false);
    downloadBackup().catch(() => setExportFailed(true));
  }

  return (
    <aside className="flex flex-wrap border-b bg-sidebar p-4 text-sidebar-foreground md:sticky md:top-0 md:h-dvh md:flex-col md:flex-nowrap md:border-r md:border-b-0 md:p-5">
      <Link
        className="flex shrink-0 items-center gap-3 rounded-lg px-2 text-sm font-semibold"
        to="/practice"
      >
        <span>
          <Layers size={20} />
        </span>
        <span>
          AZ-305
          <small className="mt-1 block text-[10px] font-normal tracking-widest text-muted-foreground">
            PREPARATION
          </small>
        </span>
      </Link>
      <nav
        className="order-3 mt-4 flex w-full flex-wrap gap-1 md:order-none md:mt-9 md:flex-col"
        aria-label="Үндсэн цэс"
      >
        {navItems.map(({ path, label, Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              'flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ' +
              (isActive
                ? 'bg-accent font-medium text-accent-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground')
            }
          >
            <Icon size={18} aria-hidden="true" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="ml-auto flex gap-2 self-start md:mt-auto md:ml-0 md:w-full md:flex-col">
        {exportFailed && (
          <p role="alert" className="sr-only text-xs text-destructive md:not-sr-only">
            Татаж чадсангүй. Дахин оролдоно уу.
          </p>
        )}
        <Button
          variant="outline"
          type="button"
          className={`md:w-full md:justify-start${exportFailed ? ' border-destructive' : ''}`}
          onClick={backup}
          aria-label="Ахиц татах (JSON)"
        >
          <Download size={16} />
          <span className="hidden sm:inline">Ахиц татах</span>
        </Button>
        <Button
          variant="outline"
          type="button"
          className="md:w-full md:justify-start"
          onClick={toggleTheme}
          aria-label={theme === 'light' ? 'Dark theme сонгох' : 'Light theme сонгох'}
        >
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          <span>{theme === 'light' ? 'Dark theme' : 'Light theme'}</span>
        </Button>
      </div>
    </aside>
  );
}
