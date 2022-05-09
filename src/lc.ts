import { Approved as ApprovedEvent } from "../generated/templates/StageContract/StageContract";
import { LCApproved } from "../generated/schema";

export function handleApproved(event: ApprovedEvent): void {
  let lcApproved = new LCApproved(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  lcApproved.lc = event.address.toHex();
  lcApproved.organization = event.params.organization;
  lcApproved.stage = event.params.stage;
  lcApproved.subStage = event.params.subStage;
  lcApproved.documentId = event.params.documentID;
  lcApproved.approvedTime = event.params.approvedTime;
  lcApproved.save();
}
