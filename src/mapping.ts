import { NewStandardLC as NewStandardLCEvent } from "../generated/LC/StandardLCFactory";
import { Approved as ApprovedEvent } from "../generated/templates/StageContract/StageContract";
import { StandardLC, LCApproved } from "../generated/schema";
import { StageContract } from "../generated/templates";

export function handleNewStandardLC(event: NewStandardLCEvent): void {
  let standardLC = new StandardLC(event.params.lcContractAddr);
  standardLC.documentId = event.params.documentID;
  standardLC.creator = event.params.creator;
  standardLC.save();

  // create the tracked contract based on the template
  StageContract.create(event.params.lcContractAddr);
}

export function handleApproved(event: ApprovedEvent): void {
  let lcApproved = new LCApproved(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  lcApproved.lc = event.address;
  lcApproved.organization = event.params.organization;
  lcApproved.stage = event.params.stage;
  lcApproved.subStage = event.params.subStage;
  lcApproved.documentId = event.params.documentID;
  lcApproved.approvedTime = event.params.approvedTime;
  lcApproved.save();
}
