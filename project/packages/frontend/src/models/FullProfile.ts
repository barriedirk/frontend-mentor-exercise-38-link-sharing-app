import { User } from './User';
import { Link } from './Link';

export interface FullProfile {
  user: User;
  links: Link[];
}
