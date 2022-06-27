import { ParticipantsUseCases } from "../useCases/ParticipantsUseCases";

async function statusVerification() {
  setInterval(async () => {
    const participantsUseCases = new ParticipantsUseCases();
    await participantsUseCases.verifyUserActivity();
  }, 15 * 1000);
}

export { statusVerification };
