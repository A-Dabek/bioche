import { FblUser } from '@/interface/fbl-user';
import { FblComment } from '@/interface/fbl-comment';

export interface FblState {
  user: FblUser,
  comments: FblComment[]
}
