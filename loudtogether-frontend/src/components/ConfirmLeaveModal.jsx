import PropTypes from "prop-types";

const ConfirmLeaveModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="modal-content bg-white p-6 rounded-md shadow-md text-center w-80">
        <h2 className="text-lg font-semibold mb-4">
          Are you sure you want to leave the session?
        </h2>
        <p className="mb-6 text-gray-600">
          Leaving now will remove you from the session.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
          >
            Yes, Leave
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

ConfirmLeaveModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmLeaveModal;
