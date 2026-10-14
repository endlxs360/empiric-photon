import {
  createIcons, ArrowRight, ArrowUp, ArrowUpRight, Bot, Building2, CheckCircle2, ChevronDown, Clock, Code2, Copy,
  Download, ExternalLink, FileText, Mail, Play, PlayCircle, RotateCcw, Scissors, TerminalSquare, Timer, Zap,
} from 'lucide';

// Static markup uses <i data-lucide="icon-name">. Only the icons listed here are bundled.
const icons = {
  ArrowRight, ArrowUp, ArrowUpRight, Bot, Building2, CheckCircle2, ChevronDown, Clock, Code2, Copy,
  Download, ExternalLink, FileText, Mail, Play, PlayCircle, RotateCcw, Scissors, TerminalSquare, Timer, Zap,
};

window.lucide = { createIcons: () => createIcons({ icons }) };
