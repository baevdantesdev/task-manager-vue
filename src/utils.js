import { statuses } from "@/statuses";

export function getStatusForRequest(id) {
  return statuses.find(status => status.id === id).id;
}
