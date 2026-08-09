import { useState } from 'react';
import { Video, Copy, Share2, Users, Clock, MapPin, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Design Philosophy: Modern Gradient Tech
 * - Zoom meeting management component
 * - Live lecture controls
 * - Meeting details and sharing
 */

interface ZoomMeeting {
  id: string;
  meetingId: string;
  topic: string;
  startTime: string;
  duration: number;
  joinUrl: string;
  password: string;
  status: 'scheduled' | 'live' | 'ended';
  participants: number;
  maxParticipants: number;
}

interface ZoomMeetingManagerProps {
  meeting: ZoomMeeting;
  onStartMeeting?: () => void;
  onEndMeeting?: () => void;
  isTeacher?: boolean;
}

export default function ZoomMeetingManager({
  meeting,
  onStartMeeting,
  onEndMeeting,
  isTeacher = false,
}: ZoomMeetingManagerProps) {
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(meeting.joinUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'scheduled':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'ended':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'live':
        return '🔴 LIVE NOW';
      case 'scheduled':
        return '📅 Scheduled';
      case 'ended':
        return '✓ Ended';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="glass-card p-8 border border-white/10">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold mb-2">{meeting.topic}</h3>
          <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(meeting.status)}`}>
            {getStatusLabel(meeting.status)}
          </div>
        </div>
        <Video className="w-8 h-8 text-accent" />
      </div>

      {/* Meeting Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-white/10">
        {/* Left Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-accent flex-shrink-0" />
            <div>
              <p className="text-xs text-foreground/60">Start Time</p>
              <p className="font-semibold">{new Date(meeting.startTime).toLocaleString()}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-accent flex-shrink-0" />
            <div>
              <p className="text-xs text-foreground/60">Meeting ID</p>
              <p className="font-semibold font-mono">{meeting.meetingId}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-accent flex-shrink-0" />
            <div>
              <p className="text-xs text-foreground/60">Participants</p>
              <p className="font-semibold">
                {meeting.participants}/{meeting.maxParticipants}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Join Link */}
        <div>
          <p className="text-xs text-foreground/60 mb-3">Join Meeting</p>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-xs text-foreground/60 mb-2">Join Link</p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={meeting.joinUrl}
                  readOnly
                  className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-sm font-mono focus:outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  className="p-2 hover:bg-white/10 rounded-lg transition-smooth"
                >
                  <Copy className={`w-5 h-5 ${copied ? 'text-green-400' : 'text-accent'}`} />
                </button>
              </div>
              {copied && <p className="text-xs text-green-400 mt-2">✓ Copied to clipboard</p>}
            </div>

            {/* Password */}
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-xs text-foreground/60 mb-2">Password</p>
              <div className="flex items-center gap-2">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={meeting.password}
                  readOnly
                  className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-sm font-mono focus:outline-none"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-smooth text-foreground/60 hover:text-accent"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        {meeting.status === 'scheduled' && isTeacher && (
          <Button className="gradient-button flex-1" onClick={onStartMeeting}>
            <Video className="w-4 h-4 mr-2" />
            Start Meeting
          </Button>
        )}

        {meeting.status === 'live' && (
          <>
            <a
              href={meeting.joinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button className="gradient-button w-full">
                <Video className="w-4 h-4 mr-2" />
                Join Meeting
              </Button>
            </a>

            {isTeacher && (
              <Button
                variant="outline"
                className="flex-1 border-red-500/30 text-red-400 hover:bg-red-500/10"
                onClick={onEndMeeting}
              >
                End Meeting
              </Button>
            )}
          </>
        )}

        {meeting.status === 'scheduled' && !isTeacher && (
          <a
            href={meeting.joinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button className="gradient-button w-full">
              <Video className="w-4 h-4 mr-2" />
              Join Meeting
            </Button>
          </a>
        )}

        <Button variant="outline" className="flex-1" onClick={handleCopyLink}>
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </div>

      {/* Info Box */}
      {meeting.status === 'live' && (
        <div className="mt-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-green-400">Meeting is Live</p>
            <p className="text-sm text-foreground/70">
              {meeting.participants} participant{meeting.participants !== 1 ? 's' : ''} currently in the meeting
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
