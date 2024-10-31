import { useState } from "react";
import PropTypes from "prop-types";
import { Users, X } from "lucide-react";

const ParticipantsModal = ({ participants }) => {
  const [isOpen, setIsOpen] = useState(false);

  const uniqueParticipants = [...new Set(participants)];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-[#17D9A3] text-white rounded-l-full p-3 shadow-lg"
        style={{ transform: "translateY(-50%)" }}
      >
        <Users size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-80 max-w-[90%] shadow-lg">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Participants</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <ul className="space-y-2 max-h-60 overflow-y-auto">
              {uniqueParticipants.length > 0 ? (
                uniqueParticipants.map((participant, index) => (
                  <li key={index} className="bg-gray-100 rounded-lg p-2">
                    {participant}
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No participants to show</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

ParticipantsModal.propTypes = {
  participants: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ParticipantsModal;
