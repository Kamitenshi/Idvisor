import { JobDescription } from '../../models/JobDescription';
import { Location } from '../../models/Location';
import { Session } from '../../models/Session';
import { Speaker } from '../../models/Speaker';
export interface SessionsState {
  jobsDescription: JobDescription[];
  sessions: Session[];
  speakers: Speaker[];
  favorites: number[];
  locations: Location[];
  filteredTracks: string[];
  searchText?: string;
  mapCenterId?: number;
  loading?: boolean;
  allTracks: string[];
}
