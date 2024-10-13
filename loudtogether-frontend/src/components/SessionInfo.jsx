import React from "react";
import PropTypes from "prop-types";
import { Music, Link, User, Clock, Users } from "lucide-react";

const truncate = (str, num) => {
  if (str.length <= num) return str;
  return str.slice(0, num) + "...";
};

const formatDuration = (duration) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const SessionInfo = ({ session, audioInfo }) => (
  <div className="space-y-4 mb-6">
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-[#17D9A3] to-[#15c795] p-4">
        <div className="flex items-center">
          <div className="w-16 h-16 mr-4 rounded-lg overflow-hidden shadow-lg">
            <img
              src={audioInfo.thumbnailUrl}
              alt="Thumbnail"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-xs font-semibold text-white opacity-80">
              Now Playing
            </h2>
            <p className="text-sm font-bold text-white">
              {truncate(audioInfo.title || "Unknown Song", 45)}
            </p>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-center bg-gray-50 rounded-xl p-3">
          <Link size={18} className="mr-3 text-[#17D9A3]" />
          <div className="flex-grow">
            <span className="text-xs font-semibold text-gray-400 block">
              URL
            </span>
            <span className="text-sm text-gray-700">
              {truncate(session.youtubeUrl, 30)}
            </span>
          </div>
        </div>
        <div className="flex items-center bg-gray-50 rounded-xl p-3">
          <User size={18} className="mr-3 text-[#17D9A3]" />
          <div className="flex-grow">
            <span className="text-xs font-semibold text-gray-400 block">
              Admin
            </span>
            <span className="text-sm text-gray-700">{session.adminName}</span>
          </div>
        </div>
        <div className="flex items-center bg-gray-50 rounded-xl p-3">
          <Users size={18} className="mr-3 text-[#17D9A3]" />
          <div className="flex-grow">
            <span className="text-xs font-semibold text-gray-400 block">
              Participants
            </span>
            <span className="text-sm text-gray-700">
              {session.participants.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

SessionInfo.propTypes = {
  session: PropTypes.shape({
    youtubeUrl: PropTypes.string.isRequired,
    adminName: PropTypes.string.isRequired,
    participants: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  audioInfo: PropTypes.shape({
    title: PropTypes.string,
    thumbnailUrl: PropTypes.string,
    duration: PropTypes.number,
  }).isRequired,
};

export default SessionInfo;
