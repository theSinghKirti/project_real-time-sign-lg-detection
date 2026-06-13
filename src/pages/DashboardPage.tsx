import {
  Languages,
  Heart,
  Globe,
  Target,
  TrendingUp,
  ArrowUpRight,
  Activity,
  Clock,
} from 'lucide-react';
import { dashboardStats, weeklyActivity, translationHistory } from '../data/mockData';

const statCards = [
  { label: 'Total Translations', value: dashboardStats.totalTranslations.toLocaleString(), icon: Languages, color: 'from-indigo-500 to-blue-500', change: '+12%' },
  { label: 'Emotion Detections', value: dashboardStats.emotionDetections.toLocaleString(), icon: Heart, color: 'from-pink-500 to-rose-500', change: '+8%' },
  { label: 'Languages Supported', value: dashboardStats.languagesSupported.toString(), icon: Globe, color: 'from-emerald-500 to-teal-500', change: '+2' },
  { label: 'Accuracy Score', value: `${dashboardStats.accuracyScore}%`, icon: Target, color: 'from-amber-500 to-orange-500', change: '+1.2%' },
];

const maxTranslations = Math.max(...weeklyActivity.map(d => d.translations));

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Overview of your translation activity and insights</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <div key={i} className="stat-card">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg`}>
                <card.icon className="text-white" size={20} />
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg">
                <ArrowUpRight size={12} /> {card.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Weekly Activity</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Translations & emotion detections</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-indigo-500" /> Translations</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-pink-400" /> Emotions</span>
            </div>
          </div>
          <div className="flex items-end justify-between gap-3 h-52">
            {weeklyActivity.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col items-center gap-1" style={{ height: '180px' }}>
                  <div className="w-full flex-1 flex flex-col justify-end gap-1">
                    <div
                      className="w-full rounded-t-md bg-gradient-to-t from-indigo-500 to-indigo-400 transition-all duration-500"
                      style={{ height: `${(d.translations / maxTranslations) * 100}%` }}
                    />
                    <div
                      className="w-full rounded-t-md bg-gradient-to-t from-pink-400 to-pink-300 transition-all duration-500"
                      style={{ height: `${(d.emotions / maxTranslations) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Accuracy Score</h3>
          <div className="relative w-40 h-40">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="10"
                className="text-gray-200 dark:text-gray-700" />
              <circle cx="60" cy="60" r="50" fill="none" stroke="url(#gradient)" strokeWidth="10"
                strokeDasharray={`${96.8 * 3.14} ${314}`} strokeLinecap="round" />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">96.8%</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Accuracy</p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
            <TrendingUp size={16} />
            <span>+1.2% from last week</span>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Activity className="text-indigo-600 dark:text-indigo-400" size={20} />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
          </div>
          <a href="/history" className="text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:underline">View All</a>
        </div>
        <div className="space-y-3">
          {translationHistory.slice(0, 5).map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                <Languages className="text-indigo-600 dark:text-indigo-400" size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.sentence}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <Clock size={12} className="text-gray-400" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">{item.date} {item.time}</span>
                  <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">{item.language}</span>
                </div>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-lg ${
                item.emotion === 'Happy' ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' :
                item.emotion === 'Sad' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' :
                'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}>{item.emotion}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
