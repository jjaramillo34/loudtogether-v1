import PropTypes from "prop-types";
import { Button } from "./ui/button";
import { toast } from "react-toastify";
import axios from "axios";
import { faker } from "@faker-js/faker";

const PreSessionScreen = ({ session, audioInfo, onStartListening }) => {
  const participantName = faker.person.fullName();

  const handleStartListening = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/sessions/${session._id}/join`,
        { participantName }
      );

      console.log("Joined session:", response.data);
      toast.success("Successfully joined the session!");
      onStartListening();
    } catch (error) {
      console.error("Error joining session:", error);
      toast.error("Error joining session");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Welcome to the Session!</h2>
      <p>You&apos;ve successfully joined the listening session for:</p>
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="font-semibold">{audioInfo.title}</h3>
        <p className="text-sm text-gray-600">Host: {session.adminName}</p>
      </div>
      <p>
        When you&apos;re ready, click the button below to start listening along
        with the group.
      </p>
      <Button
        onClick={handleStartListening}
        className="w-full bg-[#17D9A3] hover:bg-[#1db88c] text-white"
      >
        Start Listening
      </Button>
    </div>
  );
};

PreSessionScreen.propTypes = {
  session: PropTypes.object.isRequired,
  audioInfo: PropTypes.object.isRequired,
  onStartListening: PropTypes.func.isRequired,
};

export default PreSessionScreen;
