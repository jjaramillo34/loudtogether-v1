// SessionInfo.jsx

import PropTypes from "prop-types";
import { Music, Link, User } from "lucide-react";

const truncate = (str, num) => {
  if (str.length <= num) return str;
  return str.slice(0, num) + "...";
};

const SessionInfo = ({ session, audioInfo }) => (
  <div className="space-y-4 mb-6">
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-[#17D9A3] to-[#15c795] p-4">
        <div className="flex items-center">
          <Music size={24} className="mr-3 text-white" />
          <div>
            <h2 className="text-xs font-semibold text-white opacity-80">
              Now Playing
            </h2>
            <p className="text-base font-bold text-white">
              {truncate(audioInfo.title || "Unknown Song", 45)}
            </p>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-center bg-gray-50 rounded-xl p-3">
          <Link size={18} className="mr-3 text-[#17D9A3]" />
          <div>
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
          <div>
            <span className="text-xs font-semibold text-gray-400 block">
              Admin
            </span>
            <span className="text-sm text-gray-700">{session.adminName}</span>
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
  }).isRequired,
  audioInfo: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
};

export default SessionInfo;
