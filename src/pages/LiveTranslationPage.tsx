import { useState, useEffect } from 'react';
import {
  Hand,
  Mic,
  MicOff,
  Volume2,
  Camera,
  CheckCircle2,
  AlertCircle,
  Zap,
  Brain,
  Eye,
} from 'lucide-react';

const signs = ['HELLO', 'THANK YOU', 'HELP', 'PLEASE', 'YES', 'NO', 'SORRY', 'LOVE'];
const sentences = [
  'Hello, how are you today?',
  'Thank you for your kindness.',
  'Can you help me please?',
  'Please pass the document.',
  'Yes, I agree with that.',
  'No, I do not want that.',
  'I am sorry for the inconvenience.',
  'I love this beautiful day.',
];

export default function LiveTranslationPage() {
  const [active, setActive] = useState(false);
  const [currentSign, setCurrentSign] = useState('HELLO');
  const [confidence, setConfidence] = useState(97);
  const [sentence, setSentence] = useState('Hello, how are you today?');
  const [voiceActive, setVoiceActive] = useState(true);
  const [signIndex, setSignIndex] = useState(0);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      const next = (signIndex + 1) % signs.length;
      setSignIndex(next);
      setCurrentSign(signs[next]);
      setSentence(sentences[next]);
      setConfidence(Math.floor(Math.random() * 8) + 91);
    }, 3000);
    return () => clearInterval(interval);
  }, [active, signIndex]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Live Translation</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Real-time sign language detection and translation</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-4">
          <div className="camera-frame aspect-video flex items-center justify-center relative">
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-lg px-3 py-1.5">
              <Camera className="text-white" size={14} />
              <span className="text-white text-xs font-medium">Camera Feed</span>
            </div>
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="pulse-dot" />
              <span className="text-green-400 text-xs font-medium bg-black/40 backdrop-blur-sm rounded-lg px-2 py-1">
                {active ? 'LIVE' : 'STANDBY'}
              </span>
            </div>

            {active && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <Hand className="text-indigo-400/30" size={120} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-indigo-400/60 animate-ping" />
                  </div>
                </div>
                <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-indigo-400/50 rounded-tl-lg" />
                <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-indigo-400/50 rounded-tr-lg" />
                <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-indigo-400/50 rounded-bl-lg" />
                <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-indigo-400/50 rounded-br-lg" />
              </div>
            )}

            {!active && (
              <div className="text-center">
                <Camera className="text-gray-500 mb-3" size={48} />
                <p className="text-gray-400 text-sm">Click "Start Translation" to begin</p>
              </div>
            )}

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-lg px-3 py-1.5">
                <Zap size={14} className="text-amber-400" />
                <span className="text-white text-xs">AI Model Active</span>
              </div>
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-lg px-3 py-1.5">
                <Eye size={14} className="text-blue-400" />
                <span className="text-white text-xs">Hand Tracking: {active ? 'On' : 'Off'}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActive(!active)}
              className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                active
                  ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/25'
                  : 'gradient-bg text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40'
              }`}
            >
              {active ? (
                <><AlertCircle size={18} /> Stop Translation</>
              ) : (
                <><Hand size={18} /> Start Translation</>
              )}
            </button>
            <button
              onClick={() => setVoiceActive(!voiceActive)}
              className={`p-3 rounded-xl transition-all duration-200 ${
                voiceActive
                  ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
              }`}
            >
              {voiceActive ? <Volume2 size={20} /> : <MicOff size={20} />}
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="text-indigo-600 dark:text-indigo-400" size={18} />
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">AI Detection</h3>
            </div>
            <div className="text-center py-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Detected Sign</p>
              <p className={`text-4xl font-extrabold transition-all duration-500 ${
                active ? 'gradient-text' : 'text-gray-300 dark:text-gray-600'
              }`}>{currentSign}</p>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Confidence Level</p>
            <div className="flex items-center gap-3 mb-2">
              <p className={`text-2xl font-bold ${
                confidence >= 95 ? 'text-green-600 dark:text-green-400' :
                confidence >= 85 ? 'text-amber-600 dark:text-amber-400' :
                'text-red-600 dark:text-red-400'
              }`}>{confidence}%</p>
              {confidence >= 95 && <CheckCircle2 className="text-green-500" size={20} />}
            </div>
            <div className="progress-bar">
              <div
                className={`progress-bar-fill ${
                  confidence >= 95 ? 'bg-gradient-to-r from-green-500 to-emerald-400' :
                  confidence >= 85 ? 'bg-gradient-to-r from-amber-500 to-orange-400' :
                  'bg-gradient-to-r from-red-500 to-rose-400'
                }`}
                style={{ width: active ? `${confidence}%` : '0%' }}
              />
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Generated Sentence</p>
            <p className="text-lg font-medium text-gray-900 dark:text-white leading-relaxed min-h-[48px]">
              {active ? sentence : 'Waiting for input...'}
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mic className={voiceActive && active ? 'text-indigo-600 dark:text-indigo-400 animate-pulse' : 'text-gray-400'} size={20} />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Voice Output</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {voiceActive && active ? 'Speaking translations aloud' : 'Voice output inactive'}
                  </p>
                </div>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-lg ${
                voiceActive && active
                  ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
              }`}>
                {voiceActive && active ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-4">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className={`w-2 h-2 rounded-full mx-auto mb-1.5 ${active ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
                <p className="text-[10px] text-gray-500 dark:text-gray-400">Camera</p>
              </div>
              <div>
                <div className={`w-2 h-2 rounded-full mx-auto mb-1.5 ${active ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'}`} />
                <p className="text-[10px] text-gray-500 dark:text-gray-400">AI Model</p>
              </div>
              <div>
                <div className={`w-2 h-2 rounded-full mx-auto mb-1.5 ${voiceActive && active ? 'bg-purple-500 animate-pulse' : 'bg-gray-300'}`} />
                <p className="text-[10px] text-gray-500 dark:text-gray-400">Voice</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
