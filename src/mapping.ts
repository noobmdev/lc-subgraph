import { Submission as SubmissionEvent } from "../generated/Precondition/Precondition";
import { Submission } from "../generated/schema";

export function handleSubmission(event: SubmissionEvent): void {
  let entity = new Submission(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  entity.documentId = event.params.documentId;
  entity.caller = event.params.caller;
  entity.time = event.params.time;
  entity.save();
}
