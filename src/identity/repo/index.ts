import { IdentityRepo } from './identity.repo';
import { OrgRepo } from './org.repo';

export * from './identity.repo';

export const identityRepos = [IdentityRepo, OrgRepo];
