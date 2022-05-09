import { Submission as SubmissionEvent } from "../generated/Precondition/Precondition";
import { NewStandardLC as NewStandardLCEvent } from "../generated/LC/StandardLCFactory";
import { Submission, StandardLC } from "../generated/schema";

export function handleSubmission(event: SubmissionEvent): void {
  let entity = new Submission(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  entity.documentId = event.params.documentId;
  entity.caller = event.params.caller;
  entity.time = event.params.time;
  entity.save();
}

export function handleNewStandardLC(event: NewStandardLCEvent): void {
  let entity = new StandardLC(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  entity.documentId = event.params.documentID;
  entity.creator = event.params.creator;
  entity.address = event.params.lcContractAddr;
  entity.save();
}
